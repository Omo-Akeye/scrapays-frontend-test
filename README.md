# 📚 BookStore Management Dashboard

A modern, secure, and responsive Single Page Application (SPA) for managing book inventories. Built with **React**, **TypeScript**, and **GraphQL**, this dashboard features robust authentication, real-time data updates, and a polished UI using **Chakra UI** and **Tailwind CSS**.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

* **🔐 Secure Authentication:** Full user login/logout flow powered by **Auth0** with persistent sessions.
* **⚡ CRUD Operations:**
    * **Create:** Add new books via a clean, validated modal interface.
    * **Read:** View books in a responsive grid layout with Skeleton loading states.
    * **Update:** Edit book details seamlessly with pre-filled forms.
    * **Delete:** Remove items safely with a confirmation dialog.
* **🔎 Advanced Search:** Real-time client-side filtering by book title or description.
* **Fn Pagination:** Efficient data handling with numbered pagination controls.
* **📱 Fully Responsive:** Optimized layout for both desktop and mobile devices.
* **🎨 Modern UI:** Built with Chakra UI components and Tailwind CSS v4 styling.

---

## 🛠️ Tech Stack

### Frontend Core
* **[React 18](https://reactjs.org/)** - Component-based UI Library
* **[TypeScript](https://www.typescriptlang.org/)** - Static Typing for reliability
* **[Vite](https://vitejs.dev/)** - Ultra-fast build tool

### Styling & UI
* **[Chakra UI](https://chakra-ui.com/)** - Accessible component library (Modals, Inputs, Alerts)
* **[Tailwind CSS (v4)](https://tailwindcss.com/)** - Utility-first CSS for layout
* **[React Icons](https://react-icons.github.io/react-icons/)** - Vector icons

### Data & State
* **[Apollo Client](https://www.apollographql.com/docs/react/)** - GraphQL state management & caching
* **[Auth0](https://auth0.com/)** - Identity & Authentication

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v18 or higher)
* **npm** or **yarn**
* **Backend API**: A running GraphQL backend.

---

## 💻 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Omo-Akeye/scrapays-frontend-test.git](https://github.com/Omo-Akeye/scrapays-frontend-test.git)
    cd scrapays-frontend-test
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    This project uses a `.env` file for configuration.
    
    * Create a copy of the example file:
      ```bash
      cp .env.example .env
      ```
    * Open `.env` and fill in your specific Auth0 and API values:
      ```env
      VITE_AUTH0_DOMAIN=your_auth0_domain
      VITE_AUTH0_CLIENT_ID=your_auth0_client_id
      VITE_AUTH0_AUDIENCE=your_auth0_audience
      VITE_API_URL=http://localhost:4109/books
      ```

4.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📂 Project Structure

The project follows a scalable, feature-based architecture:

```text
src/
├── 📂 components/       # Reusable UI components
│   ├── BookFormModal.tsx   # Modal for Adding/Editing books
│   ├── BookViewModal.tsx   # Modal for viewing details
│   └── DeleteAlert.tsx     # Confirmation dialog
├── 📂 graphql/          # GraphQL Queries & Mutations
│   └── queries.tsx
├── 📂 hooks/            # Custom React Hooks
│   └── useBooks.ts         # Logic for API calls, search, & pagination
├── 📂 types/            # TypeScript Interfaces
│   └── types.ts
├── App.tsx              # Main Auth & Provider setup
├── Dashboard.tsx        # Main Dashboard View
├── main.tsx             # Entry point
└── index.css            # Global Styles (Tailwind)