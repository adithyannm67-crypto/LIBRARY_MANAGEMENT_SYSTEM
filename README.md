# 📚 Library Management System

A modern Library Management System built using Next.js App Router.
Users can browse books, borrow books, manage their account, and track borrowing history through a responsive dashboard interface.

---

# ✨ Features

## User Features

- User authentication
- Browse books
- Search books
- Borrow books
- View borrowed books
- Borrow history
- Notifications system
- User profile management

## Dashboard Features

- Sidebar navigation
- Responsive navbar
- Notifications dropdown
- User-specific dashboard
- Book management pages

---

# 🛠 Tech Stack

- Next.js (App Router)
- React.js
- CSS Modules
- JavaScript
- Context API

---

# 📁 Folder Structure

```bash
src/
│
├── app/
│   │
│   ├── layout.jsx
│   ├── globals.css
│   │
│   ├── page.jsx
│   │
│   ├── login/
│   │   └── page.jsx
│   │
│   ├── register/
│   │   └── page.jsx
│   │
│   └── dashboard/
│       │
│       ├── layout.jsx
│       ├── page.jsx
│       ├── loading.jsx
│       ├── error.jsx
│       │
│       ├── books/
│       │   ├── page.jsx
│       │   │
│       │   └── [bookid]/
│       │       └── page.jsx
│       │
│       ├── borrowed/
│       │   └── page.jsx
│       │
│       ├── history/
│       │   └── page.jsx
│       │
│       ├── notifications/
│       │   └── page.jsx
│       │
│       ├── profile/
│       │   └── page.jsx
│       │
│       ├── _components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── DashboardHeader.jsx
│       │   └── NotificationDropdown.jsx
│       │
│       ├── _sections/
│       │   ├── StatsSection.jsx
│       │   ├── BorrowedBooksSection.jsx
│       │   ├── PopularBooksSection.jsx
│       │   └── RecentActivitySection.jsx
│       │
│       ├── _actions/
│       │   ├── borrowBook.js
│       │   ├── returnBook.js
│       │   └── reserveBook.js
│       │
│       └── _styles/
│           └── dashboard.module.css
│
├── components/
│   │
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Loader.jsx
│   │   └── Popup.jsx
│   │
│   └── landing/
│       ├── HeroSection.jsx
│       ├── FeaturesSection.jsx
│       ├── CTASection.jsx
│       ├── FooterSection.jsx
│       └── FeatureCard.jsx
│
├── lib/
│   ├── db.js
│   ├── auth.js
│   ├── fetcher.js
│   └── utils.js
│
├── hooks/
│   ├── useDropdown.js
│   └── useOutsideClick.js
│
├── context/
│   └── AuthContext.jsx
│
├── constants/
│   └── navLinks.js
│
├── public/
│   ├── images/
│   └── icons/
│
└── styles/
    └── variables.css
```

---

# 🧭 Dashboard Layout

## Navbar Contains

- Search bar
- Notifications
- User profile
- Mobile menu

## Sidebar Contains

- Dashboard
- Browse Books
- Borrowed Books
- History
- Notifications
- Profile
- Settings
- Logout

---

# 🚀 Getting Started

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 📌 Future Improvements

- Admin dashboard
- Book reservation queue
- Fine calculation system
- Recommendation engine
- Dark mode
- Real-time notifications

---

# 📄 License

This project is for learning and portfolio purposes.
