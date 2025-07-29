#  Inventory and Sales Management System

A full-stack web application designed to help small businesses manage their product inventory and track sales efficiently.

---

##  Features

-  Add, edit, delete products
-  Track stock automatically after each sale
-  Low-stock alerts (visual + email)
-  Sales analytics dashboard with charts
-  Clean UI built with React + Tailwind CSS
-  REST API built with Node.js and Express
-  MySQL database using Sequelize ORM

---

##  Screenshots



## 📁 Project Structure

.
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── db
│ ├── server.js
│ └── .env.example
├── frontend
│ ├── public
│ └── src
├── .gitignore
└── README.md


---

##  Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Inventory-Management-System.git
cd Inventory-Management-System
Backend Setup:
cd backend
npm install
cp .env.example .env   # Update with your DB and Email config
npm start              # Starts backend server on port 5000
Frontend Setup:
cd ../frontend
npm install
npm start              # Starts React app on port 3000
```

# Environment Variables (.env)
Refer to backend/.env.example for all required environment variables.

## TODO
 -Admin Login & JWT Authentication

 -Add Role-based Access (Admin, Seller, Buyer)

 -Dockerize the project

 -Deploy backend & frontend

---

 #👨‍💻Author
Sinchana T
GitHub: @Sinchana258

# 🌐License
This project is licensed under the MIT License
