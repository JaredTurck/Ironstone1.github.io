import pygame

screen = pygame.display.set_mode((500,500))
screen.fill((0,0,0))
img = pygame.image.load("1.png")


while True:
    screen.blit(img, (0,0))
    pygame.display.update()
