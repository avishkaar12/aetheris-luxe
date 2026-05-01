class AetherisCartSystem {
  constructor() {
    this.storageKey = 'aetheris_cart';
    this.lastOrderKey = 'aetheris_last_order';
    this.cart = this.loadCart();
    this.bind();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    this.updateBadges();
    this.renderCartPage();
  }

  addToCart(product) {
    const existing = this.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
    this.toast(`${product.name} added to your cart`);
  }

  removeFromCart(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  setLastOrder(order) {
    localStorage.setItem(this.lastOrderKey, JSON.stringify(order));
  }

  getLastOrder() {
    try {
      return JSON.parse(localStorage.getItem(this.lastOrderKey) || 'null');
    } catch {
      return null;
    }
  }

  updateQuantity(id, delta) {
    const item = this.cart.find((x) => x.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    this.saveCart();
  }

  totals() {
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    return { subtotal, tax, total: subtotal + tax };
  }

  updateBadges() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(count);
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  renderCartPage() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="form-panel">
          <h3>Your cart is empty</h3>
          <p class="muted">Discover the collections and add your first signature scent.</p>
          <a class="btn btn-secondary" href="collections.html">Go to Collections</a>
        </div>
      `;
      const totalsWrap = document.getElementById('checkout-totals');
      if (totalsWrap) totalsWrap.style.display = 'none';
      return;
    }

    container.innerHTML = this.cart
      .map(
        (item) => `
          <article class="cart-item reveal">
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <strong>${item.name}</strong>
              <div class="muted" style="font-size:12px">${item.size} · ${item.type}</div>
              <div class="qty" style="margin-top:8px">
                <button data-action="qty-dec" data-id="${item.id}" type="button">−</button>
                <span>${String(item.quantity).padStart(2, '0')}</span>
                <button data-action="qty-inc" data-id="${item.id}" type="button">+</button>
              </div>
            </div>
            <div>
              <div class="price">$${item.price.toFixed(2)}</div>
              <button data-action="remove" data-id="${item.id}" class="btn btn-secondary" style="margin-top:8px;padding:0.4rem 0.8rem" type="button">Remove</button>
            </div>
          </article>
        `,
      )
      .join('');

    const totals = this.totals();
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;

    const totalsWrap = document.getElementById('checkout-totals');
    if (totalsWrap) totalsWrap.style.display = 'block';
  }

  toast(message) {
    const t = document.createElement('div');
    t.textContent = message;
    t.style.position = 'fixed';
    t.style.bottom = '20px';
    t.style.left = '50%';
    t.style.transform = 'translateX(-50%)';
    t.style.padding = '12px 16px';
    t.style.borderRadius = '999px';
    t.style.background = 'rgba(18,21,26,0.94)';
    t.style.border = '1px solid rgba(201,169,97,0.35)';
    t.style.color = '#f0cd88';
    t.style.fontSize = '12px';
    t.style.letterSpacing = '0.08em';
    t.style.textTransform = 'uppercase';
    t.style.zIndex = '9999';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1900);
  }

  bind() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateBadges();
      this.renderCartPage();

      document.body.addEventListener('click', (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const id = target.dataset.id;
        if (target.dataset.action === 'qty-inc') this.updateQuantity(id, 1);
        if (target.dataset.action === 'qty-dec') this.updateQuantity(id, -1);
        if (target.dataset.action === 'remove') this.removeFromCart(id);
      });
    });
  }
}

window.AetherisCart = new AetherisCartSystem();
