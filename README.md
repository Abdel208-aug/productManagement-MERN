# MERN Product Management Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing products with full **CRUD** functionality (Create, Read, Update, Delete). The application is built using a React frontend and a Node.js/Express backend connected to a MongoDB database.

## Features

- **Add Products**: Users can add products by providing details such as name, price, description, and quantity.
- **Update Products**: Users can modify product details.
- **Delete Products**: Users can delete products.
- **Confirmation Dialogs**: Confirmation is required before performing critical actions such as adding, updating, or deleting products.
- **API Integration**: The frontend interacts with the backend API to handle product management, with data stored in MongoDB.

---

## Project Structure

The project is divided into two main parts:

1. **Frontend** (React)
2. **Backend** (Node.js/Express + MongoDB)

---

## Prerequisites

- Node.js installed on your system.
- MongoDB installed locally or hosted on a cloud platform like MongoDB Atlas.
- A package manager like npm or yarn.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/product-management-app.git
cd product-management-app
```
### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd backend
npm install
```

## Running the Application
### Backend
To run the backend API:
1. Configure MongoDB connection:
  - Open the backend/app.js file and modify the MongoDB connection string to point to your MongoDB instance (either local or cloud).
  Example MongoDB connection string:

```js
mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true })
```
2. Run the server:

```bash
cd backend
npm start
```
The backend will be running on http://localhost:8080

### Frontend
To run the frontend React app:

  1. Run the frontend development server:

  ```bash
  cd frontend
  npm start
  ```
  The frontend will be running on http://localhost:3000.
