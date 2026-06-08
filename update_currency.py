import re

files_to_update = [
    'backend/src/main/resources/static/app/dashboard.html',
    'backend/src/main/resources/static/app/app.js',
    'backend/src/main/resources/static/index.html'
]

for filepath in files_to_update:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace 'Rs ' with '₹'
        content = re.sub(r'\bRs\s+', '₹', content)
        # Replace 'Rs' with '₹' inside parens, e.g., (Rs) -> (₹)
        content = re.sub(r'\(Rs\)', '(₹)', content)
        # Replace 'Rs' with '₹' where it's attached, if any
        content = re.sub(r'\bRs(\d)', r'₹\1', content)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

