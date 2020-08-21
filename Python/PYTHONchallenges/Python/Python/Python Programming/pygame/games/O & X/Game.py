import pygame

screen = pygame.display.set_mode((1000,1000), pygame.RESIZABLE)
screen.fill((0,0,180))
PlayerCount = 0

GRID = {1: [(200,200),""], 2: [(400,200),""], 3: [(600,200),""],
        4: [(200,400),""], 5: [(400,400),""], 6: [(600,400),""],
        7: [(200,600),""], 8: [(400,600),""], 9: [(600,600),""]}

WINS = {0: ([1,2,3], [(200,300),(800,300)]), 1: ([4,5,6], [(200,500),(800,500)]),
        2: ([7,8,9], [(200,700),(800,700)]), 3: ([1,4,7], [(300,200),(300,800)]),
        4: ([2,5,8], [(500,200),(500,800)]), 5: ([3,6,9], [(700,200),(700,800)]),
        6: ([1,5,9], [(200,200), (800,800)]), 7: ([7,5,3], [(200,800),(800,200)])}


def PrintGrid():
    screen.blit(pygame.image.load("grid.png"), (200,200))
    for i in GRID:
        if GRID[i][1] == "X":
            screen.blit(pygame.image.load("X.png"), GRID[i][0])
        elif GRID[i][1] == "O":
            screen.blit(pygame.image.load("O.png"), GRID[i][0])
            
def check(playerCheck):
    for i in WINS:
        if "".join([GRID[ii][1] for ii in WINS[i][0]]) == playerCheck*3:
            return (True, i)
    else: return (False, None)
    
def CheckWinner(player):
    if check(player)[0] == True:
        line = WINS[check(player)[1]][1]
        pygame.draw.line(screen, (225,0,0), line[0], line[1], 20)

        if player == "X":
            screen.blit(pygame.image.load("X wins.png"), (100,100))
        elif player == "O":
            screen.blit(pygame.image.load("O wins.png"), (100,20))
        return True

def UserInput(player, PLAYERCOUNT):
    for i in GRID:
        mouse = pygame.mouse.get_pos()
        if (mouse[0] in range(GRID[i][0][0], GRID[i][0][0]+200)
        and mouse[1] in range(GRID[i][0][1], GRID[i][0][1]+200)):
            if GRID[i][1] == "":
                if pygame.mouse.get_pressed()[0] == 1:
                    GRID[i][1] = player
                    return PLAYERCOUNT +1
    return PLAYERCOUNT

Dict = {0:"O",1:"X"}
PLAYER = 0

while True:
    PrintGrid()
    if CheckWinner(Dict[PLAYER % 2]) == True:
        pygame.display.update()
        break
    PLAYER = UserInput(Dict[PLAYER % 2], PLAYER)
    pygame.display.update()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
