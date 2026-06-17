# 🚀 Gemini AI Clone

A fully responsive, high-performance Gemini AI clone built using **React.js**, **Vite**, and the official **Google Gemini API**. This application mimics the core functionalities of the Gemini web app, featuring dynamic markdown rendering, local chat history preservation, and an integrated dark mode experience.

🌐 **Live Demo:** [https://my-gemini-clone-qgus-git-main-suhel-ahmads-projects.vercel.app/](https://my-gemini-clone-qgus-git-main-suhel-ahmads-projects.vercel.app/)

---

## ✨ Features

- **Real-time AI Chat:** Seamless integration with Google's Gemini API for instantaneous, context-aware responses.
- **Dynamic Markdown Support:** Beautiful rendering of code blocks, lists, and formatted text using `react-markdown`.
- **Persistent Local History:** Chat queries are synchronized and stored in `localStorage` so users don't lose their history on refresh.
- **Dynamic Dark/Light Mode:** Full UI theme toggle that remembers user preference across sessions.
- **100% Responsive Design:** Tailored layout optimized flawlessly for Mobile, Tablet, and Desktop screens.
- **Smart Auto-Scroll:** Chat logs automatically scroll down as the AI streams its answers.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (Functional Components, Hooks, Context API)
- **Build Tool:** Vite (For ultra-fast bundling and reloading)
- **Styling:** Pure Custom CSS3 (with Mobile-first Media Queries)
- **API Integration:** `@google/generative-ai` package
- **Markdown Parsing:** `react-markdown`

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root of your frontend directory before running the application locally:

```env
VITE_GEMINI_API_KEY=your_official_google_gemini_api_key
