import pygame, sys
screen = pygame.display.set_mode((800, 500)) # Creates blank screen
screen.fill((0,25,225)) # Dark Blue Background

while 1:
    pygame.display.update() # updates screen
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(), sys.exit()
