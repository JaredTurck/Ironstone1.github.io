import pygame

screen = pygame.display.set_mode((75,75))
screen.fill((0,0,0))

zombie = pygame.image.load("zombie_walk.png")

screen.blit(zombie, (0,0))
pygame.display.update()
