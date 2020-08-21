import pygame, time

screen = pygame.display.set_mode((895, 582))
screen.fill((0,0,0))

background = pygame.image.load("background.jpg")
player = pygame.image.load("player.jpg")

X, Y = 50, 0

while True:
    screen.blit(background, (0,0))
    screen.blit(player, (X,Y))
    pygame.display.update()
    if Y < 442:
        Y += 2

    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                Y -= 100
            elif event.key == pygame.K_LEFT:
                X -= 10
            elif event.key == pygame.K_RIGHT:
                X += 10

    time.sleep(0.00002)
