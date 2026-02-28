```markdown
# Full-Stack E-Commerce Platform

A robust and scalable E-Commerce web application built with **Django REST Framework (Backend)** and **React (Frontend)**. This project includes user authentication, product management, shopping cart functionality, and an order tracking system.

## 🚀 Features

- **User Authentication:** Secure Login and Registration using JWT (JSON Web Tokens).
- **Product Management:** Search, Filter by Category, and detailed Product views.
- **Shopping Cart:** Add/Remove products with real-time quantity updates.
- **Checkout System:** Shipping address management and Payment Method selection.
- **User Profile:** Order history tracking with payment and delivery status.
- **Responsive Design:** Fully functional on both Desktop and Mobile devices.

## 🛠️ Tech Stack

**Backend:**
- Python & Django
- Django REST Framework (DRF)
- JWT Authentication (SimpleJWT)
- SQLite (Development) / PostgreSQL (Production)

**Frontend:**
- React.js (Vite)
- React Router DOM
- Axios (API Integration)
- CSS3 (Custom Styling)



## 📂 Project Structure

```text
E-Commerce/
├── core/                # Django Project Settings
├── api/                 # Django App (Models, Views, Serializers)
├── frontend/            # React Application (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI Components
│   │   ├── pages/       # Page Components (Home, Login, Cart, etc.)
│   │   ├── api.js       # Axios Configuration
│   │   └── App.jsx      # Routing & Main Entry
├── manage.py
└── requirements.txt     # Python Dependencies

```

## ⚙️ Setup Instructions

### Backend Setup:

1. Clone the repository: `git clone <your-repo-link>`
2. Create a virtual environment: `python -m venv venv`
3. Activate venv: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Start server: `python manage.py runserver`

### Frontend Setup:

1. Navigate to frontend: `cd frontend`
2. Install packages: `npm install`
3. Start development server: `npm run dev`

## 🔗 API Endpoints

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/register/` | POST | User Registration |
| `/api/login/` | POST | User Login (Get JWT) |
| `/api/products/` | GET | List all products with Search/Filter |
| `/api/cart/` | GET/POST | Manage Shopping Cart |
| `/api/orders/` | GET/POST | Place and View Orders |

## 🛡️ Key Implementation

* **Atomic Transactions:** Used to ensure data integrity during the checkout process.
* **Scalable Schema:** Designed to handle complex relationships between Users, Products, and Orders.

---

Developed by **Md Shahadat Hossain**

```

---
