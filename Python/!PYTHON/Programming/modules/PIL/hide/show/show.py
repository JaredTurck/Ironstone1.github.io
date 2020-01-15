file = open("new.jpg", "rb").read()

img, file = file.split(b"$END$")

open("img.jpg", "wb").write(img)
open("file.zip", "wb").write(file)
