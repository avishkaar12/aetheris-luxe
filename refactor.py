import os
from bs4 import BeautifulSoup, Tag

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

navbar_html = None
footer_html = None

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'lxml')

    # 1. Clean up <head>
    for script in list(soup.find_all('script')):
        if isinstance(script, Tag):
            src = script.get('src')
            if src and 'tailwindcss.com' in src:
                script.decompose()
            elif script.get('id') == 'tailwind-config':
                script.decompose()
            
    for style in list(soup.find_all('style')):
        if isinstance(style, Tag):
            style.decompose()

    # Add Vite entry and AOS styles to head
    head = soup.find('head')
    if head:
        if not head.find('script', {'src': '/main.js'}):
            new_script = soup.new_tag('script', type='module', src='/main.js')
            head.append(new_script)
        if not head.find('link', {'href': 'https://unpkg.com/aos@2.3.1/dist/aos.css'}):
            new_link = soup.new_tag('link', href='https://unpkg.com/aos@2.3.1/dist/aos.css', rel='stylesheet')
            head.append(new_link)

    # Add SEO tags if missing
    title_tag = head.find('title')
    if not title_tag:
        title_tag = soup.new_tag('title')
        page_name = file.replace('.html', '').capitalize()
        title_tag.string = f"{page_name} - Aura Artistry"
        head.append(title_tag)
    
    meta_desc = head.find('meta', {'name': 'description'})
    if not meta_desc:
        meta_desc = soup.new_tag('meta', attrs={"name": "description", "content": "Aura Artistry - The Essence of Quiet Luxury. Discover our olfactory masterpieces."})
        head.append(meta_desc)

    # 2. Extract and Replace Navbar & Footer
    nav = soup.find('nav')
    if nav:
        if not navbar_html:
            navbar_html = str(nav)
        nav_placeholder = soup.new_tag('div', id='navbar-placeholder')
        nav.replace_with(nav_placeholder)

    footer = soup.find('footer')
    if footer:
        if not footer_html:
            footer_html = str(footer)
        footer_placeholder = soup.new_tag('div', id='footer-placeholder')
        footer.replace_with(footer_placeholder)
        
    # 3. Add AOS data attributes to main sections
    main = soup.find('main')
    if main:
        for i, child in enumerate(main.find_all(recursive=False)):
            if child.name in ['section', 'header', 'div']:
                if not child.has_attr('data-aos'):
                    child['data-aos'] = 'fade-up'
                    child['data-aos-duration'] = '1000'
                    child['data-aos-delay'] = str(100 * (i % 3))

    with open(file, 'w', encoding='utf-8') as f:
        # Use formatter="html" to avoid self-closing script tags which break the browser
        f.write(soup.prettify(formatter="html"))

# Write the components to JS files so they can be injected by main.js
os.makedirs('src/components', exist_ok=True)

if navbar_html:
    # We want to add the hamburger to the flex container which has justify-between.
    # We can just append it inside the nav
    soup_nav = BeautifulSoup(navbar_html, 'lxml')
    nav_tag = soup_nav.find('nav')
    
    hamburger = soup_nav.new_tag('button', id='mobile-menu-btn', attrs={'class': 'md:hidden text-white hover:text-yellow-500 transition-colors p-2 z-[110] relative'})
    hamburger.string = "☰" # we can use unicode since material-icons might be tricky to insert innerHTML cleanly
    
    # insert hamburger into the first inner div
    inner_div = nav_tag.find('div')
    if inner_div:
        inner_div.append(hamburger)
    
    # create mobile menu
    mobile_menu_html = """
    <div id="mobile-menu" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl transform translate-x-full transition-transform duration-500 flex flex-col items-center justify-center gap-8 font-serif text-2xl hidden">
        <a href="collections.html" class="text-white hover:text-yellow-500 transition-colors">Collections</a>
        <a href="profiles.html" class="text-white hover:text-yellow-500 transition-colors">Scent Profiles</a>
        <a href="bespoke.html" class="text-white hover:text-yellow-500 transition-colors">Bespoke</a>
        <a href="bespoke.html" class="text-white hover:text-yellow-500 transition-colors">Atelier</a>
    </div>
    """
    mobile_soup = BeautifulSoup(mobile_menu_html, 'lxml')
    nav_tag.append(mobile_soup.find('div'))
    navbar_html = str(nav_tag)

with open('src/components/navbar.js', 'w', encoding='utf-8') as f:
    f.write(f'export const Navbar = `{navbar_html}`;')

with open('src/components/footer.js', 'w', encoding='utf-8') as f:
    f.write(f'export const Footer = `{footer_html}`;')

print("Refactoring complete.")
