# Aura Artistry: COMPLETE FINAL SOURCE CODE

Copy the code from each section below and paste it into the corresponding file in your VS Code project folder (`aura-artistry`). This code is fully "clickable" and contains all the glassmorphism and luxury styling we've designed.

---

## 1. Global Styles (`styles.css`)
Paste this code into your `styles.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-gold: #D4AF37;
  --rose-quartz: #F7CAC9;
  --dusty-rose: #967170;
  --surface-dark: #131313;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}

body {
  background-color: var(--surface-dark);
  color: white;
  font-family: 'Noto Serif', serif;
}

.glass-morphism {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

.text-gold { color: var(--primary-gold); }
.bg-gold { background-color: var(--primary-gold); }
```

---

## 2. Storefront / Home (`index.html`)
Paste this into your `index.html` file.

```html
{{DATA:SCREEN:SCREEN_19}}
```

---

## 3. Curated Collections (`collections.html`)
Paste this into your `collections.html` file.

```html
{{DATA:SCREEN:SCREEN_3}}
```

---

## 4. Scent Profiles (`profiles.html`)
Paste this into your `profiles.html` file.

```html
{{DATA:SCREEN:SCREEN_5}}
```

---

## 5. Bespoke Atelier (`bespoke.html`)
Paste this into your `bespoke.html` file.

```html
{{DATA:SCREEN:SCREEN_20}}
```

---

## 6. Product Detail: Celestial Oud (`product-detail.html`)
Paste this into your `product-detail.html` file.

```html
{{DATA:SCREEN:SCREEN_8}}
```

---

## 7. Shopping Bag (`cart.html`)
Paste this into your `cart.html` file.

```html
{{DATA:SCREEN:SCREEN_7}}
```

---

---

## 9. Backend API (Python/Vercel Serverless Functions)
Since the sample e-commerce report uses PHP for backend functionality, but our project deploys on Vercel, I've implemented Python serverless functions instead of PHP. These provide the same functionality for user authentication, product management, cart operations, and order processing. The functions are in the `api/` directory and deploy automatically with Vercel.

### API Structure:
```
api/
├── auth/
│   ├── register.py    # POST /api/auth/register
│   └── login.py       # POST /api/auth/login
├── products.py        # GET /api/products
├── cart.py           # GET/POST /api/cart
└── checkout.py       # POST /api/checkout
```

### Example: `api/auth/register.py`
```python
import json

users = {}  # Mock - use database in production

def handler(event, context):
    if event['httpMethod'] != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    data = json.loads(event['body'])
    username = data.get('username')
    password = data.get('password')

    if username in users:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'User already exists'})
        }

    users[username] = {'password': password, 'cart': []}
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Registration successful'})
    }
```

---

## 10. Updated JavaScript Integration (`main.js`)
Update your `main.js` to integrate with the Vercel serverless API instead of local storage. The API base URL will be your Vercel deployment URL.

```javascript
// API base URL - update with your Vercel deployment URL
const API_BASE = 'https://your-vercel-app.vercel.app/api';

// Authentication functions
async function register(username, password) {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

async function login(username, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

// Product functions
async function fetchProducts(category = null) {
    const url = category ? `${API_BASE}/products?category=${category}` : `${API_BASE}/products`;
    const response = await fetch(url);
    return response.json();
}

// Cart functions
async function getCart() {
    const response = await fetch(`${API_BASE}/cart`);
    return response.json();
}

async function addToCart(productId, quantity = 1) {
    const response = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
    });
    return response.json();
}

// Checkout function
async function checkout(orderData) {
    const response = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    return response.json();
}

// Update existing cart.js and other JS files to use these API functions
// instead of local storage operations
```

---
