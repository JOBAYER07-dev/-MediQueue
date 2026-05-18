# MediQueue - Tutor Booking System

**Live Website:** [Visit MediQueue](https://medi-queue-ecru.vercel.app) 
*(Note: If your Vercel live link is different, please replace it here)*

## 🚀 Website Features (Key Highlights)
* **Secure User Authentication:** Implemented robust user authentication using Firebase (Email/Password & Google Login), fully secured with JWT (JSON Web Tokens) for accessing private routes.
* **Advanced Search & Filtering:** Users can effortlessly find specific educators by using a case-insensitive search for tutor names or filtering them based on available session dates.
* **Smart Booking System:** A seamless booking experience where the system automatically checks slot availability and session start dates. It also generates a unique digital session token for every confirmed booking.
* **Real-time Slot Management:** The platform automatically decreases a tutor's available slots upon successful booking and instantly blocks further bookings if the slots reach zero.
* **Comprehensive User Dashboard:** Logged-in users have full CRUD control—they can add new tutors, dynamically update or delete their existing tutor profiles using modals, and cancel their booked sessions.
* **Modern & Interactive UI/UX:** Features a fully responsive layout across all devices, complete with a Dark/Light theme toggle, dynamic page titles, loading spinners, and interactive toast notifications for all actions.

## 🛠️ Technologies & Packages Used
* **Frontend:** Next.js, React, Tailwind CSS
* **Authentication:** Firebase Auth, JWT (Local Storage)
* **Alerts & Icons:** React Toastify, React Icons