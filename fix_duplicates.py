import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix duplicate onclicks
    # Replace "onclick="..." onclick="..."" with a single "onclick="...""
    content = re.sub(r'(onclick="window\.location\.href=\'[^\']+\'")\s+\1', r'\1', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Duplicates fixed")
