print("""**** A Fancy menu
choose an option:
1. Option 1
2. Option 2
3. Option 3""")
choice=int(input())
value = False
while value == False:
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
        choice=int(input("That is not a valid namber. please try again"))
print("Welldone! you chose",option)
