def menu():
    menuloop = True
    while menuloop == True:
        try:
            menu = int(input("""<======================>
EAN13 BAR CODE SCANNER:
<======================>
Choose a option from the list
1) Check if valid code
2) calculate checkdigit\n>>> """))
            if menu == 1 or menu == 2:
                menuloop = False
            else:
                print("error (1): incorect input, choose option from the list\n")
        except:
            print("error (2): incorect input, choose option from the list\n")
    return menu
choice=menu()
if choice == 1:
    print("VerifyCode")
elif choice == 2:
    print("Calculate Check Digit")
else:
    menu()
input("press enter to exit program...")
exit()
