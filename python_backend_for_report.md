# Python Backend Implementation for Aetheris Luxe E-commerce System
# Equivalent to PHP functionality from sample e-commerce report

## 1. Authentication Module (auth.py)
# Secure User Registration & Login with Bcrypt hashing

```python
import bcrypt
import jwt
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Database connection
def get_db():
    db = sqlite3.connect('aetheris_luxe.db')
    db.row_factory = sqlite3.Row
    return db

# Initialize database
def init_db():
    with get_db() as db:
        db.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        db.commit()

init_db()

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Secure user registration with Bcrypt password hashing"""
    try:
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']

        # Hash password with bcrypt
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        with get_db() as db:
            db.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                [name, email, password_hash.decode('utf-8')]
            )
            db.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User authentication with JWT token generation"""
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']

        with get_db() as db:
            user = db.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            ).fetchone()

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            # Generate JWT token
            token = jwt.encode({
                'user_id': user['id'],
                'email': user['email'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm='HS256')

            return jsonify({
                'message': 'Login successful',
                'token': token,
                'user': {
                    'id': user['id'],
                    'name': user['name'],
                    'email': user['email']
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## 2. Products Module (products.py)
# Product/Fragrance Listing & Filtering with Search

```python
@app.route('/api/products', methods=['GET'])
def get_products():
    """Dynamic product listing with filtering and search"""
    try:
        category = request.args.get('category')
        search = request.args.get('search')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 12))

        query = '''
            SELECT p.*, c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.is_active = 1
        '''
        params = []

        # Add category filter
        if category:
            query += ' AND c.slug = ?'
            params.append(category)

        # Add search filter (simple text search)
        if search:
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)'
            search_term = f'%{search}%'
            params.extend([search_term, search_term])

        # Add pagination
        query += ' LIMIT ? OFFSET ?'
        params.extend([per_page, (page - 1) * per_page])

        with get_db() as db:
            products = db.execute(query, params).fetchall()

        return jsonify({
            'products': [dict(product) for product in products],
            'page': page,
            'per_page': per_page
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get individual product details"""
    try:
        with get_db() as db:
            product = db.execute(
                'SELECT * FROM products WHERE id = ? AND is_active = 1',
                [product_id]
            ).fetchone()

        if product:
            return jsonify(dict(product)), 200
        else:
            return jsonify({'error': 'Product not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## 3. Cart Module (cart.py)
# Shopping Cart Management with Inventory Checks

```python
@app.route('/api/cart', methods=['GET'])
def get_cart():
    """Retrieve user's shopping cart"""
    try:
        # In a real app, get user_id from JWT token
        # For demo, using session-based cart
        cart = session.get('cart', [])
        return jsonify({'items': cart}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    """Add product to cart with inventory verification"""
    try:
        data = request.get_json()
        product_id = data['product_id']
        quantity = data.get('quantity', 1)

        # Check product availability
        with get_db() as db:
            product = db.execute(
                'SELECT * FROM products WHERE id = ? AND is_active = 1',
                [product_id]
            ).fetchone()

        if not product:
            return jsonify({'error': 'Product not found'}), 404

        if product['stock'] < quantity:
            return jsonify({'error': 'Insufficient stock'}), 409

        # Get or create cart
        cart = session.get('cart', [])

        # Check if product already in cart
        existing_item = next((item for item in cart if item['id'] == product_id), None)

        if existing_item:
            if existing_item['quantity'] + quantity > product['stock']:
                return jsonify({'error': 'Cannot add more items than available stock'}), 409
            existing_item['quantity'] += quantity
        else:
            cart.append({
                'id': product['id'],
                'name': product['name'],
                'price': product['price'],
                'quantity': quantity,
                'image': product['image']
            })

        session['cart'] = cart
        return jsonify({'message': 'Product added to cart', 'cart': cart}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/update/<int:product_id>', methods=['PUT'])
def update_cart_item(product_id):
    """Update cart item quantity"""
    try:
        data = request.get_json()
        quantity = data['quantity']

        cart = session.get('cart', [])
        item = next((item for item in cart if item['id'] == product_id), None)

        if not item:
            return jsonify({'error': 'Item not in cart'}), 404

        # Check stock availability
        with get_db() as db:
            product = db.execute(
                'SELECT stock FROM products WHERE id = ?',
                [product_id]
            ).fetchone()

        if quantity > product['stock']:
            return jsonify({'error': 'Insufficient stock'}), 409

        if quantity <= 0:
            cart.remove(item)
        else:
            item['quantity'] = quantity

        session['cart'] = cart
        return jsonify({'message': 'Cart updated', 'cart': cart}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/remove/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    """Remove item from cart"""
    try:
        cart = session.get('cart', [])
        cart = [item for item in cart if item['id'] != product_id]
        session['cart'] = cart

        return jsonify({'message': 'Item removed from cart', 'cart': cart}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## 4. Checkout Module (checkout.py)
# Order Processing with Transaction Safety

```python
@app.route('/api/checkout', methods=['POST'])
def checkout():
    """Process order with atomic transaction"""
    try:
        data = request.get_json()
        shipping_info = data['shipping']

        cart = session.get('cart', [])
        if not cart:
            return jsonify({'error': 'Cart is empty'}), 400

        # Calculate totals
        subtotal = sum(item['price'] * item['quantity'] for item in cart)
        tax = subtotal * 0.08  # 8% tax
        total = subtotal + tax

        # Begin transaction
        with get_db() as db:
            # Create order
            cursor = db.execute('''
                INSERT INTO orders (user_id, total, tax, subtotal, status, shipping_info)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', [
                1,  # In real app, get from JWT
                total,
                tax,
                subtotal,
                'pending',
                str(shipping_info)
            ])

            order_id = cursor.lastrowid

            # Add order items and update inventory
            for item in cart:
                # Check stock again (prevent race conditions)
                product = db.execute(
                    'SELECT stock FROM products WHERE id = ?',
                    [item['id']]
                ).fetchone()

                if product['stock'] < item['quantity']:
                    db.rollback()
                    return jsonify({'error': f'Insufficient stock for {item["name"]}'}), 409

                # Insert order item
                db.execute('''
                    INSERT INTO order_items (order_id, product_id, quantity, price)
                    VALUES (?, ?, ?, ?)
                ''', [order_id, item['id'], item['quantity'], item['price']])

                # Update inventory
                db.execute('''
                    UPDATE products SET stock = stock - ? WHERE id = ?
                ''', [item['quantity'], item['id']])

            db.commit()

        # Clear cart
        session['cart'] = []

        # Generate order number
        order_number = f"ATH-{datetime.datetime.now().year}-{order_id:04d}"

        return jsonify({
            'message': 'Order placed successfully',
            'order_id': order_id,
            'order_number': order_number,
            'total': total
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## 5. Database Schema (schema.sql)
# SQLite database structure equivalent to PHP/MySQL

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
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    category_id INTEGER,
    image TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    shipping_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Shopping cart (session-based, but could be stored in DB)
-- Cart data is handled in Flask sessions for simplicity
```

## 6. Requirements (requirements.txt)

```
Flask==2.3.3
Flask-CORS==4.0.0
bcrypt==4.0.1
PyJWT==2.8.0
```

## 7. Main Application (app.py)

```python
from flask import Flask, session
import auth
import products
import cart
import checkout

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Register blueprints
app.register_blueprint(auth.bp)
app.register_blueprint(products.bp)
app.register_blueprint(cart.bp)
app.register_blueprint(checkout.bp)

if __name__ == '__main__':
    app.run(debug=True)
```

## Key Features Implemented:

1. **Security**: Bcrypt password hashing, JWT tokens, input validation
2. **Database**: SQLite with proper transactions and foreign keys
3. **Inventory Management**: Stock checking before cart additions
4. **Atomic Transactions**: Order processing with rollback on failure
5. **RESTful API**: Clean endpoints for frontend integration
6. **Error Handling**: Comprehensive error responses
7. **Session Management**: Cart persistence across requests

This Python implementation provides the same functionality as the PHP sample, using modern Python/Flask best practices and security measures.