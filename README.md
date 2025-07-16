# 🍬 Sweet Shop Management System (MERN Stack)

> A modern inventory and sales management system for sweet shops, built with the MERN stack and developed using Test-Driven Development (TDD) principles.

## 🚀 Features

### 🛍️ Sweet Management
- Add new sweets with details (name, category, price, quantity)
- View, update, and delete sweets
- Category selection for classification

### 📦 Inventory Control
- Purchase sweets (reduces stock)
- Restock sweets (increases stock)
- Quantity validation for stock limits

### 🔍 Smart Search & Filter
- Search sweets by name
- Filter by category or price range
- Case-insensitive and responsive filtering

### 💻 Responsive & Modern UI
- Tailwind CSS styling
- Clean and intuitive design
- Fully responsive for mobile and desktop

---

## 🛠 Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios
- React Testing Library
- Jest

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Jest + Supertest (API testing)

---

## 🏁 Getting Started

### Prerequisites
- Node.js v16+
- npm v8+
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sweet-shop.git
   cd sweet-shop
   ```

2. **Set up backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```
   Edit `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/sweet_shop
   PORT=5000
   JWT_SECRET=your_secret_key
   ```

3. **Set up frontend**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   ```
   Edit `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

---

## 🏃 Running the System

1. **Start backend server**
   ```bash
   cd server
   npm run dev
   ```
   - API will run on `http://localhost:5000`

2. **Start frontend development server**
   ```bash
   cd ../client
   npm start
   ```
   - App will open in browser at `http://localhost:3000`

3. **Run tests**
   - Backend tests:
     ```bash
     cd server
     npm test
     ```
   - Frontend tests:
     ```bash
     cd ../client
     npm test
     ```

---

## 📂 Project Structure

```
sweet-shop/
├── client/               # React frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # State management
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # View components
│   │   ├── services/     # API services
│   │   └── styles/       # Tailwind config
│   └── package.json
├── server/               # Node.js backend
│   ├── config/           # DB configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & error handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── tests/            # Test suites
│   └── package.json
├── screenshots/          # Application screenshots
└── README.md             # This document
```

---

## 🧪 Testing Approach

Our TDD workflow ensures reliability:

1. **Backend**:
   - 92% test coverage
   - 24 passing unit tests
   - API contract validation

2. **Frontend**:
   - 85% test coverage
   - 15 component tests
   - User interaction tests

![Test Coverage](/screenshots/coverage.png)

---

## 🌐 Deployment

### Option 1: Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Run both servers in development
cd server && npm run dev
cd client && npm start
```

### Option 2: MongoDB Atlas
1. Create free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Update `MONGO_URI` in server/.env
3. Add your IP to Atlas IP whitelist


### Screenshots
<img width="1365" height="681" alt="image" src="https://github.com/user-attachments/assets/b0c97f06-7e2f-4927-b718-66805804853f" />

<img width="1365" height="677" alt="image" src="https://github.com/user-attachments/assets/6e3ea898-f8e5-4bf1-a6d8-d409dfa94663" />

<img width="1365" height="676" alt="image" src="https://github.com/user-attachments/assets/c8985844-ee87-4c38-82c3-4bb81e41d2cd" />
