phone = {"Heath Mobile": "07557513198",
         "Jacquie Home": "01225744039",
         "Jacquie Mobile": "07813182248",
         "Jared": "07771681305",
         "Linda Mobile": "07894864128",
         "Lorraine Home": "01208892943",
         "Lorraine Mobile": "07492907326"}
while True:
    print("\n"+"="*30+" Main Menu "+"="*30)
    menu = input("Menu:\n1) Search for number by name\n2) delete number"+
                 "\n3) add number\n4) print Phone book\n5) EXIT program\n>>> ")
    while menu not in ["1","2","3","4","5"]:
        menu = input("Inccorect Input!\n>>> ")
    def Contact(call):
        while call not in phone:
            call = input("Name not found!\n>>> ")
        return call

    if menu == "1":
        Call = Contact(input("Who would you like to call?\nCall> "))
        print(Call+"'s Phone number is:",phone[Call])
        
    elif menu == "2":
        delete = Contact(input("Enter Name to delete:\n>>> "))
        del phone[delete]
        print("'"+delete+"' has been deleted")
        
    elif menu == "3":
        name = input("Enter Name of Contact: ")
        number = input("Enter %s's Number: " % (name))
        phone[name] = number
        print(name,number,"has been added")

    elif menu == "4":
        for item in phone:
            print("Name: "+item,"\t\t\tNumber: "+phone[item])

    elif menu == "5":
        exit()
    input("\nPress enter to continue to Main Menu..."),
