
img1 = open("Koala.jpg", "rb").read()
file = open("Sample Pictures.zip", "rb").read()

open("show\\new.jpg", "wb").write(img1 + b"$END$" + file)
