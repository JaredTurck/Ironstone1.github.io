import re

def replace(txt, str1, str2):
    return re.compile(f"(.+)({str1})(.+)").sub(f"\\1{str2}\\3", txt)

def replace10(txt, s, s2):
    a = re.compile(f"(.)({s[0]})(.)({s[1]})(.)({s[2]})(.)({s[3]})(.)({s[4]})(.)({s[5]})(.)({s[6]})(.)({s[7]})(.)({s[8]})(.)({s[9]})")
    b = a.sub(f"\\1{s2}\\3{s2}\\5{s2}\\7{s2}\\9{s2}\\11{s2}\\13{s2}\\15{s2}\\17{s2}\\19{s2}", txt)
    return b

txt = "The cat said 1 2 3 4 5 6 7 8 9 10"
new_txt = replace10(txt, [str(i) for i in range(1,11)], "!")
print(f"Before: {txt}\nAfter: {new_txt}")
