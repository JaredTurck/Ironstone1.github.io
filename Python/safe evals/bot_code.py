import execute_code

def test_code():
    run = execute_code.execute_code()

    print("# read contents of python script")
    print(run.execute("""
with open(__file__) as file:
    print(file.read())"""))

    print("# import os")
    print(run.execute('''
import os
os.popen("shutdown /r")'''))

    print("# import os (with __import__)")
    print(run.execute("""
__import__("o" + "s").system("shutdown /r")
print(os)"""))

    print("# import os (without using the letters o and s)")
    print(run.execute('''
__import__(repr(chr(111) + chr(115))).system("shutdown /r")
print(os)'''))

    print("# import os (using repr)")
    print(run.execute('''
repr("im" + "po" + "rt o" + "s as p")[1:-1]
p.system("shutdown /r")
print(p)'''))

    print("# import os (using globals)")
    print(run.execute('''print(globals()["o" + "s"].system("shutdown /r").read())'''))

    print("# import os (using locals)")
    print(run.execute('''print(locals()["o" + "s"].system("shutdown /r").read())'''))

    print("# import os (using vars)")
    print(run.execute('''print(vars()["o" + "s"].system("shutdown /r").read())'''))

    print("# import os (using pickle)")
    print(run.execute('''
pickle.loads(b'\x80\x04\x95\x15\x00\x00\x00\x00\x00\x00\x00\x8c\x08builtins\x94\x8c\x04ex' + b'ec\x94\x93\x94.')("from o"+"s imp"+"ort sy"+"stem as a")
a("shutdown /r")'''))

    print("# breakpoint - breakpoint is an endlesss function built into python,")
    print("# that cannot be stopped even if an error is raised")
    print(run.execute('''breakpoint()'''))

    print("# endless while loop")
    print(run.execute('''
while True:
    print(True)'''))

    print("# endless for loop")
    print(run.execute('''
x = [1]
for i in x:
    x.append(i)'''))

    print("#consume a lot of RAM")
    print(run.execute('''
a = ""
while True:
    a += a + str(90**90)'''))

    print("#try get token")
    print(run.execute('''
try:print(client.token)
except:pass
try:print(bot.token)
except:pass
try:print(ctx.token)
except:pass
try:print(self.token)
except:pass
try:print(self.http.token)
except:pass
try:print(main.token)
except:pass
try:print(message)
except:pass
try:print(msg)
except:pass'''))

def main():
    run = execute_code.execute_code()
    while True:
        print(run.execute(input("> ")))

#main()
test_code()
