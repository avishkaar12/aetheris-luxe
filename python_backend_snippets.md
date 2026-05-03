# Python Backend Snippets for Aetheris Luxe Report

## 1. Authentication (auth.py)

```python
import bcrypt
import jwt
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your-secret-key-here'

def get_db():
    db = sqlite3.connect('aetheris_luxe.db')
    db.row_factory = sqlite3.Row
    return db

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    password_hash = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    with get_db() as db:
        db.execute('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                  [data['name'], data['email'], password_hash.decode('utf-8')])
        db.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    with get_db() as db:
        user = db.execute('SELECT * FROM users WHERE email = ?', [data['email']]).fetchone()

    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password_hash'].encode('utf-8')):
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token, 'user': dict(user)}), 200
    return jsonify({'error': 'Invalid credentials'}), 401
```

## 2. Products (products.py)

```python
@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search')
    page = int(request.args.get('page', 1))

    query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_active = 1'
    params = []

    if category:
        query += ' AND c.slug = ?'
        params.append(category)

    if search:
        query += ' AND (p.name LIKE ? OR p.description LIKE ?)'
        search_term = f'%{search}%'
        params.extend([search_term, search_term])

    query += ' LIMIT 12 OFFSET ?'
    params.append((page - 1) * 12)

    with get_db() as db:
        products = db.execute(query, params).fetchall()

    return jsonify({'products': [dict(p) for p in products], 'page': page}), 200
```

## 3. Shopping Cart (cart.py)

```python
from flask import session

@app.route('/api/cart', methods=['GET'])
def get_cart():
    cart = session.get('cart', [])
    return jsonify({'cart': cart, 'total': sum(item['price'] * item['quantity'] for item in cart)}), 200

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data['product_id']
    quantity = data.get('quantity', 1)

    with get_db() as db:
        product = db.execute('SELECT * FROM products WHERE id = ? AND stock >= ?',
                           [product_id, quantity]).fetchone()

    if not product:
        return jsonify({'error': 'Product not available or insufficient stock'}), 400

    cart = session.get('cart', [])
    # Check if product already in cart
    for item in cart:
        if item['id'] == product_id:
            item['quantity'] += quantity
            break
    else:
        cart.append({
            'id': product['id'],
            'name': product['name'],
            'price': product['price'],
            'quantity': quantity
        })

    session['cart'] = cart
    return jsonify({'message': 'Added to cart', 'cart': cart}), 200

@app.route('/api/cart/remove/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    cart = session.get('cart', [])
    cart = [item for item in cart if item['id'] != product_id]
    session['cart'] = cart
    return jsonify({'message': 'Removed from cart', 'cart': cart}), 200
```

## 4. Checkout (checkout.py)

```python
@app.route('/api/checkout', methods=['POST'])
def checkout():
    cart = session.get('cart', [])
    if not cart:
        return jsonify({'error': 'Cart is empty'}), 400

    data = request.get_json()
    user_id = data.get('user_id')  # From JWT token

    try:
        with get_db() as db:
            # Start transaction
            db.execute('BEGIN TRANSACTION')

            # Calculate total
            total = sum(item['price'] * item['quantity'] for item in cart)

            # Create order
            cursor = db.execute('INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
                              [user_id, total, 'pending'])
            order_id = cursor.lastrowid

            # Add order items and update inventory
            for item in cart:
                db.execute('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                          [order_id, item['id'], item['quantity'], item['price']])

                # Update product stock
                db.execute('UPDATE products SET stock = stock - ? WHERE id = ?',
                          [item['quantity'], item['id']])

            db.commit()

            # Clear cart
            session.pop('cart', None)

            return jsonify({
                'message': 'Order placed successfully',
                'order_id': order_id,
                'total': total
            }), 201

    except Exception as e:
        db.rollback()
        return jsonify({'error': 'Order failed: ' + str(e)}), 500
```

## 5. Database Schema (schema.sql)

```sql
-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- Products table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    category_id INTEGER,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## 6. Requirements (requirements.txt)

```
Flask==2.3.3
Flask-CORS==4.0.0
bcrypt==4.0.1
PyJWT==2.8.0
```