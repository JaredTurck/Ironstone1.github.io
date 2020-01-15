text = (open("english.txt").read()).split("\n")

open("new.txt", "w").write("<br>".join(text))
