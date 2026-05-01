import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Inject cart.js in <head> if not exists
    if '<script src="cart.js"></script>' not in content:
        content = content.replace('</head>', '    <script src="cart.js"></script>\n</head>')

    # 2. Modify cart.html structure
    if file == 'cart.html':
        # Replace the hardcoded bag items with an empty container
        # The items are inside <div class="flex-grow overflow-y-auto custom-scrollbar p-glass-padding space-y-12">
        # Let's target the inside of that div and replace it.
        pattern_items = r'(<div class="flex-grow overflow-y-auto custom-scrollbar p-glass-padding space-y-12">)(.*?)(<!-- Atelier Service Add-on -->)'
        
        def replace_bag_items(match):
            return match.group(1) + '\n<div id="cart-items-container" class="space-y-12"></div>\n' + match.group(3)
        
        content = re.sub(pattern_items, replace_bag_items, content, flags=re.DOTALL)

        # Add IDs for totals
        content = content.replace('>$630.00</span>', ' id="cart-subtotal">$0.00</span>')
        content = content.replace('>$50.40</span>', ' id="cart-tax">$0.00</span>')
        content = content.replace('>$680.40</span>', ' id="cart-total">$0.00</span>')
        
        # Add ID for checkout totals wrapper
        content = content.replace('<div class="space-y-3 mb-8">', '<div id="checkout-totals" class="space-y-3 mb-8">')

    # 3. Modify product-detail.html "Add to Collection"
    if file == 'product-detail.html':
        # Add to Collection button currently has onclick="window.location.href='cart.html'"
        # We want to change it to trigger addToCart, then redirect or stay.
        img_url = "https://lh3.googleusercontent.com/aida-public/AB6AXuAx-uvKRTRrMJyLbVlLT4ZO5aK9lfF4VVQrbQ9-iZPD8Dji7pBht_bx4RjlnUMdQSEQTeeyDRv7B3JeuP3a8yOUdy5FUSFbaNux_j_Qes-RlGXnebW6wyhL4F_1FcqS_DYUQeUEeawDEru2cCfjAM5DD9HDK1dXHU5j8y8HW8pZBGZNR9oUjiOk6wxX38CLK_6ev9slssQc3dsKUEcezaYGb5chQV39VxEFYbKQdZFWQQJXsgCVbOzx0lvnwucUYq_vNwWJZDt8Weo"
        js_call = f"window.AetherisCart.addToCart({{id:'celestial_oud', name:'Celestial Oud', price:420.00, size:'100ML', type:'Extrait de Parfum', image:'{img_url}'}})"
        
        # We need to find the Add to Collection button. It has text "Add to Collection"
        content = re.sub(
            r'onclick="window\.location\.href=\'cart\.html\'"([^>]*>[\s\S]*?Add to Collection)', 
            rf'onclick="{js_call}"\1', 
            content
        )

    # 4. Modify checkout.html onsubmit
    if file == 'checkout.html':
        # We previously set onsubmit="event.preventDefault(); window.location.href='index.html';"
        content = content.replace(
            "onsubmit=\"event.preventDefault(); window.location.href='index.html';\"",
            "onsubmit=\"event.preventDefault(); window.AetherisCart.clearCart(); window.AetherisCart.showToast('Order Placed Successfully'); setTimeout(() => window.location.href='index.html', 1500);\""
        )
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Cart logic injected successfully!")
