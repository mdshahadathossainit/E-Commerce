# 🛒 Full-Stack E-Commerce Platform

A modern, scalable, and high-performance E-Commerce web application developed using **Django REST Framework (Backend)** and **React (Frontend)**. This platform features an Amazon-inspired user interface, dynamic product categorization, and a complete order management system.

## 🌐 Live Demo
* **Frontend (Deployed on Vercel):** [https://e-commerce-drab-iota-38.vercel.app/](https://e-commerce-drab-iota-38.vercel.app/)
* **Backend API (Deployed on Render):** [https://e-commerce-hmvn.onrender.com/api/](https://e-commerce-hmvn.onrender.com/api/)

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
├── api/                 # Django App (Models, Views, Serializers)
├── core/                # Project Settings & Configurations
├── frontend/            # React Application (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI Components (ProductCard, etc.)
│   │   ├── pages/       # Page Components (Home, Cart, Checkout, Profile)
│   │   └── api.js       # Axios Interceptor Configuration
├── manage.py            # Django Management Script
└── requirements.txt     # Python Dependencies

```


   ## ⚙️ Setup & Installation

### Backend Setup:

1. Clone the repository:
`git clone https://github.com/mdshahadathossainit/E-Commerce.git`
2. Create and activate a virtual environment:
`python -m venv venv`
`source venv/bin/activate` (Linux) or `venv\Scripts\activate` (Windows)
3. Install dependencies:
`pip install -r requirements.txt`
4. Run migrations:
`python manage.py migrate`
5. Start the server:
`python manage.py runserver`
```



   ### Frontend Setup:

1. Navigate to the frontend folder:
`cd frontend`
2. Install NPM packages:
`npm install`
3. Launch the development server:
`npm run dev`




```
 ## 🔗 Primary API Endpoints

Endpoint,Method,Description
/api/products/,GET,List all products with Search/Filter support
/api/categories/,GET,List all available product categories
/api/cart/,GET/POST,Manage user shopping cart items
/api/orders/,GET/POST,Place new orders and view order history

---
```

**Developed by [Md Shahadat Hossain**](https://mdshahadathossainit.github.io/)

```

