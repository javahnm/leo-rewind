#!/usr/bin/env python3
"""Inlines the cat drawing + animation CSS into the forecast page (index.html)."""
import os
H = os.path.dirname(os.path.abspath(__file__))
t = open(os.path.join(H, "page-template.html")).read()
t = t.replace("__CATCSS__", open(os.path.join(H, "catcss.css")).read())
t = t.replace("__CATLIB__", open(os.path.join(H, "catlib.js")).read())
open(os.path.join(H, "index.html"), "w").write(t)
print("built forecast/index.html", len(t))
