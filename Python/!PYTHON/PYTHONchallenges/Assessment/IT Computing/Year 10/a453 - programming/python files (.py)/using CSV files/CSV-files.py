import csv
team=int(input("""--==<( Cricket Scores )>==--
1) TrumptonCC
2) CamberwickGreen
choose a team: """))
if team == 1:
    file=open("TrumptonCC.csv")
elif team ==2:
    file=open("CamberwickGreen.csv")
else:
    print("incorrect input")
