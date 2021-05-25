import datetime

def generate_202(data, data_type="text/html"):
    head = f"HTTP/1.1 OK "+\
    "date: " + datetime.datetime.now().strftime("%a, %d %B %Y %H:%M:%S GMT")+\
    f"Content-Length: {len(data)} Connection: close Content-Type: {data_type}"+\
    "cache-control: max-age=3600 CF-Cache-Status: DYNAMIC Content-Encoding: gzip"
    
