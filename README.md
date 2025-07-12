# 🧠 StackIt – A Minimalist Q&A Platform

StackIt is a modern, lightweight, and smart question-and-answer web application built for focused community learning. Inspired by platforms like StackOverflow, StackIt strips away the noise and offers an intuitive, fast, and collaborative environment to ask questions, share answers, and grow knowledge.

Team Name- VAYRA
Member 1:
Name- Muskan Atray
email- muskan.atray@gmail.com

Member 2:
Name- Chhavi Sharma
email- chhavisharma251@gmail.com

Member 3:
Name- Shruti Sharma
email- shruti2403sharma@gmail.com

Member 4:
Name- Shreya Uttam
email- shreyauttam97@gmail.com



---

## 📌 Key Features

### 👥 User Roles
- **Guest**: View all questions and answers
- **User**: Register/login, ask & answer questions, vote, receive notifications
- **Admin**: Moderate content, ban users, post platform-wide updates

### ✍️ Core Functionalities
- Ask and answer questions using a **rich text editor** (bold, italic, links, images, emoji)
- Tag-based categorization (e.g., “React”, “MongoDB”, “Auth”)
- Upvote/downvote answers to prioritize quality content
- Mark accepted answers for questions
- Real-time notifications (using WebSockets)
- Search by tags, usernames, or keywords
- Profile page with questions, answers, and stats
- Admin panel for managing content and users

---

## 🧑‍💻 Tech Stack

### Frontend
- **React.js** + React Router
- **Quill.js** (Rich text editor)
- **Axios** (API communication)
- **Context API** (Global state)
- **TailwindCSS / Custom CSS** (UI Styling)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose** (Schema-based DB)
- **JWT + Bcrypt** (Auth)
- **Socket.IO** (Real-time notifications)
- **Cloudinary** (Image upload)

### Dev Tools
- ESLint + Prettier (Code formatting)
- Vercel & Render (Deployment)
- Git + GitHub (Version control)

---

## 📦 Folder Structure

```bash
stackit-qna-platform/
├── backend/          # Express API, controllers, models, routes, utils
├── frontend/         # React app with pages, components, services
├── .env              # Environment variables
├── .eslintrc.js      # Linter config
├── .prettierrc       # Code style
└── README.md
````
Backend:- 
bash
Copy
Edit
cd backend
npm install
cp .env.example .env  # Update with your DB and JWT config
npm run dev

then frontend:-
cd frontend
npm install
npm run dev
