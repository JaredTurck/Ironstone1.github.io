def triangle():
    [print(i) for i in (lambda x,t: x+[t]+x[::-1])([text[0:i] for i in range(len(text))], text)]

while True:
    text = input("Enter Text: ")
    
    menu = input("Menu:\n1. Triangle:\n9: Exit\n> ")
    while menu not in ["1", "9"]:
        menu = input("Invalid input: ")
        
    if menu == "1":
        triangle()
    elif menu == "9":
        exit()
