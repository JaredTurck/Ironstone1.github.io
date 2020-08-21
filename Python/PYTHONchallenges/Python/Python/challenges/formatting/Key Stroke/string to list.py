import ast
file = ast.literal_eval(open("hello.txt","r").read())
text = tuple("_" for i in range(3400))
