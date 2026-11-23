#!/usr/bin/env python3
"""Builds the forecast page (index.html) and the 'how today's forecast moved' page (log/index.html).
The log page gets the exact same simulation code as the forecast page (the ==SIM== block)."""
import os, re
H = os.path.dirname(os.path.abspath(__file__))
t = open(os.path.join(H, "page-template.html")).read()
sim = re.search(r"// ==SIM==.*?\n(.*?)// ==/SIM==", t, re.S).group(1)
t = t.replace("__CATCSS__", open(os.path.join(H, "catcss.css")).read())
t = t.replace("__CATLIB__", open(os.path.join(H, "catlib.js")).read())
open(os.path.join(H, "index.html"), "w").write(t)
os.makedirs(os.path.join(H, "log"), exist_ok=True)
g = open(os.path.join(H, "log-template.html")).read().replace("__SIM__", sim)
open(os.path.join(H, "log", "index.html"), "w").write(g)
print("built forecast/index.html", len(t), "+ forecast/log/index.html", len(g))
