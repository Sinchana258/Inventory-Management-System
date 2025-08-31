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
-  Secure authentication & role-based access (Admin, Seller, Buyer)
-  REST API built with Node.js and Express
-  MySQL database using Sequelize ORM
-  Product search & sorting for faster navigation

---

##  Screenshots
<img width="1896" height="1011" alt="image" src="https://github.com/user-attachments/assets/3ee10367-2b63-4b87-bcdb-ac3288b33048" />
<img width="1913" height="1015" alt="image" src="https://github.com/user-attachments/assets/ea275edc-8b35-47be-928d-6455b7972b1a" />
<img width="1907" height="925" alt="image" src="https://github.com/user-attachments/assets/87215b8c-292c-4ce9-b984-94fcf3eecc62" />
<img width="1896" height="930" alt="image" src="https://github.com/user-attachments/assets/b6666143-b993-48a8-b0c3-49fb5fa8bea5" />
<img width="1910" height="922" alt="image" src="https://github.com/user-attachments/assets/e28d1a8e-b2cd-4bd9-a880-64b6e20d892f" />
<img width="1912" height="929" alt="image" src="https://github.com/user-attachments/assets/f2728520-2619-4303-b5cd-6637a2be1353" />
<img width="1912" height="930" alt="image" src="https://github.com/user-attachments/assets/d507b901-7a25-4918-bf3e-c9c36a4955ed" />
<img width="1914" height="974" alt="image" src="https://github.com/user-attachments/assets/dcaf27b4-20b1-4f34-bb42-f854a1b87c68" />
<img width="1876" height="964" alt="image" src="https://github.com/user-attachments/assets/c96642b2-a3f6-4d79-96ad-5c65a5660432" />

---

##  Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sinchana258/Inventory-Management-System.git
cd Inventory-Management-System

```
### 2. Backend Setup:
```bash
cd backend
npm install
cp .env.example .env   # Update with your DB and Email config
npm start              # Starts backend server on port 5000
```
### 3. Frontend Setup:
```bash
cd ../frontend
npm install
npm start              # Starts React app on port 3000
```

# Environment Variables (.env)
Refer to backend/.env.example for all required environment variables.

## TODO

 -Dockerize the project

 -Deploy backend & frontend

---
# Author
Sinchana T
- GitHub: @Sinchana258

# License
This project is licensed under the MIT License
