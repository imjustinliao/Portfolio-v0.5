# Portfolio v0.5 - Justin Liao
> The source code for my personal portfolio, where I express my thoughts and work.

**Live Site:** [justinliao.me](https://justinliao.me)

## Overview
This project is a personal portfolio website designed to express my work and philosophy. It consists of three main sections: Home, About, and Thinking. I designed the entire interface from scratch in Figma and coded it using React, TypeScript, Vite, and Tailwind CSS.

I integrated Google Analytics for tracking and Formspree for handling form submissions. The site features advanced animations and sound effects from Eleven Labs, including background music and interactive audio elements, to create an immersive user experience. I also designed a changeable theme system and a custom clock and timer that functions seamlessly within the application.

To elevate the interactivity, I engineered a full-stack AI chat interface powered by OpenAI. This feature allows visitors to converse with a digital version of myself, trained on my professional background and philosophy. The backend is built on a serverless AWS architecture using Lambda, DynamoDB, and API Gateway, ensuring scalability and performance.

Security was a primary focus for this deployment. I implemented AWS CloudFront and WAF (Web Application Firewall) to protect the application. The backend API is hidden from the public internet, accessible only through a secure, verified proxy from the CloudFront CDN. This setup ensures that my API keys and infrastructure are protected against unauthorized access and automated attacks, while maintaining a seamless user experience.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS Modules
- **Animations**: CSS Keyframes & Transitions
- **State Management**: React Hooks (Context, State, Effect)

### Backend & Infrastructure
- **Cloud Provider**: AWS (Amazon Web Services)
- **Infrastructure as Code**: AWS CDK (Cloud Development Kit)
- **Compute**: AWS Lambda (Node.js)
- **Database**: Amazon DynamoDB (NoSQL)
- **CDN & Security**: Amazon CloudFront + AWS WAF
- **AI Integration**: OpenAI API (GPT-5.1)

## Architecture Overview

The application follows a secure, serverless architecture:

1.  **Single Entry Point**: All traffic is routed through Amazon CloudFront, ensuring low latency and high security.
2.  **Firewall Protection**: AWS WAF sits in front of the application, filtering malicious traffic and enforcing rate limits.
3.  **Secure Backend Proxy**: The frontend communicates with the backend via a protected route (`/api/chat`). Direct access to the Lambda function is blocked using a custom secret header verification system.
4.  **Serverless Logic**: Chat requests are processed by ephemeral Lambda functions that manage OpenAI API calls and store conversation history in DynamoDB.

## Development

### Prerequisites
- Node.js (v18+)
- AWS CLI (configured with credentials)
- OpenAI API Key

### Project Structure
- `frontend/`: React application source code
- `backend/`: Node.js Lambda functions and business logic
- `infrastructure/`: AWS CDK code for cloud resources

### Running Locally
To start the frontend development server:

1. Clone the repository:
   ```bash
   git clone https://github.com/imjustinliao/Portfolio-v0.5.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

*Note: The chat functionality requires the backend infrastructure to work locally.*