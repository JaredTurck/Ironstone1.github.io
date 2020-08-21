oneX = ("One Times Table:\n 1x1=1\n 1x2=2\n 1x3=3\n 1x4=4\n 1x5=5\n 1x6=6\n 1x7=7\n 1x8=8\n 1x9=9\n 1x10=10\n 1x11=11\n 1x12=12\n")
twoX = ("Two Times Table:\n 2x1=1\n 2x2=4\n 2x3=6\n 2x4=8\n 2x5=10\n 2x6=12\n 2x7=14\n 2x8=16\n 2x9=18\n 2x10=20\n 2x11=22\n 2x12=24\n")
threeX = ("Three Times Table:\n 3x1=1\n 3x2=6\n 3x3=9\n 3x4=12\n 3x5=15\n 3x6=18\n 3x7=21\n 3x8=24\n 3x9=27\n 3x10=30\n 3x11=33\n 3x12=36\n")
fourX = ("Four Times Table:\n 4x1=4\n 4x2=8\n 4x3=12\n 4x4=16\n 4x5=20\n 4x6=24\n 4x7=28\n 4x8=32\n 4x9=36\n 4x10=40\n 4x11=44\n 4x12=48\n")
fiveX = ("Five Times Table:\n 5x1=5\n 5x2=10\n 5x3=15\n 5x4=20\n 5x5=25\n 5x6=30\n 5x7=35\n 5x8=40\n 5x9=45\n 5x10=50\n 5x11=55\n 5x12=60\n")
SixX = ("Six Times Table:\n 6x1=6\n 6x2=12\n 6x3=18\n 6x4=24\n 6x5=30\n 6x6=36\n 6x7=42\n 6x8=48\n 6x9=54\n 6x10=60\n 6x11=66\n 6x12=72\n")
sevenX = ("Seven Times Table:\n 7x1=7\n 7x2=14\n 7x3=21\n 7x4=28\n 7x5=35\n 7x6=42\n 7x7=49\n 7x8=56\n 7x9=63\n 7x10=70\n 7x11=77\n 7x12=84\n")
eightX = ("Eight Times Table:\n 8x1=8\n 8x2=16\n 8x3=24\n 8x4=32\n 8x5=40\n 8x6=48\n 8x7=56\n 8x8=64\n 8x9=72\n 8x10=80\n 8x11=88\n 8x12=96\n")
nineX = ("Nine Times Table:\n 9x1=9\n 9x2=18\n 9x3=27\n 9x4=36\n 9x5=45\n 9x6=54\n 9x7=63\n 9x8=72\n 9x9=81\n 9x10=90\n 9x11=99\n 9x12=108\n")
TenX = ("ten Times Table:\n 10x1=10\n 10x2=20\n 10x3=30\n 10x4=40\n 10x5=50\n 10x6=60\n 10x7=70\n 10x8=80\n 10x9=90\n 10x10=100\n 10x11=110\n 10x12=120\n")
elevenX = ("Eleven Times Table:\n 11x1=11\n 11x2=22\n 11x3=33\n 11x4=44\n 11x5=55\n 11x6=66\n 11x7=77\n 11x8=88\n 11x9=99\n 11x10=110\n 11x11=121\n 11x12=132\n")
twelveX = ("twelve Times Table:\n 12x1=12\n 12x2=24\n 12x3=36\n 12x4=48\n 12x5=60\n 12x6=72\n 12x7=84\n 12x8=96\n 12x9=108\n 12x10=120\n 12x11=132\n 12x12=144\n")
alls = (oneX, twoX, threeX, fourX, fiveX, SixX, sevenX, eightX, nineX, TenX, elevenX, twelveX)
UserInput = (input("Which Times Table would you like to see? < 1,2,3,4,5,6,7,8,9,10,11,12,all >"))
if UserInput == '1':
    print(oneX)
elif UserInput == '2':
    print(twoX)
elif UserInput == '3':
    print(threeX)
elif UserInput == '4':
    print(fourX)
elif UserInput == '5':
    print(fiveX)
elif UserInput == '6':
    print(SixX)
elif UserInput == '7':
    print(sevenX)
elif UserInput == '8':
    print(eightX)
elif UserInput == '9':
    print(nineX)
elif UserInput == '10':
    print(TenX)
elif UserInput == '11':
    print(elevenX)
elif UserInput == '12':
    print(twelveX)
elif UserInput == "all":
    print(alls)


