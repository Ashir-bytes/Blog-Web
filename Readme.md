# 📖 MyBlog

A simple and clean blog web app built with **React**, **Express.js**, **MySQL**, and **JWT Authentication**. Allows users to register, log in, manage their profile, and contact the site owner.

---

## 📦 Features

- User registration and login
- Password encryption with bcrypt
- JWT-based authentication and protected routes
- User profile page with token-based data fetching
- Contact form with thank-you message display
- MySQL database integration
- Responsive navigation with React Router
- Clean, modern UI styling

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, CSS
- **Backend:** Express.js, Node.js
- **Database:** MySQL
- **Authentication:** JWT, bcryptjs
- **CORS Handling**

---

## 📂 Project Structure



---

## 📑 API Endpoints

### 🔐 Authentication

- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Login and receive JWT token
- `GET /api/users/me` — Get user profile (requires Bearer token)

### 📩 Contact

- `POST /api/contact` — Submit a contact message

---

## 💾 Database Tables

### `users`

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

cd backend
npm install

cd frontend
npm install


### 📌 Set up MySQL Database
Create a database myblog

Run the provided SQL table creation scripts above.

Update your /backend/config/data.js with your database credentials.


### 📌 Run Project
node server.js
npm start


📃 License
MIT License

Copyright (c) 2025 Ashir

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

✨ Author
Ashir
🗓️ Project Date: May 1, 2025




---

✅ Done. Would you like me to save this for you as a file too?
