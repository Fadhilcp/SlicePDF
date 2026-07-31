Here is a complete, well-structured `README.md` for your SlicePDF project.

---
# SlicePDF ✂️📄

Upload, split, manage, and process PDFs with a modern full-stack architecture. 

SlicePDF is a web application that allows users to upload PDF documents, visually preview every page, select specific pages, and instantly generate a newly extracted PDF. It also includes a personal dashboard to manage all uploaded and generated files.

## ✨ Core Features

* **Visual Page Selection:** Upload a PDF and view every page instantly (powered by `react-pdf`). Select exactly which pages you want to keep.
* **Precision Slicing:** Generate a brand new, clean PDF containing only your selected pages using `pdf-lib`.
* **My Files Dashboard:** A dedicated file management hub where users can view and download both their originally uploaded PDFs and their newly generated sliced PDFs.
* **Secure Authentication:** JWT-based user sessions utilizing secure, HTTP-only cookies.

---

## 🛠️ Tech Stack & Tools

* **Frontend:** Next.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **PDF Rendering:** `react-pdf` (for displaying pages on the frontend)
* **PDF Manipulation:** `pdf-lib` (for slicing and generating the new PDFs on the backend)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/slicepdf.git](https://github.com/yourusername/slicepdf.git)
cd slicepdf

```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
npm run dev

```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev

```

---

## ⚙️ Environment Variables

Create a `.env` file in both your `backend` and `frontend` directories and populate them with your configuration.

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development

# Database
MONGO_DB_URI=your_mongodb_connection_string

# CORS & Client
CLIENT_URL=http://localhost:3000
CORS_METHODS=GET,POST,PUT,DELETE,PATCH
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true

# Authentication Secrets
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE=
REFRESH_TOKEN_EXPIRE=

# Cookie Configuration
COOKIE_MAX_AGE=
COOKIE_SAME_SITE=

```

### Frontend (`frontend/.env`)

*(Note: If using Next.js App Router or Pages Router, environment variables exposed to the browser must be prefixed with `NEXT_PUBLIC_`)*

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

```

---

## 📄 License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).
