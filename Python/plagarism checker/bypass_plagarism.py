
# bypass plagarism checker using invisible chars
inv_chr = u'\u200e'

paragrphs = []
current_par = ' '
while current_par != '':
    current_par = input("Next Paragraph: ")
    paragrphs.append(current_par)

text = "\n".join(paragrphs)
output = "".join([c+inv_chr for c in text])
print("\n\nOutput:\n", output)
