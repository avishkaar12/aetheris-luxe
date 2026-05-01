import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'styles.css' not in content:
        content = content.replace('</head>', '    <link rel="stylesheet" href="styles.css">\n</head>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

print("styles.css linked successfully")
