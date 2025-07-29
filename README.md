#  Inventory and Sales Management System

A full-stack web application designed to help small businesses manage their product inventory and track sales efficiently.

---

##  Features

-  Add, edit, delete products
-  Track stock automatically after each sale
-  Low-stock alerts (visual + email)
-  Export sales data as csv file
-  Sales analytics dashboard with charts
-  Clean UI built with React + Tailwind CSS
-  REST API built with Node.js and Express
-  MySQL database using Sequelize ORM

---

##  Screenshots
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/33355c86-17a9-4b85-9f5a-bbe2c775f311" />
<img width="1890" height="973" alt="image" src="https://github.com/user-attachments/assets/1a0dc51c-73c8-4449-855d-e040a1fb377c" />
<img width="1882" height="895" alt="image" src="https://github.com/user-attachments/assets/256aaeec-d397-420f-8507-482be2aba844" />
<img width="1906" height="977" alt="image" src="https://github.com/user-attachments/assets/823476df-4ebd-46b0-8ea3-e4aab129d1b2" />
<img width="1916" height="965" alt="image" src="https://github.com/user-attachments/assets/dc9a567f-62cd-4f44-9dff-ffe8b0272cbc" />


---

##  Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Inventory-Management-System.git
cd Inventory-Management-System

```

#Backend Setup:
```bash
cd backend
npm install
cp .env.example .env   # Update with your DB and Email config
npm start              # Starts backend server on port 5000
```

#Frontend Setup:
```bash
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
