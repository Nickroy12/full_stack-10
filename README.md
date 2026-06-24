# 🍲 RannaBanna

## 📖 Project Overview

**RannaBanna** is a subscription-based recipe-sharing platform where chefs can create, manage, and share their favorite recipes with food lovers worldwide.

The platform follows a role-based access system with two user roles:

* 👨‍🍳 **Chef (User)**
* 👑 **Owner (Admin)**

Chefs can publish recipes, manage their profiles, track recipe engagement, and upgrade their accounts through subscription plans. Admins can monitor and manage the entire platform from a dedicated dashboard.

---

## ✨ Features

### 👨‍🍳 Chef Features

* User Registration & Authentication
* Personal Profile Management
* Upload and Manage Recipes
* Free Plan Access (Up to 3 Recipes)
* Upgrade to Pro or Premium Subscription
* View Total Recipes
* View Total Likes Received
* View Featured Recipes
* Personal Dashboard with Statistics
* Recipe Editing & Deletion

### ❤️ Recipe Features

* Create Recipes with Details
* Like Recipes
* Store User Likes
* Featured Recipe Support
* Categorized Recipe Display
* Responsive Recipe Details Page

### 👑 Admin Features

* Access All Recipes
* View Platform Statistics
* Manage Users
* Manage Chef Recipes
* Monitor Subscription Activities
* Role-Based Authorization

### 📊 Dashboard Analytics

#### Chef Dashboard

* Total Recipes
* Total Likes
* Featured Recipes Count
* Subscription Status

#### Admin Dashboard

* Total Users
* Total Chefs
* Total Recipes
* Featured Recipes
* Subscription Statistics

---

## 💳 Subscription Plans

### 🆓 Free Plan

* Upload up to **3 recipes**
* Basic Profile Features

### 🚀 Pro Plan

* Upload up to **10 recipes**
* Enhanced Visibility
* Additional Dashboard Features

### 💎 Premium Plan

* Upload up to **100 recipes**
* Priority Visibility
* Premium Dashboard Features

---

## 🛠️ Technology Stack

### Frontend

* Next.js
* Better Auth
* Framer Motion
* React Toastify
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* CORS

### Database

* MongoDB

---

## 🔐 Authentication & Authorization

### Authentication

* Better Auth
* JWT Token Verification
* Protected Routes

### Authorization

#### User (Chef)

* Create Recipes
* Manage Own Profile
* View Personal Dashboard

#### Admin (Owner)

* Manage All Users
* Manage All Recipes
* Access Admin Dashboard

---

## 📁 Project Structure

```bash
RannaBanna
│
├── app/
│   ├── dashboard/
│   ├── profile/
│   ├── recipes/
│   ├── pricing/
│   └── auth/
│
├── components/
├── lib/
├── services/
├── hooks/
├── public/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── config/
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/rannabanna.git
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## 🌐 Environment Variables

### Frontend

```env
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_SERVER_URL=
```

### Backend

```env
PORT=
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
```

---

## 🎯 Future Improvements

* Recipe Comments
* Recipe Bookmarking
* Recipe Search & Filters
* Payment Gateway Integration
* Email Notifications
* Chef Verification Badge
* Recipe Ratings System
* AI Recipe Recommendations

---

## 📸 Core Modules

* Authentication System
* Role-Based Access Control
* Recipe Management
* Subscription Management
* User Profiles
* Dashboard Analytics
* Like System
* Featured Recipes

---

## 👨‍💻 Developed By

**Nick Roy**

Frontend Developer | JavaScript Developer

---

## 📄 License

This project is developed for educational and portfolio purposes.
