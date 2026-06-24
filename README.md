# 🏥 Doctor Appointment Booking App (MERN Stack)

A full-stack **Doctor Appointment Booking System** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. This application allows patients to book appointments with doctors, and doctors/admins to manage schedules efficiently.

---

## 🚀 Features

### 👨‍⚕️ Patient Features
- User registration and login
- Browse available doctors
- View doctor profiles and availability
- Book appointments
- View and manage booked appointments

### 🧑‍⚕️ Doctor Features
- Doctor dashboard
- Manage availability/schedule
- View appointments
- Accept/Reject appointments

### 🛠️ Admin Features
- Manage doctors and users
- View all appointments
- Monitor system activity

---

## 🧑‍💻 Tech Stack

**Frontend:**
- React.js
- Redux / Context API
- Tailwind CSS / Bootstrap (optional)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication:**
- JWT (JSON Web Token)
- bcrypt.js

---

## 📁 Project Structure

/client        → React Frontend  
/server        → Node + Express Backend  
/models        → MongoDB Schemas  
/routes        → API Routes  
/controllers   → Business Logic  
/middleware    → Auth Middleware  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/furqancsit/doctor-appointment-app.git
cd doctor-appointment-app
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the **server** directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the application

#### Start Backend
```bash
cd server
npm start
```

#### Start Frontend
```bash
cd client
npm start
```

---

## 🌐 API Endpoints (Example)

### Auth Routes
- POST /api/auth/register → Register user
- POST /api/auth/login → Login user

### Doctor Routes
- GET /api/doctors → Get all doctors
- POST /api/doctors → Add doctor (admin)

### Appointment Routes
- POST /api/appointments/book → Book appointment
- GET /api/appointments/:userId → Get user appointments

---

## 📸 Screenshots

Add project screenshots here

---

## 🔐 Authentication Flow

- User registers / logs in
- Server generates JWT token
- Token is used for protected routes

---

## 📌 Future Improvements

- Video consultation feature
- Email/SMS notifications
- Payment integration
- Real-time chat between doctor & patient


---

## 🤝 Contributing

1. Fork the repo  
2. Create a new branch (feature-branch)  
3. Commit changes  
4. Push and create a Pull Request  

---


## 👨‍💻 Author

- Abdul Furqan  
- GitHub: https://github.com/furqancsit

---

⭐ If you like this project, don't forget to star the repo!