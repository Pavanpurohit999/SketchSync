<div align="center">
  <h1>🎨 SketchSync</h1>
  <p><strong>A Real-Time, Collaborative Virtual Whiteboard built for Modern Teams</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![WebSockets](https://img.shields.io/badge/WebSockets-Realtime-010101?style=for-the-badge&logo=socket.io)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
  [![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=for-the-badge&logo=turborepo)](https://turbo.build/)
</div>

<br />

## 🌟 The Vision

**SketchSync** is a high-performance, real-time collaborative drawing application heavily inspired by Excalidraw. Designed for engineering teams, designers, and brainstormers, it provides an infinite canvas to visualize ideas, map out architectures, and collaborate synchronously with zero latency. 

Built with scalability in mind, SketchSync leverages a robust **Turborepo monorepo architecture**, separating concerns across dedicated microservices for REST APIs and WebSocket connections, ensuring a fluid experience even under heavy concurrent usage.

---

## ✨ Key Features

- **⚡ Real-Time Sync**: Watch your team's ideas come to life instantly. Powered by low-latency WebSockets, every stroke is broadcasted and rendered in milliseconds.
- **🛠️ Rich Toolset**: Intuitive drawing tools including freehand pencils, perfect shapes (rectangles, circles), and a polished, dark-themed canvas interface.
- **🔒 Secure Authentication**: Industry-standard JWT-based authentication ensuring your rooms and data remain private and secure.
- **🚀 Scalable Architecture**: A battle-tested monorepo setup utilizing Turborepo for lightning-fast builds and strict boundary enforcement between frontend, REST API, and WebSocket server.
- **💎 Premium UX/UI**: A stunning, modern interface built with Tailwind CSS, featuring glassmorphism, responsive design, and fluid micro-animations.

---

## 🏗️ System Architecture

Our application is built as a highly modular monorepo. This allows us to share code (like validation schemas and database clients) while deploying services independently for maximum scalability.

### 🌐 Applications (`apps/`)

| App | Description | Stack |
| :--- | :--- | :--- |
| **`excalidraw-fe`** | The client-facing Web App. | Next.js (App Router), React, Tailwind CSS, Canvas API |
| **`http-backend`** | REST API for handling stateless operations like User Auth, Room creation, and fetching chat history. | Node.js, Express, JWT, Zod |
| **`ws-backend`** | Dedicated WebSocket server handling thousands of concurrent real-time drawing events. | Node.js, `ws`, JWT |

### 📦 Shared Packages (`packages/`)

| Package | Description |
| :--- | :--- |
| **`@repo/db`** | Centralized PostgreSQL database client powered by **Prisma ORM**. Single source of truth for the data model. |
| **`@repo/common`** | Shared **Zod** validation schemas to ensure end-to-end type safety between frontend and backend. |
| **`@repo/common-backend`** | Shared backend utilities and configuration (e.g., Token management). |
| **Config Packages** | Shared configurations for `eslint` and `typescript` to maintain code quality across the monorepo. |

---

## 💻 Tech Stack

### Frontend
- **Framework:** Next.js 15, React 19
- **Styling:** Tailwind CSS (v4)
- **State/Data:** Axios
- **Graphics:** Native HTML5 `<canvas>`

### Backend
- **Runtime:** Node.js
- **Frameworks:** Express.js, native `ws` (WebSockets)
- **Security:** bcrypt, jsonwebtoken (JWT)
- **Validation:** Zod

### Database & DevOps
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Build System:** Turborepo

---

## 🚀 Quick Start

Get SketchSync running locally in minutes.

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL running locally or via Docker
- `npm` package manager

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd excalidraw
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Setup
You will need to create `.env` files in the following locations with your database connection string and secrets:
- `packages/db/.env`
- `apps/http-backend/.env`
- `apps/ws-backend/.env`

*Example `.env`:*
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sketchsync"
JWT_SECRET="your_super_secret_jwt_key"
```

### 5. Database Initialization
Run the Prisma migrations to set up your database schema:
```bash
cd packages/db
npx prisma migrate dev
npx prisma generate
cd ../../
```

### 6. Blast Off! 🚀
Start the entire monorepo with a single command:
```bash
npm run dev
```
- 🌐 Frontend: `http://localhost:3000`
- 🔌 REST API: `http://localhost:3001`
- ⚡ WebSocket: `ws://localhost:8080`

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's a bug fix, a new feature, or documentation improvements, feel free to open an issue or submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <p>Built with ❤️ by passionate developer.</p>
</div>
