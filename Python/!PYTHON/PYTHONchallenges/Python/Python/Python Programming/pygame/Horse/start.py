import pygame, time, random
pygame.init()

config = open("config.txt").readlines()
config = dict([(line.replace("\n","")).split(":") for line in config])
if config["FULL_SCREEN"] == "True":
    Screen = pygame.FULLSCREEN
else:
    Screen = 0

screen = pygame.display.set_mode((1000,500),Screen)
screen.fill((0,22,225))

grass = pygame.image.load("floor.png")
clound = pygame.image.load("clound.png")
horse = {0:pygame.image.load("horse1.png"), 1:pygame.image.load("horse2.png")}
hay = pygame.image.load("hay.jpg")

grassX = 0
cloundX = 0
Horse, i  = 0, 0
HorseY = 50
JUMP_UP = False
JUMP_DOWN = False
count = 0
Hay = {}

text = pygame.font.SysFont("Calibri",30)
score = 0

while True:
    screen.fill((0, 224, 233))
    screen.blit(clound, (cloundX % -1000,0))
    screen.blit(horse[Horse % 2], (0,HorseY))
    screen.blit(text.render("Score: %s"%(str(score)), 1, (0,0,0)),(0,0))
    score += 1

    for I in Hay:
        screen.blit(hay, Hay[I])

    screen.blit(grass, (grassX % -1000,300))
    pygame.display.update()

    n = random.randint(0,int(config["Hay_Chance"]))
    if n == 0:
        count += 1
        Hay[count] = [900, 350]
    
    for I in Hay:
        Hay[I][0] -= int(config["Hay"])
        
    grassX -= int(config["grassX"])
    cloundX -= int(config["cloundX"])
    
    i += 1
    if i == 20:
        i = 0
        Horse += 1

    if JUMP_UP == True:
        HorseY -= 2
        if HorseY <= int(config["JUMP_HEIGHT"]):
            JUMP_UP = False
            JUMP_DOWN = True
            i = 0
    elif JUMP_DOWN == True:
        HorseY += 2
        if HorseY == 50:
            JUMP_DOWN = False
        
    else:

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit(), exit

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    for i in range(100):
                        JUMP_UP = True
                elif event.key == pygame.K_ESCAPE:
                    screen.blit(pygame.image.load("PAUSED.png"),(0,0))
                    pygame.display.update()
                    KEY = True
                    while KEY == True:
                        time.sleep(0.02)
                        for event in pygame.event.get():
                            if event.type == pygame.KEYDOWN:
                                if event.key == pygame.K_ESCAPE:
                                    KEY = False
    time.sleep(0.001)
