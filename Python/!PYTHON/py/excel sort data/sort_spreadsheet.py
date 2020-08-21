import openpyxl

#open("test2.csv", "wb").write(b",,Questions,Answer choice 1,Answer choice 2,Answer choice 3,Answer choice 4" + ",".join([i[1] for i in list(openpyxl.load_workbook("test.xlsx").active.values) if i[1] != None]).replace("Question", "\n,,Question").encode("utf-8"))

fields = b",,Questions,"+b"x 1,x 2,x 3,x 4".replace(b"x",b"Answer choice")
sheet = openpyxl.load_workbook("test.xlsx").active
x = [str(i[1]) for i in list(sheet.values) if i[1] != None]
data = "\n,,".join([",".join(x[5*i:(5*i)+5]) for i in range(len(x)//5)])

with open("test2.csv", "wb") as file:
    file.write(fields + b"\n,," + data.encode("utf-8"))
