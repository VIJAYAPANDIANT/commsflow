# 🌌 Cosmic Task Manager (Task Master)

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://cosmic-task-manager.vercel.app)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## 🚀 Overview

**Cosmic Task Manager** is a premium, galaxy-themed task management application designed for users who value both productivity and aesthetics. Featuring a procedurally generated cosmic environment, the application provides a "WOW" experience while maintaining robust CRUD functionality, user authentication, and detailed action history.

Built with **Vanilla JavaScript** and **Modern CSS3**, this project demonstrates high-end UI/UX design patterns, including glassmorphism, parallax effects, and complex state management.

---

## ✨ Key Features

- **🌌 Dynamic Cosmic Engine**: Procedurally generated starfields and drifting nebulae that respond to user interaction.
- **🔐 User Authentication**: Integrated login and registration system with view-switching logic.
- **✅ Advanced Task Management**: Seamlessly add, edit, toggle, and delete tasks with fluid CSS transitions.
- **📜 Detailed Audit Logging**: A comprehensive history engine that tracks every action (create, update, complete, delete) with precise timestamps.
- **🌓 Adaptive Theming**: Effortlessly switch between "Stellar" (Dark) and "Nebula" (Light) modes with persistent storage.
- **📊 Real-time Statistics**: Live task counting and status tracking.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

---

## 🛠️ Technical Stack

- **Frontend**: 
  - **HTML5**: Semantic structure for accessibility.
  - **CSS3**: Custom properties (variables), Flexbox, Keyframe animations, and Glassmorphism.
  - **JavaScript (ES6+)**: Procedural generation, State management, and Event-driven architecture.
- **Backend (Proposed)**: 
  - **MySQL**: Structured data storage for users, tasks, and history.
- **Design Assets**:
  - **Google Fonts**: Outfit (Modern sans-serif).
  - **Font Awesome 6**: Vector icons for intuitive navigation.

---

## 🗄️ Database Architecture

The project includes a robust `schema.sql` designed for scalability and data integrity.

### 1. `users` Table
Stores user credentials and profile information.
- `id`: Primary Key
- `username`: Unique identifier
- `email`: Unique contact
- `password_hash`: Secure credentials storage

### 2. `tasks` Table
Manages the core task data linked to specific users.
- `user_id`: Foreign Key (cascades on delete)
- `text`: Task content
- `completed`: Boolean status

### 3. `task_history` Table
An audit log for tracking user activity and productivity metrics.
- `task_id`: Linked task identifier
- `action`: Type of change (`created`, `updated`, `completed`, `deleted`)
- `timestamp`: Precise moment of action

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- (Optional) MySQL Server for backend integration

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VIJAYAPANDIANT/to-do-list-in-js.git
   ```
2. **Launch the App**:
   Simply open `index.html` in your preferred browser.
3. **Database Setup**:
   Import `schema.sql` into your MySQL environment to prepare for backend connectivity.

---

## 👤 Created by

### **Vijayapandian T**
**67 Team** | _Coding the Stars_

- [LinkedIn](https://www.linkedin.com/in/vijaya-pandian-t-7a2424263/)
- [Portfolio](https://vijayapandian67.github.io/portfolio/)
- [GitHub](https://github.com/VIJAYAPANDIANT)

---

> [!TIP]
> This project is designed to be highly customizable. You can adjust the star density in `app.js` by modifying the `generateStars` parameters.

