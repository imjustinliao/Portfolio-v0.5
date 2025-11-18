import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Justin Liao",
  description: "Digital home for Justin Liao — Tech Designer and Philosopher.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-wrapper">
          <NavBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
