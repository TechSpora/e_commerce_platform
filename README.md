# E-Commerce Platform

A comprehensive e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing (Stripe), inventory management, and an admin dashboard.

Key Features:
- User authentication (JWT)
- Payment processing (Stripe Payment Intents)
- Admin dashboard endpoints (role-based)
- Inventory management (CRUD for products)
- Orders and order history

Technologies:
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Payments: Stripe
- Auth: JSON Web Tokens (JWT)
- Passwords: bcrypt

Directory structure (scaffold)

```
/ (repo root)
├── README.md
├── server/
│   ├── package.json
│   ├── .env.example
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── stripe.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── paymentController.js
│   └── routes/
│       ├── auth.js
│       ├── products.js
│       └── orders.js
└── client/
    ├── package.json
    └── src/
        ├── index.js
        ├── App.js
        ├── services/
        │   ├── api.js
        │   └── auth.js
        ├── pages/
        │   ├── Home.js
        │   ├── Product.js
        │   └── Checkout.js
        └── components/
            └── (Cart, ProductCard, Navbar, etc.)
```

Quick start (development)
- Create a MongoDB DB and Stripe account.
- Copy `server/.env.example` → `server/.env` and fill in the values.
- From `/server`:
  - npm install
  - npm run dev
- From `/client`:
  - npm install
  - npm start

Notes
- The scaffold uses JWT authentication and role checks in middleware. Admin-only routes are clearly marked in controllers.
- Payment controller demonstrates creating a Stripe PaymentIntent and returning the client secret to the React frontend.

This scaffold provides a developer-ready starting point for the full-stack e-commerce app.