import pygame, sys

keys = {pygame.K_LEFT:(-5,0), pygame.K_RIGHT:(5,0),
        pygame.K_UP:(0,-5), pygame.K_DOWN:(0,5)}
X, Y = 0,0

Image = pygame.image.load("ball.png")
while True:
    screen = pygame.display.set_mode((1000, 500))
    screen.blit(Image,(0,0))
    pygame.display.update()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(), sys.exit()

        elif event.type == pygame.KEYDOWN:
            for i in keys:
                if event.type == i:
                    X += keys[i][0]
                    Y += keys[i][1]
            print(X, Y)
