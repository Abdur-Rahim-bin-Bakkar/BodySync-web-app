# 🏋️ BodyAsync - Fitness & Gym Management Platform

## 📌 Project Overview

BodyAsync is a modern full-stack Fitness & Gym Management Platform designed to connect fitness enthusiasts, trainers, and administrators through a centralized system.

The platform enables users to discover fitness classes, book sessions, save favorites, participate in community discussions, and apply to become trainers. Trainers can create and manage classes, interact with students, and contribute to community forums. Administrators oversee the entire platform, including user management, trainer approvals, class moderation, and platform analytics.

The application follows a Role-Based Access Control (RBAC) architecture and provides separate dashboards for Users, Trainers, and Admins.

---

## 🌐 Live Website

```bash
https://your-live-site-url.com
```

---

## 🎯 Project Purpose

The goal of BodyAsync is to create a comprehensive fitness ecosystem where:

- Users can improve their fitness journey.
- Trainers can grow their audience and manage classes.
- Admins can efficiently manage the platform.
- Community members can engage through discussions and forums.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

### Authentication System

- Email & Password Authentication
- Google Social Login
- Session-Based Authentication
- Persistent Login Sessions
- Protected Routes
- Secure User Synchronization

### Authorization System

Role-based access control with three roles:

#### 👤 User

- Browse approved fitness classes
- Search classes
- Filter classes by category
- View class details
- Book classes
- Save favorite classes
- Join community discussions
- Apply to become a trainer

#### 🏋️ Trainer

- Create classes
- Update classes
- Delete classes
- Manage students
- Create forum posts
- Manage forum posts
- Access trainer dashboard
- Track class performance

#### 👑 Admin

- Approve trainer applications
- Reject trainer applications
- Approve classes
- Reject classes
- Delete classes
- Manage users
- Block users
- Unblock users
- Promote users to admin
- Remove trainer roles
- Monitor transactions
- View platform analytics

---

# 🏠 Home Page Features

## Hero Section

- Attractive fitness-themed banner
- Call-to-action buttons
- User-friendly navigation

---

## Featured Classes Section

Displays:

- Top 4 most booked classes
- Dynamic data from database
- Sorted using booking count

Purpose:

Showcase the most popular classes available on the platform.

---

## Latest Forum Posts Section

Displays:

- Latest community discussions
- Recent fitness topics
- Dynamic forum content

Purpose:

Increase community engagement and interaction.

---

# 📚 Class Management System

## Browse Classes

Users can:

- View approved classes
- Search classes by name
- Filter classes by category
- Browse paginated results

---

## Available Categories

- Yoga
- Cardio
- Strength Training
- HIIT
- CrossFit
- Zumba
- Pilates

---

## Class Details

Displays:

- Class Image
- Trainer Information
- Class Description
- Difficulty Level
- Duration
- Schedule
- Price
- Booking Count

---

## Search Functionality

Users can search classes using:

- Class Name

Implemented using:

```javascript
Regex Search
```

---

## Category Filtering

Users can filter classes based on:

- Yoga
- Cardio
- Strength Training
- HIIT
- CrossFit
- Zumba
- Pilates

---

## Pagination

Class listing supports:

- Dynamic Pagination
- Page Navigation
- Total Result Tracking

Benefits:

- Improved performance
- Better user experience

---

# ❤️ Favorite Classes System

Users can:

- Add classes to favorites
- Remove classes from favorites
- View favorite classes

Benefits:

- Quick access to preferred classes
- Personalized experience

---

# 🎟 Booking System

Users can:

- Book fitness classes
- Prevent duplicate bookings
- Track booking history

Booking data includes:

- User Information
- Class Information
- Booking Date

---

# 🏋️ Trainer Dashboard

## Dashboard Overview

Trainer dashboard displays:

### Statistics

- Total Classes Created
- Total Student Enrollments
- Total Forum Posts

---

## Add Class

Trainers can create classes with:

### Class Information

- Class Name
- Class Image
- Category
- Difficulty Level
- Duration
- Schedule
- Price
- Description

Default Status:

```bash
Pending
```

Admin approval is required before publishing.

---

## My Classes

Trainer can:

- View all created classes
- Update class information
- Delete classes
- View enrolled students

---

## Student Management

Trainer can view:

- Student Name
- Student Email
- Student Profile Image

Purpose:

Track student participation and engagement.

---

# 💬 Community Forum

## Forum Features

Users can:

- Browse discussions
- Search forum posts
- Read community content

---

## Create Forum Posts

Authorized Roles:

- Admin
- Trainer

Forum Post Fields:

- Title
- Image
- Description

---

## Manage Forum Posts

Users can:

- View posts
- Delete posts
- Interact with discussions

---

# 💭 Comment System

Users can:

- Add comments
- Edit comments
- Delete comments

Features:

- Real-time interaction
- Discussion engagement

---

# 🔁 Reply System

Users can:

- Reply to comments
- View replies
- Participate in conversations

Purpose:

Create threaded discussions.

---

# 👍👎 Reaction System

Users can react to forum posts.

Available Reactions:

### Like

- Add Like
- Remove Like

### Dislike

- Add Dislike
- Remove Dislike

Rules:

- One reaction per user
- Toggle support
- Like ↔ Dislike switching

---

# 📝 Trainer Application System

Users can apply to become trainers.

---

## Application Form Fields

### Experience

Years of experience in fitness training.

### Specialty

Fitness specialization area.

Examples:

- Yoga
- Cardio
- CrossFit
- Strength Training

### Description

Professional background and expertise.

---

## Application Workflow

### Step 1

User submits application.

### Step 2

Admin reviews application.

### Step 3

Admin approves or rejects.

---

## Approval Process

If approved:

```bash
Role: User → Trainer
```

---

## Rejection Process

If rejected:

```bash
Application Status: Rejected
```

Admin may provide feedback.

---

# 👑 Admin Dashboard

## Dashboard Overview Statistics

Admin can monitor:

- Total Users
- Total Classes
- Total Bookings
- Total Forum Posts
- Total Comments
- Total Trainer Applications

Purpose:

Platform-wide monitoring and analytics.

---

# 👥 User Management

Admin can:

### Search Users

Search using:

- Email Address

### Manage Users

- Block User
- Unblock User
- Promote User to Admin

---

# 🚫 User Blocking System

Blocked users cannot:

- Create classes
- Interact with protected actions
- Access restricted functionality

Purpose:

Maintain platform security and community standards.

---

# 🏋️ Trainer Management

Admin can:

- View Trainers
- Remove Trainer Role

When removed:

```bash
Trainer → User
```

---

# 📚 Class Moderation

Admin can:

### View All Classes

Statuses:

- Pending
- Approved
- Rejected

---

### Approve Classes

Approved classes become publicly visible.

---

### Reject Classes

Rejected classes remain hidden.

---

### Delete Classes

Admin can permanently remove inappropriate classes.

---

# 📝 Trainer Application Moderation

Admin can:

- Review applications
- Approve applications
- Reject applications
- Send feedback

Purpose:

Maintain trainer quality standards.

---

# 💳 Transaction Management

Admin can monitor:

- Payment History
- Transaction IDs
- Booking Payments
- Payment Dates

Purpose:

Financial transparency and monitoring.

---

# 📱 Responsive Design

Fully responsive across:

### Mobile Devices

- Small Screens
- Smartphones

### Tablets

- Medium Screens

### Laptops

- Standard Screens

### Desktop

- Large Screens

---

# 🎨 UI & UX Features

- Modern Interface
- Clean Design
- Responsive Layout
- Interactive Components
- Loading States
- Toast Notifications
- Modal Dialogs
- Confirmation Alerts
- Dynamic Data Rendering

---

# ⚡ Performance Optimizations

- Server-side Data Fetching
- Pagination
- Optimized API Calls
- Dynamic Rendering
- Efficient MongoDB Queries

---

# 🛡 Security Features

- Protected Routes
- Role-Based Authorization
- Session Validation
- Secure API Access
- Access Restriction Middleware
- User Status Verification

---

# 🧰 Frontend Technologies

## Core Technologies

- Next.js
- React.js
- JavaScript (ES6+)

---

## Styling

- Tailwind CSS
- Hero UI
- DaisyUI
- CSS3

---

## UI Components

- Hero UI Components
- DaisyUI Components
- React Icons

---

## State Management

- React Hooks
- Context API

---

## Authentication

- Better Auth
- Google Authentication

---

## Data Fetching

- Fetch API
- Async/Await

---

## User Experience

- SweetAlert2
- Sonner Toast

---

# 🔧 Backend Technologies

- Node.js
- Express.js
- MongoDB
- MongoDB Atlas

---

# 🗄 Database Collections

The application uses the following collections:

```bash
users
classes
bookings
favorites
forum
comments
commentreplay
reaction
applyastrainer
session
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# 📂 Project Structure

```bash
src
│
├── app
├── components
├── hooks
├── lib
├── providers
├── services
├── utils
├── assets
└── public
```

---

# 🎯 Future Improvements

- Stripe Payment Integration
- Email Notifications
- Trainer Reviews & Ratings
- Real-Time Chat
- Fitness Progress Tracking
- Workout Plan Generator
- Video-Based Classes
- Advanced Analytics Dashboard
- Mobile Application

---

# 📞 Contact

Developer: Abdur Rahim Bin Bakkar

GitHub:
https://github.com/Abdur-Rahim-bin-Bakkar

LinkedIn:
https://www.linkedin.com/in/fswd-abdur-rahim-bin-bakkar

Portfolio:
https://portfolio-eight-pi-mc123cjc5o.vercel.app

---

# 📄 License

This project is developed for educational and portfolio purposes.

---

⭐ If you like this project, consider giving it a star on GitHub.