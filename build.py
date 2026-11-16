#!/usr/bin/env python3
"""Une css/ y js/ en un solo archivo dist/turbo-circuit.html (útil para publicar o probar sin servidor)."""
import re,os
b=os.path.dirname(os.path.abspath(__file__));w=os.path.join(b,"www")
h=open(os.path.join(w,"index.html"),encoding="utf8").read()
css=open(os.path.join(w,"css","style.css"),encoding="utf8").read()
h=h.replace('<link rel="stylesheet" href="css/style.css">',"<style>"+css+"</style>")
files=re.findall(r'<script src="(js/[^"]+)"></script>\n',h)
js="".join(open(os.path.join(w,f),encoding="utf8").read() for f in files)
h=re.sub(r'(<script src="js/[^"]+"></script>\n)+',lambda m:"<script>"+js+"</script>",h,count=1)
os.makedirs(os.path.join(b,"dist"),exist_ok=True)
open(os.path.join(b,"dist","turbo-circuit.html"),"w",encoding="utf8").write(h)
print("OK -> dist/turbo-circuit.html (%d KB)"%(len(h)//1024))
