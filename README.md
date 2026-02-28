# 🎵 SoundNode – Music Streaming Platform

SoundNode is a full-stack **music streaming web application** built using a **microservices architecture**.  
It allows users to explore albums and songs, manage playlists, and enjoy a smooth and responsive music player experience across all devices.

---

## 🔗 Project Link

- **Live Project:** [SoundNode Live](http://13.53.174.55:7000) 
- **GitHub Repository:** [SoundNode GitHub](https://github.com/RushikeshD1/Spotify-App)

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Context API
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- JWT (Authentication & Authorization)

### Databases
- MongoDB – User data & playlists
- PostgreSQL (Neon) – Songs & albums

### Caching
- Redis – Fast fetching of songs and albums in Song Service

### Cloud & Deployment
- Cloudinary – Media & thumbnails storage
- AWS EC2 – Deployment

---

## 🧩 Microservices Architecture

SoundNode is divided into three independent services:

### 1️⃣ User Service
- User registration and login
- JWT-based authentication
- Playlist management
- Role handling (User / Admin)

### 2️⃣ Admin Service
- Admin authentication
- Add songs and albums
- Delete songs and albums
- Update song and album thumbnails

### 3️⃣ Song Service
- Fetch albums and songs
- Redis caching for faster responses
- PostgreSQL database integration

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control:
  - Admin users can access the admin panel
  - Normal users cannot see or access admin routes
- Protected routes:
  - Playlist page is accessible only when the user is logged in
  - Playlist actions (add/remove) require authentication

---

## 🎧 Features

### User Features
- View albums and album songs
- View single songs
- Add songs to playlist
- Remove songs from playlist
- Fully functional music player:
  - Play / Pause
  - Next / Previous song
  - Volume control

### Admin Features
- Add new songs
- Add new albums
- Delete songs
- Delete albums
- Update thumbnails

---

## 📄 Pages Included

### Public Pages
- Home Page
- Login Page
- Register Page
- Albums & Songs Page

### Protected Pages
- Playlist Page (Login required)
- Admin Page (Admin role required)

---

## 📱 Responsive Design

SoundNode is **fully responsive** and optimized for:
- 📱 Mobile devices
- 📲 Tablets
- 💻 Large screens and desktops

Built using **Tailwind CSS** for consistent and adaptive layouts.

---

## ☁️ Media Handling

- All song thumbnails and media assets are managed using **Cloudinary**

---

## 📦 Deployment

- Deployed on **AWS EC2**
- Independent microservices deployment
- Redis caching improves performance for frequently accessed songs and albums

---

## 📌 Project Name

**SoundNode** 🎶  
A scalable, secure, and responsive music streaming platform built with modern web technologies.
