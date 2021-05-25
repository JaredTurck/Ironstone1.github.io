
start = 0
end = 1114111
invisible_chrs = []
inv_chr_test = u'\u200e' # 8206

for i in range(start, end):
    if chr(i).isprintable() == False:
        invisible_chrs.append(i)

pcnt = round(((end - len(invisible_chrs)) / end)*100, 2)
print(f'nonprintable chars: {len(invisible_chrs)} ({pcnt}% of Unicode)!')

# write to file
with open("non-printable.txt", "wb") as file:
    for i in invisible_chrs:
        try:
            file.write(bytes(chr(i), encoding="UTF-8") + b"\n")
        except UnicodeEncodeError:
            file.write(bytes(chr(i), encoding="utf_7") + b"\n")
