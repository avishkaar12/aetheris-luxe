import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update text-based anchor links
    content = re.sub(r'href="#"([^>]*>Collections)', r'href="collections.html"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'href="#"([^>]*>The Alchemy)', r'href="profiles.html"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'href="#"([^>]*>Bespoke)', r'href="bespoke.html"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'href="#"([^>]*>Atelier)', r'href="bespoke.html"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'href="#"([^>]*>Shopping Bag)', r'href="cart.html"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'href="#"([^>]*>Scent Profiles)', r'href="profiles.html"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'href="#"([^>]*>Heritage)', r'href="index.html"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'href="#"([^>]*>The Vault)', r'href="collections.html"\1', content, flags=re.IGNORECASE)
    
    # 2. Brand Name Header -> index.html
    # Look for the Aetheris Luxe brand text in the top nav
    content = re.sub(r'<div([^>]*>Aetheris Luxe</div>)', r'<div onclick="window.location.href=\'index.html\'" style="cursor:pointer"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'<div([^>]*>Royal Essence</div>)', r'<div onclick="window.location.href=\'index.html\'" style="cursor:pointer"\1', content, flags=re.IGNORECASE)

    # 3. Update Material Symbol Icon Buttons
    # shopping_bag -> cart.html
    content = re.sub(r'<button([^>]*>\s*<span[^>]*>shopping_bag</span>\s*)</button>', r'<button onclick="window.location.href=\'cart.html\'"\1</button>', content, flags=re.IGNORECASE)
    # person -> login.html
    content = re.sub(r'<button([^>]*>\s*<span[^>]*>person</span>\s*)</button>', r'<button onclick="window.location.href=\'login.html\'"\1</button>', content, flags=re.IGNORECASE)
    
    # 4. Text Buttons
    content = re.sub(r'<button([^>]*>Experience the Collection</button>)', r'<button onclick="window.location.href=\'collections.html\'"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'<button([^>]*>Discover the Collection</button>)', r'<button onclick="window.location.href=\'collections.html\'"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'<button([^>]*>Explore The Vault</button>)', r'<button onclick="window.location.href=\'collections.html\'"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'<button([^>]*>Secure Checkout</button>)', r'<button onclick="window.location.href=\'checkout.html\'"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'<button([^>]*>Proceed to Checkout</button>)', r'<button onclick="window.location.href=\'checkout.html\'"\1', content, flags=re.IGNORECASE)
    content = re.sub(r'<button([^>]*>Sign In</button>)', r'<button onclick="window.location.href=\'index.html\'"\1', content, flags=re.IGNORECASE)
    
    # 5. Make product cards clickable to product-detail.html
    if 'onclick="window.location.href=\'product-detail.html\'"' not in content:
        content = content.replace('<div class="group relative overflow-hidden', '<div onclick="window.location.href=\'product-detail.html\'" style="cursor:pointer" class="group relative overflow-hidden')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Links updated successfully")
