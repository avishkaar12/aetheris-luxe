class AetherisSite {
  constructor() {
    this.authKey = 'aetheris_auth';
    this.selectedNotes = new Set();
    // API base URL - update with your Vercel deployment URL
    this.API_BASE = 'https://your-vercel-app.vercel.app/api';
    this.bind();
  }

  // API Methods
  async apiRegister(username, password) {
    try {
      const response = await fetch(`${this.API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      return { error: 'Network error' };
    }
  }

  async apiLogin(username, password) {
    try {
      const response = await fetch(`${this.API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Network error' };
    }
  }

  async apiGetProducts(category = null) {
    try {
      const url = category ? `${this.API_BASE}/products?category=${category}` : `${this.API_BASE}/products`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Products fetch error:', error);
      return [];
    }
  }

  async apiGetCart() {
    try {
      const response = await fetch(`${this.API_BASE}/cart`);
      return await response.json();
    } catch (error) {
      console.error('Cart fetch error:', error);
      return { items: [], total: 0 };
    }
  }

  async apiAddToCart(productId, quantity = 1) {
    try {
      const response = await fetch(`${this.API_BASE}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
      });
      return await response.json();
    } catch (error) {
      console.error('Add to cart error:', error);
      return { error: 'Network error' };
    }
  }

  async apiCheckout(orderData) {
    try {
      const response = await fetch(`${this.API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await response.json();
    } catch (error) {
      console.error('Checkout error:', error);
      return { error: 'Network error' };
    }
  }

  currentUser() {
    try {
      return JSON.parse(localStorage.getItem(this.authKey) || 'null');
    } catch {
      return null;
    }
  }

  setUser(email) {
    localStorage.setItem(this.authKey, JSON.stringify({ email }));
  }

  clearUser() {
    localStorage.removeItem(this.authKey);
  }

  updateUserUI() {
    const user = this.currentUser();
    document.querySelectorAll('[data-user-email]').forEach((el) => {
      el.textContent = user ? user.email : 'Guest';
    });

    document.querySelectorAll('[data-user-state]').forEach((el) => {
      el.textContent = user ? 'Member' : 'Visitor';
    });

    document.querySelectorAll('[data-auth-toggle]').forEach((el) => {
      if (user) {
        el.textContent = 'Logout';
        el.setAttribute('href', '#logout');
      } else {
        el.textContent = 'Login';
        el.setAttribute('href', 'login.html');
      }
    });
  }

  pageName() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  bindLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value.trim();
      const password = form.querySelector('input[type="password"]')?.value.trim();
      if (!email || !password) {
        window.AetherisCart?.toast('Please enter email and password');
        return;
      }

      // Try login first
      const loginResult = await this.apiLogin(email, password);
      if (loginResult.error) {
        // If login fails, try registration
        const registerResult = await this.apiRegister(email, password);
        if (registerResult.error) {
          window.AetherisCart?.toast('Authentication failed: ' + registerResult.error);
          return;
        }
        window.AetherisCart?.toast('Account created and logged in');
      } else {
        window.AetherisCart?.toast('Welcome back to Aetheris');
      }

      // Store user locally for UI purposes
      this.setUser(email);
      this.updateUserUI();

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 700);
    });
  }

  bindAuthActions() {
    document.body.addEventListener('click', (event) => {
      const link = event.target.closest('[data-auth-toggle]');
      if (!link) return;
      if (link.getAttribute('href') !== '#logout') return;
      event.preventDefault();
      this.clearUser();
      this.updateUserUI();
      window.AetherisCart?.toast('Logged out');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });
  }

  bindAddToCart() {
    document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price || 0);
        const size = btn.dataset.size || '100ML';
        const type = btn.dataset.type || 'Extrait de Parfum';
        const image = btn.dataset.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx-uvKRTRrMJyLbVlLT4ZO5aK9lfF4VVQrbQ9-iZPD8Dji7pBht_bx4RjlnUMdQSEQTeeyDRv7B3JeuP3a8yOUdy5FUSFbaNux_j_Qes-RlGXnebW6wyhL4F_1FcqS_DYUQeUEeawDEru2cCfjAM5DD9HDK1dXHU5j8y8HW8pZBGZNR9oUjiOk6wxX38CLK_6ev9slssQc3dsKUEcezaYGb5chQV39VxEFYbKQdZFWQQJXsgCVbOzx0lvnwucUYq_vNwWJZDt8Weo';
        if (!id || !name || !price) return;

        // Add to API cart
        const result = await this.apiAddToCart(id, 1);
        if (result.error) {
          window.AetherisCart?.toast('Failed to add to cart: ' + result.error);
          return;
        }

        // Also add to local cart for UI purposes
        window.AetherisCart?.addToCart({ id, name, price, size, type, image });
        window.AetherisCart?.toast('Added to cart');
      });
    });
  }

  bindBespoke() {
    const noteButtons = document.querySelectorAll('.note-btn[data-note]');
    if (!noteButtons.length) return;

    noteButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const note = btn.dataset.note;
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
          this.selectedNotes.delete(note);
        } else {
          if (this.selectedNotes.size >= 3) {
            window.AetherisCart?.toast('Select any 3 notes');
            return;
          }
          btn.classList.add('active');
          this.selectedNotes.add(note);
        }
      });
    });

    const finalize = document.querySelector('[data-finalize-bespoke]');
    if (!finalize) return;
    finalize.addEventListener('click', () => {
      if (this.selectedNotes.size < 3) {
        window.AetherisCart?.toast('Please select 3 notes');
        return;
      }
      const notes = Array.from(this.selectedNotes);
      window.AetherisCart?.addToCart({
        id: 'bespoke_' + notes.join('_').toLowerCase().replace(/\s+/g, '_'),
        name: `Bespoke: ${notes.join(' · ')}`,
        price: 480,
        size: '100ML',
        type: 'Custom Blend',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe5EGZomve5JKFeSvojNtcdSCmowLPWsXg9E1MHksq5ygvofMi9zKMXIeJNZ8me1LV2mdfdVViwYROLUmk54gkrhoUYJIyXXajqXE2zlXAkrogq8w_ziZHJbgECgYcRSFbKzIaQyMVnb_Og2t4robTzqfN5LmGnSYTrI4th61aq5dzkUYvWe_B5aH-m_vTVGVNkV_O1a4Rx8_w6fz1FXEx7rIqCe4va_4bMj54JWHOoM-RYe5DLW2sjmkBOy0bhZaQXtoZyt4-cXk',
      });
      setTimeout(() => {
        window.location.href = 'cart.html';
      }, 700);
    });
  }

  bindCheckout() {
    const button = document.querySelector('[data-proceed-checkout]');
    if (!button) return;
    button.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }

  bindCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!window.AetherisCart || !window.AetherisCart.cart || window.AetherisCart.cart.length === 0) {
        window.AetherisCart?.toast('Your cart is empty');
        window.location.href = 'collections.html';
        return;
      }

      // Process checkout via API
      const orderData = {
        items: window.AetherisCart.cart,
        shipping: {
          name: form.querySelector('[name="name"]')?.value,
          email: form.querySelector('[name="email"]')?.value,
          address: form.querySelector('[name="address"]')?.value,
          city: form.querySelector('[name="city"]')?.value,
          zip: form.querySelector('[name="zip"]')?.value
        }
      };

      const result = await this.apiCheckout(orderData);
      if (result.error) {
        window.AetherisCart?.toast('Checkout failed: ' + result.error);
        return;
      }

      const totals = window.AetherisCart.totals();
      const itemCount = window.AetherisCart.cart.reduce((sum, item) => sum + item.quantity, 0);
      const dispatchDate = new Date();
      dispatchDate.setDate(dispatchDate.getDate() + 2);

      window.AetherisCart?.setLastOrder({
        id: result.order_id || `ATH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        total: totals.total,
        items: itemCount,
        dispatchDate: dispatchDate.toLocaleDateString(),
      });
      window.AetherisCart?.clearCart();
      window.AetherisCart?.toast('Order placed successfully');
      setTimeout(() => {
        window.location.href = 'order-success.html';
      }, 700);
    });
  }

  renderCheckoutSummary() {
    const list = document.getElementById('checkout-items-preview');
    if (!list || !window.AetherisCart) return;

    if (!window.AetherisCart.cart.length) {
      list.innerHTML = '<p class="muted">Your cart is empty. Add fragrances to continue.</p>';
      const subtotal = document.getElementById('checkout-subtotal');
      const tax = document.getElementById('checkout-tax');
      const total = document.getElementById('checkout-total');
      if (subtotal) subtotal.textContent = '$0.00';
      if (tax) tax.textContent = '$0.00';
      if (total) total.textContent = '$0.00';
      return;
    }

    list.innerHTML = window.AetherisCart.cart
      .map(
        (item) => `
          <div class="checkout-mini-item">
            <span>${item.name} × ${item.quantity}</span>
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        `,
      )
      .join('');

    const totals = window.AetherisCart.totals();
    const subtotal = document.getElementById('checkout-subtotal');
    const tax = document.getElementById('checkout-tax');
    const total = document.getElementById('checkout-total');
    if (subtotal) subtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (tax) tax.textContent = `$${totals.tax.toFixed(2)}`;
    if (total) total.textContent = `$${totals.total.toFixed(2)}`;
  }

  renderOrderSuccessData() {
    const idEl = document.querySelector('[data-order-id]');
    if (!idEl || !window.AetherisCart) return;
    const order = window.AetherisCart.getLastOrder?.();
    if (!order) return;
    const totalEl = document.querySelector('[data-order-total]');
    const itemsEl = document.querySelector('[data-order-items]');
    const dispatchEl = document.querySelector('[data-order-dispatch]');
    idEl.textContent = order.id || idEl.textContent;
    if (totalEl && Number.isFinite(order.total)) totalEl.textContent = `$${Number(order.total).toFixed(2)}`;
    if (itemsEl) itemsEl.textContent = String(order.items || 0);
    if (dispatchEl && order.dispatchDate) dispatchEl.textContent = order.dispatchDate;
  }

  initCollectionFilters() {
    const controls = document.querySelector('[data-collection-filters]');
    if (!controls) return;
    const cards = Array.from(document.querySelectorAll('[data-collection-grid] .card'));
    controls.addEventListener('click', (event) => {
      const chip = event.target.closest('[data-filter]');
      if (!chip) return;
      const filter = chip.dataset.filter || 'all';
      controls.querySelectorAll('.filter-chip').forEach((el) => el.classList.remove('active'));
      chip.classList.add('active');
      cards.forEach((card) => {
        const family = card.dataset.family || '';
        const show = filter === 'all' || family.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    });
  }

  initMobileNav() {
    const tools = document.querySelector('.header-tools');
    if (!tools || document.querySelector('[data-mobile-toggle]')) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'icon-btn menu-btn';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('data-mobile-toggle', 'true');
    toggle.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    tools.prepend(toggle);

    const links = [
      ['Home', 'index.html'],
      ['Collections', 'collections.html'],
      ['Signature', 'product-detail.html'],
      ['Bespoke', 'bespoke.html'],
      ['Alchemy', 'profiles.html'],
      ['Cart', 'cart.html'],
    ];

    const drawer = document.createElement('aside');
    drawer.className = 'mobile-drawer';
    drawer.setAttribute('aria-hidden', 'true');

    const navLinks = links
      .map(([label, href]) => {
        const isActive = this.pageName() === href ? 'active' : '';
        return `<a class="${isActive}" href="${href}">${label}</a>`;
      })
      .join('');

    drawer.innerHTML = `
      <div class="mobile-overlay" data-mobile-close></div>
      <div class="mobile-panel">
        <div class="mobile-head">
          <strong>Aetheris</strong>
          <button type="button" class="icon-btn" data-mobile-close aria-label="Close menu">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav class="mobile-nav-links">
          ${navLinks}
          <a href="login.html" data-auth-toggle>Login</a>
        </nav>
      </div>
    `;

    document.body.appendChild(drawer);

    const open = () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    };

    const close = () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    };

    toggle.addEventListener('click', open);
    drawer.addEventListener('click', (event) => {
      if (event.target.closest('[data-mobile-close]')) {
        close();
      }
      if (event.target.closest('.mobile-nav-links a')) {
        close();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.classList.contains('open')) close();
    });
  }

  initProductZoom() {
    const img = document.querySelector('.product-image img');
    if (!img) return;

    img.classList.add('zoomable');

    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.innerHTML = `
      <div class="zoom-backdrop" data-zoom-close></div>
      <figure class="zoom-frame">
        <button type="button" class="icon-btn" data-zoom-close aria-label="Close zoom">
          <span class="material-symbols-outlined">close</span>
        </button>
        <img src="" alt="" />
      </figure>
    `;

    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const open = () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'Zoomed product image';
      modal.classList.add('open');
      document.body.classList.add('no-scroll');
    };

    const close = () => {
      modal.classList.remove('open');
      document.body.classList.remove('no-scroll');
    };

    img.addEventListener('click', open);
    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-zoom-close]')) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('open')) close();
    });
  }

  bind() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initMobileNav();
      this.initProductZoom();
      this.initCollectionFilters();
      this.updateUserUI();
      this.renderCheckoutSummary();
      this.renderOrderSuccessData();
      this.bindAuthActions();
      this.bindLogin();
      this.bindAddToCart();
      this.bindBespoke();
      this.bindCheckout();
      this.bindCheckoutForm();
    });
  }
}

window.AetherisSite = new AetherisSite();
