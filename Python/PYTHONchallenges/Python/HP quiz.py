import os, random
def start():
    print("\n"*20,"<","~="*20,">","\n"," "*4,"Wellcome to my Harry Potter Quiz!\n","<","~="*20,">","\nGeneral Knowledge:",sep="")
    print("""
                             :hNNd+                                             
                            .mNNMMMs                                            
                            -NNNMMMm                                            
                            `NNNMMMN`+dds:                                      
                        :hmmsmMNMMMMMMMMNNd/                                    
                       :mNNMMMMMMMMMMMMMMmNMs`                                  
                     `+dNNNMMMMNMMMMMMMMMNNMNd/`                                
                   -smmmMNMMMMMMMMMMMMMMMMMMNNMNs-                              
                .omNNNNNNNMMMMMMMMMMMMMMMMMMMMMNNNdso+////ohNmdd/               
             -ohNmmNNNNNMNMMMMMMMMMMMMMMMMMMMMMNNNNNNmmNmNmMMNNMN`              
         ./smmmNNNNNNNNMNMNMMNMMMMMMMMMMMMMMMMMMNNNMNNNmNMNMMMMNm.              
      .+hNNNNNNMMMMMMNNNMNNMNNNMMMMMMMMMMMMMMMMMMNMNMNNNMMMMMmhms               
    .smNNNNMMMNNMMMMNNMNNNMNNNNMMMNMMMMMMMMMMNNmNMMMNNMMMMMMm` -hh              
  :h/.+o-+hNMMMMMMMMMMMMNNNNNNNNNNMNMMMMMMMMN`   `.:mNMMMMMNds-  o+`            
 o:d- -.   `:sNMMMdMhdNosmNMMNNNNNNNNNMMMMMMMs      `hMMMMMNy+oyy+`...          
 --:+:       -dsMo`N`     `/mMMMMMMMNNNMMMMMMMs      /MmMN/:-:hhsNms- .`        
             ++ /d-s        .mMMNNMMMMMNMMMMMMMm+     do.+y.   +o -/yh          
              +/.mdy----.`    :yNNNNMMMMNNMMMMMMMmo..-hMd/oN.`  +h..yms`        
               +ohmdo/-:o:-`    `/yNNNMMMNMMMMMMMMMd:`-NhsNy+-  `m+   .s+`      
                -hd/--:-.:s+/```    :sNMMMMMMMMMMMMMN/ /h :h+hs  +M+    `//`    
                 +m+o-.  .oyyhy-      .hMMMMMMMMMMMMMMdsmm/:::hy+:hN:`     :    
                  /sos/++:-.`  `--.     sMMMMMMMMMMMMMMMMMNdyss+o::d-..`        
                                  `-     yMMMMMMMMMMMMMNmMMMMMhs+/:://...       
                                          sMMMMMMMMMmmMMMMMMNmNmdo:`  ` `-      
                                           yNMMydMMMMNmMMMMMMMdyhhNMdo.   `     
                                            s/yMNmMNdMMMmhddNMmsso+yhyssysoo//-.
                                             o/-yNdmymNMMMMMmdddhysooo++oshyyo/:
                                              -o::yN:.+dNhhdMMMMMdmMmNNy-``..-::
                                                -/.:ms-`sN:`:yhs+++oo/::h+      
                                                    o+:oodNo`  `:oo++:`  .      
                                                     ys   .hMdso+//::oyo+hy/-`  
                                                      :+-.` `+os+//-`           
                                                                                """)
question = [["How old is Harry Potter in philosopher's stone?\n1) 13\n2) 14\n3) 12\n4) 10\n>>> ","4"],
            ["What wood is Dumbledore's wand made out of?\n1) Willow\n2) Elder\n3) Maple\n4) Hazel\n>>> ","2"],
            ["Where does Ron's brother Bill work?\n1) Ministry of Magic \n2) Hogwarts \n3) London\n4) Romania\n>>> ","4"],
            ["Which Image is the real Deathly Hallows Sign? \n1? \n2? \n3? \n4?\n>>> ","1"],
            ["In what film did Lunar first appear? \n1) Harry Potter and the Half-blood Prince \n2) Harry Potter and the Order of the Phoenix \n3) Harry Potter and the Chamber of Secrets \n4) Harry Potter and the Deathly Hallows part1/2\n>>> ","2"],
            ["When Dumbledore dies who owns the elder wand? \n1) Ollivander owns the elder wand \n2) Snape, then Lord Voldemort. \n3) Draco, then Harry Potter, then no one \n4) the elder wand always belonged to Dumbledore even after he dies, as he is the true master.\n>>> ","3"],
            ["What is Lord Voldemort’s muggle name? \n1) Tom Riddle \n2) James Riddle \n3) James Lucius \n4) Tom potter\n>>> ","1"],
            ["In the Goblet of Fire, what colour is Harry potter's Expelliarmus spell? \n1) Pink \n2) Green \n3) Red \n4) Blue \n>>> ","3"],
            ["From the list below, what tournament is not in the Goblet of Fire? \n1) hold your breath for an hour in the Great Lake\n2) fight dragons for a golden egg \n3) find your way out of a maze \n4) kill the basilisk \n>>> ","4"],
            ["In the film Deathly Hallows part 1, after Harry and Ron have an argument. A wizard casts a stag Patronus. who cast the spell? \n1) Voldemort \n2) Professor McGonagall \n3) Snape \n4) Dumbledore \n>>> ","3"],
            ["Which Image is the Correct Logo for Harry Potter? \n1? \n2? \n3? \n4? \n>>> ","4"],
            ["In what Film does Dobby the House Elf die in? \n1) Harry Potter and the Deathly Hallows part 1 \n2) Harry Potter and the Deathly Hallows part 2 \n3) Harry Potter and the Half-Blood Prince \n4) Harry Potter and the Order of the Phoenix \n>>> ","1"]]
score = 0
answer = []
user = numLoop = None
start(), input("[ENTER]")
for i in range(0,len(question)):
    start()
    print("Question ",i+1,":",sep="")
    if i == 3:
        os.system("start HP-quiz-Images\deathly-hallows.png")
    elif i == 10:
        os.system("start HP-quiz-Images\Harry-Potter-Logo.png")
    user = input(question[i][0])
    while user not in ["1","2","3","4"]:
        print("That is not a valid option, \nPlease choose an option from the list above.")
        user = input(">>> ")
    while user in ["1","2","3","4"]:
        if question[i][1] == user:
            score = score + 1
            print("Welldone you got question",i+1,"correct!"), input("[ENTER]")
        else:
            input("You got the question incorrect!\n[ENTER]")
        answer.append(user)
        user = ("99")
print("\nYour total score is ",score,"/",i+1,sep="")
percentage = ((int(score)/int(i+1))*100)
print("You scored",percentage,"%","\n")
input("Press Enter to close the program..."), exit()
