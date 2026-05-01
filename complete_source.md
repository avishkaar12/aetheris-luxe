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

## 8. Secure Checkout (`checkout.html`)
Paste this into your `checkout.html` file.

```html
{{DATA:SCREEN:SCREEN_9}}
```
