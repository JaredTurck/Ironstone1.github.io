from urllib import request
html = request.urlopen("https://www.geforce.co.uk/hardware/10series/geforce-gtx-1080-ti/").read()
if b'class="product__out-of-stock js-out-of-stock"' in html:
    input("GTX 1080 TI is out of Stock!")
else:
    input("GTX 1080 TI is in stock!")
