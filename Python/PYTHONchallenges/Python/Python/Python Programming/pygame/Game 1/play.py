import pygame, sys, time

size = (1024,768)
screen = pygame.display.set_mode(size)
screen.fill((0,0,0))

image = pygame.image.load("menu.jpg")

MapDict = {}
MapSegment = (0,0)

playerX = 10
playerY = 10
sprite = pygame.image.load("ball.png")

def loadMap():
    while True:
        x,y = pygame.mouse.get_pos()
        print(x,y)
        time.sleep(0.005)

def Menu():
        mouse = pygame.mouse.get_pos()
        if mouse[0] in range(282, 742) and mouse[1] in range(270, 370):
            if pygame.mouse.get_pressed()[0] == 1:
                return "PLAY"

        elif mouse[0] in range(355, 664) and mouse[1] in range(400, 475):
            if pygame.mouse.get_pressed()[0] == 1:
                return "SETTINGS"
        
        time.sleep(0.02)

MainMenu = True
button = None

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(), sys.exit()

        elif button == "PLAY":
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    playerX -= 1
                elif event.key == pygame.K_RIGHT:
                    playerX += 1
                elif event.key == pygame.K_UP:
                    playerY -= 1
                elif event.key == pygame.K_DOWN:
                    playerY += 1

                screen.blit(background, (0,0))
                screen.blit(sprite, (playerX, playerY))
                pygame.display.update()
                time.sleep(0.02)

                while (playerX, playerY) not in MapDict[MapSegment]:
                    playerY += 1

                    screen.blit(background, (0,0))
                    screen.blit(sprite, (playerX, playerY))
                    pygame.display.update()

                    time.sleep(0.05)

                    print()

    if MainMenu == True:
        screen.blit(image, (0,0))
        pygame.display.update()
        
        menu = Menu()
        if menu in ["PLAY","SETTINGS"]:
            MainMenu = False
            button = menu

            if button == "PLAY":
                background = pygame.image.load("map\map"+"(0,0)"+".jpg")

                screen = pygame.display.set_mode((1000, 500))
                screen.blit(background,(0,0))
                pygame.display.update()

                loadMap()
