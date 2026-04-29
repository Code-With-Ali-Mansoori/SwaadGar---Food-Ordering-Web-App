# 🍅 SwaadGar – Food Delivery Web Application

A full-stack **Food Delivery Web Application** built using modern web technologies. This project allows users to browse food items, manage their cart, and place orders with secure online payments. It also includes an admin panel for managing food items and orders.

---

## 🚀 Live Demo
🔗 Add your deployed link here (Vercel / Netlify / Render)

---

## 📌 Features

### 👤 User Side
- Browse food items with images & descriptions  
- Add to cart & remove items  
- Dynamic cart updates  
- Place orders  
- Secure payment integration (Stripe)  
- Order status tracking  

### 🛠️ Admin Panel
- Add / Remove food items  
- Upload images  
- Manage orders  
- View customer details  

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js (Vite)
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Payment Gateway
- Stripe

### Deployment
- Frontend: Vercel / Netlify  
- Backend: Render  

---

## 📂 Project Structure

food-Delivery/
│
├── frontend/ # React frontend
├── backend/ # Node.js backend
├── admin/ # Admin panel
├── assets/ # Images & static files
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone from my Github => https://github.com/Code-With-Ali-Mansoori/
cd SwaadGar

cd server
npm install
npm run server

Create a .env file in backend:

MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key

**Setup Frontend**
cd main_cleint
npm install
npm run dev

Setup Admin Panel
cd admin_client
npm install
npm run dev

💳 Stripe Testing
Use Stripe test cards:
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits