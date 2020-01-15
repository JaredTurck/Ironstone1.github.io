import zipfile
file = zipfile.ZipFile("text.zip","w")
file.setpassword(b"password"), file.close()
