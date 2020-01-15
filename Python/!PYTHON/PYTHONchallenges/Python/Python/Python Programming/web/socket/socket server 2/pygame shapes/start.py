import pygame

screen = pygame.display.set_mode((1000,500))
screen.fill((0,0,225))

pygame.draw.rect(screen, (225,225,225), (0,0,200,100))
pygame.draw.polygon(screen, (0,225,225), [100,100,200,200])

pygame.display.update()
