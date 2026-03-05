# 🛒 Full-Stack E-Commerce Platform

A modern, scalable, and high-performance E-Commerce web application developed using **Django REST Framework (Backend)** and **React (Frontend)**. This platform features an Amazon-inspired user interface, dynamic product categorization, and a complete order management system.

## 🌐 Live Demo

* **Frontend (Deployed on Vercel):** [https://e-commerce-drab-iota-38.vercel.app/](https://e-commerce-drab-iota-38.vercel.app/)
* **Backend API (Deployed on Render):** [https://e-commerce-hmvn.onrender.com/api/](https://e-commerce-hmvn.onrender.com/api/)

## 📸 Project Gallery
<div align="center">
<h3>🏠 Home & Dynamic Product Categories</h3>
   <img src="https://i.imgur.com/UwRTS2D.png" width="800" alt="Details">
<img src="https://i.imgur.com/9ysKn7Z.png" width="500" alt="Cart">
<img src="https://i.imgur.com/vq3Mu6w.png" width="500" alt="Checkout">
   


<h3>🛒 Product Details &  Checkout Summary</h3>
<img src="https://i.imgur.com/sRupjON.png" width="500" alt="product detais">
<img src="https://i.imgur.com/IFwJaJN.png" width="500" alt="checkout summary">
<img src="https://i.imgur.com/z3TbbEf.png" width="500" alt="checkout summary">

<h3>💳 Log in & Profile Management</h3>
<img src="https://i.imgur.com/es9mn7T.png" width="700" alt="log in">
<img src="https://i.imgur.com/oq54lEQ.png" width="500" alt="signup">
<img src="https://i.imgur.com/4R6j0BI.png" width="500" alt="profile">
<h3>📋 Order Tracking & Cart System </h3>
<img src="https://i.imgur.com/Zk8PeqG.png" width="500" alt="order tracking">
<img src="https://i.imgur.com/gVpOiDf.png" width="500" alt="Register">
</div>


## 🚀 Key Features

* **Amazon-Style UI:** Features a sticky search bar, dark-themed category navigation, and a dynamic auto-playing banner slider.
* **Secure Authentication:** User registration and login powered by JWT (JSON Web Tokens) for secure API communication.
* **Categorized Product Display:** Products are automatically grouped by categories on the home page with individual background styling.
* **Real-time Shopping Cart:** Add or remove items from the cart with instant calculations.
* **Order Management:** Complete checkout flow with order history tracking in the user profile.
* **Responsive Design:** Optimized for seamless performance across mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

**Backend:**

* **Framework:** Django & Django REST Framework (DRF)
* **Authentication:** SimpleJWT
* **Database:** PostgreSQL (Production) / SQLite (Development)
* **Deployment:** Render

**Frontend:**

* **Library:** React.js (Vite)
* **API Client:** Axios
* **Styling:** CSS3 (Custom Grid Layouts & Animations)
* **Deployment:** Vercel

## 📂 Project Structure

```text
mdshahadathossainit-e-commerce/
├── api/                        # Django Backend App (Core Logic)
│   ├── migrations/             # Database Migration Files (0001 to 0004)
│   ├── admin.py                # Admin Panel Configuration
│   ├── models.py               # Database Schema (User, Product, Cart, Order)
│   ├── serializers.py          # Object to JSON Converters
│   ├── urls.py                 # API Routing
│   └── views.py                # API Logic & Response Handling
├── core/                       # Project Settings
│   ├── settings.py             # Global Configurations (DB, JWT, Media)
│   ├── urls.py                 # Main URL Dispatcher
│   └── wsgi.py                 # Server Gateway Interface
├── frontend/                   # React Frontend Application
│   ├── public/                 # Static Assets
│   ├── src/
│   │   ├── components/         # Reusable Components (Navbar, ProductCard)
│   │   ├── pages/              # Main Page Components
│   │   │   ├── Home.jsx        # Dashboard & Product Listing
│   │   │   ├── Login.jsx       # User Authentication
│   │   │   ├── Profile.jsx     # User Info & Order History
│   │   │   ├── Cart.jsx        # Shopping Cart Management
│   │   │   └── Checkout.jsx    # Shipping & Payment Handling
│   │   ├── api.js              # Axios Central Configuration
│   │   ├── App.jsx             # Main Router & Layout
│   │   └── main.jsx            # Entry Point
│   ├── package.json            # Node Dependencies
│   └── vercel.json             # Frontend Deployment Config
├── manage.py                   # Django Management Script
├── migrate_db.py               # Custom Migration Runner
└── requirements.txt            # Python Backend Dependencies

```

## ⚙️ Setup & Installation

### Backend Setup:

1. Clone the repository:
```bash
git clone https://github.com/mdshahadathossainit/E-Commerce.git

```


2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

```


3. Install dependencies:
```bash
pip install -r requirements.txt

```


4. Run migrations:
```bash
python manage.py migrate

```


5. Start the server:
```bash
python manage.py runserver

```



### Frontend Setup:

1. Navigate to the frontend folder:
```bash
cd frontend

```


2. Install NPM packages:
```bash
npm install

```


3. Launch the development server:
```bash
npm run dev

```



## 🔗 Primary API Endpoints

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/products/` | GET | List all products with Search/Filter support |
| `/api/categories/` | GET | List all available product categories |
| `/api/cart/` | GET/POST | Manage user shopping cart items |
| `/api/orders/` | GET/POST | Place new orders and view order history |

---

**Developed by [Md Shahadat Hossain**](https://mdshahadathossainit.github.io/)
