import pygame

screen = pygame.display.set_mode((1200,800))
image = pygame.image.load("map2.jpg")
X = 0

while True:
    screen.fill((0,0,0))
    screen.blit(image, (X,0))
    pygame.display.update()
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

    if X in range(-7600,1):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            X -= 20
        elif keys[pygame.K_RIGHT]:
            X += 20

        print(X)

    if X > 0:
        X = 0
    elif X <= -7600:
        X = -7600
