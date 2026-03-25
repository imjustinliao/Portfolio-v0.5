#!/usr/bin/env python3
from __future__ import annotations

import datetime as _dt
import os
from dataclasses import dataclass


LETTER_W = 612
LETTER_H = 792


def _pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def _wrap(text: str, max_chars: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur: list[str] = []
    for w in words:
        candidate = (" ".join(cur + [w])).strip()
        if not cur:
            cur = [w]
            continue
        if len(candidate) <= max_chars:
            cur.append(w)
        else:
            lines.append(" ".join(cur))
            cur = [w]
    if cur:
        lines.append(" ".join(cur))
    return lines


@dataclass(frozen=True)
class TextRun:
    x: int
    y: int
    size: int
    text: str


def _build_content(runs: list[TextRun]) -> bytes:
    parts: list[str] = []
    parts.append("BT")
    parts.append("/F1 12 Tf")
    for r in runs:
        parts.append(f"{r.size} Tf")
        parts.append(f"1 0 0 1 {r.x} {r.y} Tm")
        parts.append(f"({_pdf_escape(r.text)}) Tj")
    parts.append("ET")
    return ("\n".join(parts) + "\n").encode("utf-8")


def _pdf(objects: list[bytes]) -> bytes:
    out = bytearray()
    out.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for i, obj in enumerate(objects, start=1):
        offsets.append(len(out))
        out.extend(f"{i} 0 obj\n".encode("ascii"))
        out.extend(obj)
        if not obj.endswith(b"\n"):
            out.extend(b"\n")
        out.extend(b"endobj\n")
    xref_at = len(out)
    out.extend(f"xref\n0 {len(objects)+1}\n".encode("ascii"))
    out.extend(b"0000000000 65535 f \n")
    for off in offsets[1:]:
        out.extend(f"{off:010d} 00000 n \n".encode("ascii"))
    out.extend(
        f"trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_at}\n%%EOF\n".encode(
            "ascii"
        )
    )
    return bytes(out)


def main() -> int:
    here = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.abspath(os.path.join(here, "..", ".."))
    out_dir = os.path.join(repo_root, "output", "pdf")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "portfolio-v0.5-app-summary.pdf")

    left = 48
    right = 48
    max_chars = 96  # conservative; avoids overflow with Helvetica

    y = LETTER_H - 52
    line_gap = 14
    tight_gap = 12

    runs: list[TextRun] = []

    def heading(text: str) -> None:
        nonlocal y
        y -= 6
        runs.append(TextRun(left, y, 16, text))
        y -= 20

    def subheading(text: str) -> None:
        nonlocal y
        runs.append(TextRun(left, y, 12, text))
        y -= 16

    def para(text: str) -> None:
        nonlocal y
        for ln in _wrap(text, max_chars):
            runs.append(TextRun(left, y, 10, ln))
            y -= tight_gap
        y -= 4

    def bullets(items: list[str]) -> None:
        nonlocal y
        for item in items:
            wrapped = _wrap(item, max_chars - 4)
            for i, ln in enumerate(wrapped):
                prefix = "- " if i == 0 else "  "
                runs.append(TextRun(left, y, 10, f"{prefix}{ln}"))
                y -= tight_gap
        y -= 4

    # -----------------------------
    # Content (repo-evidence based)
    # -----------------------------
    heading("Portfolio v0.5 - App Summary")

    subheading("What it is")
    para(
        "A personal portfolio single-page web app with a built-in AI chat experience and a backend for storing chat history."
    )

    subheading("Who its for")
    para("Visitors (recruiters, collaborators, and peers) exploring Justin Liao's work and writing.")

    subheading("What it does")
    bullets(
        [
            "React + TypeScript SPA with routes for Home, About, Thinking, and a writing page (WIT).",
            "AI chat UI that POSTs to /api/chat and renders Markdown responses; includes stop-generation control.",
            "Collects a chat user name and persists a sessionId in localStorage for conversation continuity.",
            "Static hosting via CloudFront in front of an S3 bucket; SPA 404s rewrite to /index.html.",
            "Serverless chat backend on AWS Lambda with DynamoDB persistence for session history.",
            "WAF attached to CloudFront; backend protected by a secret header check (x-origin-verify).",
            "Google Analytics tag in frontend index.html; Thinking page includes a Formspree submission POST.",
        ]
    )

    subheading("How it works (architecture, from repo evidence)")
    bullets(
        [
            "Browser loads the React app from CloudFront -> S3 origin (infrastructure/lib/portfolio-stack.ts).",
            "Chat UI calls POST /api/chat (frontend/src/components/EdomChat.tsx).",
            "CloudFront routes /api/* to the Lambda Function URL origin and injects x-origin-verify (portfolio-stack.ts).",
            "Lambda handler verifies the secret (CLOUDFRONT_SECRET) before processing (backend/src/index.js).",
            "Lambda queries recent session history from DynamoDB, calls OpenAI chat completions (model: gpt-4o-mini), then writes the exchange back to DynamoDB (backend/src/dynamodb.js, backend/src/openai.js).",
        ]
    )

    subheading("How to run (minimal)")
    bullets(
        [
            "Prereq: Node.js (v18+ mentioned in README.md).",
            "Start frontend: cd frontend && npm install && npm run dev",
            "Chat backend local dev: Not found in repo (backend/local-server.js exists but returns a simulated response).",
            "Deploy full stack: Not required for local UI; AWS deployment steps documented in AWS_DEPLOYMENT.md.",
        ]
    )

    # Footer
    y = max(y, 42)
    generated = _dt.datetime.now().strftime("%Y-%m-%d")
    runs.append(TextRun(left, 28, 9, f"Generated {generated} from repository evidence in Portfolio-v0.5."))

    if y < 28:
        raise SystemExit("Content overflow: adjust text to fit on one page.")

    content = _build_content(runs)

    # Objects
    # 1: Catalog
    # 2: Pages
    # 3: Page
    # 4: Font
    # 5: Content stream
    objects: list[bytes] = []
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>\n")
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n")
    objects.append(
        (
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {LETTER_W} {LETTER_H}] "
            f"/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\n"
        ).encode("ascii")
    )
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n")
    objects.append(b"<< /Length %d >>\nstream\n" % len(content) + content + b"endstream\n")

    pdf_bytes = _pdf(objects)
    with open(out_path, "wb") as f:
        f.write(pdf_bytes)

    print(out_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

