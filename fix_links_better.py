import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Dictionary of replacements. 
# We use positive lookaheads/lookbehinds or precise regex to avoid duplicating.
# We will use simple string replacement when possible, or clean regex.

def add_onclick(button_html, url):
    if 'onclick="' in button_html: return button_html # don't duplicate
    # Insert onclick right after <button
    return button_html.replace('<button ', f'<button onclick="window.location.href=\'{url}\'" ', 1)

def add_href(a_html, url):
    if f'href="{url}"' in a_html: return a_html
    return re.sub(r'href="[^"]*"', f'href="{url}"', a_html, 1)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # --- 1. Top Nav Anchor Links ---
    # Find all <a ...>Text</a>
    content = re.sub(r'<a([^>]*>)\s*Collections\s*</a>', lambda m: f'<a{add_href(m.group(1), "collections.html")}Collections</a>', content, flags=re.IGNORECASE)
    content = re.sub(r'<a([^>]*>)\s*The Alchemy\s*</a>', lambda m: f'<a{add_href(m.group(1), "profiles.html")}The Alchemy</a>', content, flags=re.IGNORECASE)
    content = re.sub(r'<a([^>]*>)\s*Bespoke\s*</a>', lambda m: f'<a{add_href(m.group(1), "bespoke.html")}Bespoke</a>', content, flags=re.IGNORECASE)
    content = re.sub(r'<a([^>]*>)\s*Atelier\s*</a>', lambda m: f'<a{add_href(m.group(1), "bespoke.html")}Atelier</a>', content, flags=re.IGNORECASE)
    content = re.sub(r'<a([^>]*>)\s*Shopping Bag\s*</a>', lambda m: f'<a{add_href(m.group(1), "cart.html")}Shopping Bag</a>', content, flags=re.IGNORECASE)
    content = re.sub(r'<a([^>]*>)\s*Scent Profiles\s*</a>', lambda m: f'<a{add_href(m.group(1), "profiles.html")}Scent Profiles</a>', content, flags=re.IGNORECASE)
    content = re.sub(r'<a([^>]*>)\s*Heritage\s*</a>', lambda m: f'<a{add_href(m.group(1), "index.html")}Heritage</a>', content, flags=re.IGNORECASE)
    content = re.sub(r'<a([^>]*>)\s*The Vault\s*</a>', lambda m: f'<a{add_href(m.group(1), "collections.html")}The Vault</a>', content, flags=re.IGNORECASE)
    
    # --- 2. Logo Links ---
    if 'onclick="window.location.href=' not in content:
        content = re.sub(r'<div([^>]*>)\s*Aetheris Luxe\s*</div>', r'<div onclick="window.location.href=\'index.html\'" style="cursor:pointer" \1Aetheris Luxe</div>', content)

    # --- 3. Icon Buttons (Cart, Person) ---
    # shopping_bag
    content = re.sub(r'(<button[^>]*>\s*<span[^>]*>shopping_bag</span>\s*</button>)', lambda m: add_onclick(m.group(1), "cart.html"), content)
    # person
    content = re.sub(r'(<button[^>]*>\s*<span[^>]*>person</span>\s*</button>)', lambda m: add_onclick(m.group(1), "login.html"), content)
    
    # --- 4. Call to Action Text Buttons ---
    btn_links = {
        "Experience the Collection": "collections.html",
        "Discover the Collection": "collections.html",
        "Explore The Vault": "collections.html",
        "Secure Checkout": "checkout.html",
        "Proceed to Checkout": "checkout.html",
        "Sign In": "index.html",
        "Request Invitation": "login.html",
        "Lost Secret": "login.html",
        "Continue with Google": "index.html",
        "Continue with Apple": "index.html",
        "Authenticate": "index.html",
        "Place Secure Order": "index.html",
        "SUBSCRIBE": "index.html",
        "Add to Collection": "cart.html",
        "VIEW COLLECTION": "collections.html",
        "ALL FAMILIES": "collections.html"
    }
    
    for btn_text, url in btn_links.items():
        # Match <button ...>TEXT</button> (allowing internal spans, like Add to Collection <span...>)
        pattern = r'(<button[^>]*>\s*' + re.escape(btn_text) + r'(?:\s*<span[^>]*>.*?</span>)?\s*</button>)'
        content = re.sub(pattern, lambda m: add_onclick(m.group(1), url), content, flags=re.IGNORECASE)

    # Add specific onclicks for things that aren't exact text matches or are anchor tags formatted differently
    # "Add to Collection" might be split with an icon. Let's do a more robust search for Add to Collection
    if "Add to Collection" in content:
        # It's a button, let's just replace all buttons containing "Add to Collection"
        content = re.sub(r'(<button[^>]*>)([\s\S]*?Add to Collection[\s\S]*?</button>)', lambda m: add_onclick(m.group(1) + m.group(2), "cart.html") if 'onclick=' not in m.group(1) else m.group(0), content)

    # "Place Secure Order"
    if "Place Secure Order" in content:
        content = re.sub(r'(<button[^>]*>)([\s\S]*?Place Secure Order[\s\S]*?</button>)', lambda m: add_onclick(m.group(1) + m.group(2), "index.html") if 'onclick=' not in m.group(1) else m.group(0), content)

    # --- 5. Product Cards to Detail Page ---
    content = content.replace('<div class="group relative overflow-hidden', '<div onclick="window.location.href=\'product-detail.html\'" style="cursor:pointer" class="group relative overflow-hidden')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Links correctly updated with better script!")
