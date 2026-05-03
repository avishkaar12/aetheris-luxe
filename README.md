# 🌟 Aetheris Luxe - Luxury Perfume Boutique

<div align="center">
  <img src="https://img.shields.io/badge/Status-Complete-success?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Frontend-HTML/CSS/JS-blue?style=for-the-badge" alt="Frontend"/>
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge" alt="Deployment"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-gold?style=for-the-badge" alt="Version"/>
</div>

---

## ✨ **Legacy of Olfactory Artistry**

> *Journey into the void where scent becomes shadow, and fragrance becomes a timeless manuscript written upon the skin.*

Aetheris Luxe is a premium e-commerce website for an exclusive perfume boutique, featuring a sophisticated glassmorphic design with dark, luxurious aesthetics. The site showcases rare botanical extractions, bespoke scent creation, and a curated collection of olfactory masterpieces.

---

## 🎨 **Design Philosophy**

### **Visual Identity**
- **Color Palette**: Obsidian black, champagne gold, and royal maroon
- **Typography**: Noto Serif for elegant, timeless readability
- **Aesthetic**: Glassmorphic panels with backdrop blur effects
- **Theme**: Dark mode with selective gold accents

### **Key Features**
- 🛍️ **Complete E-commerce Flow**: Browse → Cart → Checkout → Success
- 🎨 **Bespoke Atelier**: Custom scent creation with ingredient selection
- 👤 **User Authentication**: Secure login system with local storage
- 🛒 **Smart Cart System**: Persistent cart with quantity management
- 📱 **Responsive Design**: Optimized for all devices
- 🎯 **Clean URLs**: No `.html` extensions via Vercel configuration

---

## 🏗️ **Architecture**

### **Tech Stack**
```
Frontend:    HTML5, CSS3, JavaScript (ES6+)
Backend:     Python (Vercel Serverless Functions)
Styling:     Tailwind CSS + Custom Glassmorphic Effects
Fonts:       Google Fonts (Noto Serif, Material Symbols)
Icons:       Material Symbols Outlined
Deployment:  Vercel (Full-stack via GitHub)
```

### **Project Structure**
```
aetheris-luxe/
├── 📄 index.html              # Homepage with hero section
├── 📄 collections.html        # Product catalog
├── 📄 bespoke.html           # Custom scent creation
├── 📄 product-detail.html    # Individual product pages
├── 📄 cart.html              # Shopping cart
├── 📄 checkout.html          # Payment processing
├── 📄 login.html             # User authentication
├── 📄 profiles.html          # User profiles/scent preferences
├── 📄 order-success.html     # Order confirmation
├── 📄 main.js                # Site-wide logic & authentication
├── 📄 cart.js                # Cart management system
├── 📄 styles.css             # Additional custom styles
├── 📄 vercel.json            # Vercel deployment config
└── 📁 assets/                # Images and design assets
```

---

## 🚀 **Live Demo**

🌐 **[View Live Site](https://aetheris-luxe.vercel.app)**

### **Pages Overview**
- **🏠 Homepage**: Dramatic hero section with brand story
- **🛍️ Collections**: Curated fragrance vault with product grid
- **🎨 Bespoke Atelier**: Interactive scent customization
- **📦 Product Details**: Individual fragrance showcases
- **🛒 Shopping Cart**: Full cart management with persistence
- **💳 Checkout**: Secure payment flow simulation
- **🔐 Login**: Authentication system
- **👤 Profiles**: User dashboard and preferences

---

## 🛠️ **Development Setup**

### **Prerequisites**
- Modern web browser
- Git for version control
- Vercel account (for deployment)
- Python 3.8+ (for backend)
- pip (Python package manager)

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/avishkaar12/aetheris-luxe.git
cd aetheris-luxe

# Frontend: Open in browser (static HTML)
# Simply open index.html in your browser or use a local server

# Backend: Vercel serverless functions (api/ directory)
# These deploy automatically with Vercel
```

### **Deployment to Vercel**
```bash
# Push to GitHub (if not already)
git add .
git commit -m "Add Python serverless backend for Vercel"
git push origin main

# Vercel will automatically detect and deploy:
# - Static frontend files
# - Python serverless functions in api/ directory
# - API endpoints available at https://your-app.vercel.app/api/*

# API Endpoints:
# POST /api/auth/register - User registration
# POST /api/auth/login - User login  
# GET /api/products - Get products (optional ?category=oud)
# GET /api/cart - Get cart (mock data)
# POST /api/cart - Add to cart
# POST /api/checkout - Process order

# Update your JavaScript API_BASE to your Vercel URL
const API_BASE = 'https://your-vercel-app.vercel.app/api';
```

### **Production Considerations**
- **Database**: Replace mock data with a database (Vercel supports PostgreSQL, MongoDB, etc.)
- **Authentication**: Implement proper JWT tokens or sessions
- **Payment**: Integrate Stripe, PayPal, or other payment gateways
- **Security**: Add input validation, rate limiting, and HTTPS enforcement

### **Deployment to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Or connect GitHub repo in Vercel dashboard
```

---

## 🎯 **Key Features**

### **🛒 E-commerce Functionality**
- Persistent shopping cart with localStorage
- Real-time cart badge updates
- Quantity management and item removal
- Tax calculation and order totals
- Order success confirmation

### **🎨 Interactive Elements**
- Bespoke scent creation with ingredient selection
- Smooth animations and hover effects
- Glassmorphic design with backdrop blur
- Responsive navigation and mobile optimization

### **🔐 User Experience**
- Seamless authentication flow
- Form validation and error handling
- Toast notifications for user feedback
- Clean, intuitive navigation

### **📱 Responsive Design**
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Optimized performance across devices

---

## 🎨 **Design Highlights**

### **Glassmorphic Effects**
```css
.glass-panel {
  background: rgba(18, 20, 20, 0.6);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(238, 192, 104, 0.2);
}
```

### **Color Scheme**
```css
:root {
  --surface: #121414;      /* Obsidian Base */
  --secondary: #eec068;    /* Champagne Gold */
  --primary: #ffb3ac;      /* Soft Rose */
  --tertiary: #c8c6c5;     /* Warm Gray */
}
```

### **Typography Scale**
- **Display**: 72px - Headlines and hero text
- **Headline**: 48px/32px - Section headers
- **Title**: 24px - Card titles and buttons
- **Body**: 18px/16px - Content and descriptions
- **Label**: 12px - Captions and metadata

---

## 📊 **Performance & Optimization**

- **Static Site**: No server-side rendering needed
- **Optimized Assets**: Compressed images and minified code
- **Fast Loading**: CDN-hosted fonts and libraries
- **SEO Ready**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation

---

## 🔮 **Future Enhancements**

- [ ] **Backend Integration**: MongoDB Stitch/Realm for data persistence
- [ ] **Payment Processing**: Stripe/PayPal integration
- [ ] **User Accounts**: Full user management system
- [ ] **Inventory Management**: Real-time stock tracking
- [ ] **Email Notifications**: Order confirmations and updates
- [ ] **Advanced Search**: Filter and sort products
- [ ] **Wishlist**: Save favorite fragrances
- [ ] **Reviews & Ratings**: Customer feedback system

---

## 📄 **License**

This project is created for educational and portfolio purposes. All design assets and content are original creations.

---

## 👨‍💻 **About the Developer**

Crafted with passion for luxury e-commerce and modern web development.

**Connect:**
- 🌐 [Portfolio](https://github.com/avishkaar12)
- 💼 [LinkedIn](https://linkedin.com/in/avishkaar12)
- 📧 [Email](mailto:avishkaar@example.com)

---

<div align="center">
  <p><strong>Experience the art of fragrance through code</strong></p>
  <p><em>Where every pixel tells a story of olfactory luxury</em></p>
</div>
