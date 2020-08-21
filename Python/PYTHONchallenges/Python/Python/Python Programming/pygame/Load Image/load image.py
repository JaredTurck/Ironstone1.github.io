import pygame, sys     # Imports pygame and sys module
screen = pygame.display.set_mode((1024, 768)) # Creates blank screen
screen.fill((0,0,0))  # fills the screen with the RGB value (0,0,0)

image = pygame.image.load("penguin.jpg") # Loads the image

while 1:
    screen.blit(image,(0,0)) # bings image to screen
    pygame.display.update() # updates screen

    for event in pygame.event.get():  # Checks for EXIT event
        if event.type == pygame.QUIT:
            pygame.quit(), sys.exit() # If exit event trigered close progrm
