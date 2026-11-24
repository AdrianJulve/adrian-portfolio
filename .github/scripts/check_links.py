"""Fail if any page links to a local file or anchor that does not exist."""

import pathlib
import re
import sys

root = pathlib.Path(__file__).resolve().parents[2]
pages = sorted(root.glob("*.html"))
ids = {p.name: set(re.findall(r'id="([^"]+)"', p.read_text(encoding="utf-8"))) for p in pages}

problems = []
for page in pages:
    for ref in re.findall(r'(?:href|src)="([^"]+)"', page.read_text(encoding="utf-8")):
        if ref.startswith(("http://", "https://", "mailto:", "//")):
            continue
        path, _, anchor = ref.partition("#")
        path = path.split("?", 1)[0]
        target = path or page.name
        if not (root / target).exists():
            problems.append(f"{page.name}: {ref} (file not found)")
        elif anchor and target.endswith(".html") and anchor not in ids.get(target, set()):
            problems.append(f"{page.name}: {ref} (anchor not found)")

if problems:
    print("Broken links:")
    print("\n".join(f"  {p}" for p in problems))
    sys.exit(1)

print(f"Checked {len(pages)} pages, all local links work.")
