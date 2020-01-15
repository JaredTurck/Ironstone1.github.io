import pygame, sys # import pygame and sys module
from pygame.locals import * # import all from pygame.locals module

pygame.init() # pygame initialization, some functions wont work with it
DISPLAYSURF = pygame.display.set_mode((400,300)) # creates pygame surface
pygame.display.set_caption("Hello World!") # creates a caption

while True: # main game loop
    for event in pygame.event.get(): # iterate over list of events
        if event.type == QUIT: # checks if QUIT event was in event list
            pygame.quit() # terminates pygame
            sys.exit() # terminate program, exits back to IDLE
    pygame.display.update() # updates pygame surface
# pygame.quit() was called so nothing below will execute


DISPLAYSURF.convert_alpha() # allows you to use RGBA
# so you can have tint, opacy, or transparent images.
aqua = pygame.Color(0, 255, 255, 128) # asing color to varible
