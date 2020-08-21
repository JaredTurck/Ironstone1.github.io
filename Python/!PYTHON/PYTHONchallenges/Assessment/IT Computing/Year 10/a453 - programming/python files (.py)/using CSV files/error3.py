print("""**** A Fancy menu
choose an option:
1. Option 1
2. Option 2
3. Option 3""")
value = False
while value == False:
    try:
        choice=int(input("Choose an option: "))
        if choice == 1:
            option= "Option1"
            value = True
        elif choice == 2:
            option= "Option2"
            value = True
        elif choice == 3:
            option= "Option3"
            value = True
        else:
            print("That is not a valid namber. please try again\n")
    except:
        print("That is not a valid option. please try again\n")
print("Welldone! you chose",option)
