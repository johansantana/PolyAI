# PolyAI

![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/YelisPayros/PolyAI)

**PolyAI** is a modern AI chat application built with Next.js, featuring authentication, real-time chat with AI responses, and multimodal capabilities.

Look at the DeepWiki [here](https://deepwiki.com/YelisPayros/PolyAI).

## ✨ Features

- **Authentication System** 🔐: Secure user authentication powered by Supabase
- **AI Chat Interface** 🤖: Interactive chat with AI responses using Vercel AI SDK
- **Responsive Design** 📱: Built with Tailwind CSS for a responsive UI

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Supabase Auth
- **AI Integration**: Vercel AI SDK, Gemini, MCP servers (Internet search, TTS)
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/polyai.git
   cd polyai
   ```

2. Install dependencies

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. Set up environment variables

   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase and GROQ API credentials

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. Start the development server

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. Open http://localhost:3000 in your browser

## 📂 Project Structure

- `/app` - App router routes and API endpoints
- `/components` - React components
  - `/custom` - Custom components for the chat interface
  - `/ui` - Reusable UI components
- `/contexts` - React context providers
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and configurations
- `/pages` - Page router routes
- `/public` - Static assets
- `/styles` - Global styles
- `/supabase` - Supabase configuration

## 🔑 Authentication

The application uses Supabase for authentication with email/password. The `AuthContext` provides the following methods:

- `signUp(email, password)` - Register a new user
- `signIn(email, password)` - Log in an existing user
- `signOut()` - Log out the current user

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
