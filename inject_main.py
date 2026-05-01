import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Inject main.js in <head> right after cart.js
    if '<script src="main.js"></script>' not in content:
        if '<script src="cart.js"></script>' in content:
            content = content.replace('<script src="cart.js"></script>', '<script src="cart.js"></script>\n    <script src="main.js"></script>')
        else:
            # fallback if cart.js wasn't there
            content = content.replace('</head>', '    <script src="main.js"></script>\n</head>')

    # Fix existing inline onclicks that might override the auth flow
    if file == 'login.html':
        content = content.replace('onclick="window.location.href=\'index.html\'"', '')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("main.js injected successfully!")
