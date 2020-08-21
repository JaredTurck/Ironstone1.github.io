import pygame, sys
from pygame.locals import *

pygame.init()
DISPLAYSURF = pygame.display.set_mode((400,300))
pygame.display.set_caption("Hello World!")

WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
BLUE = (0, 0, 128)

fontObj = pygame.font.Font('freesansbold.ttf', 32) # load font
textSurfaceObj = fontObj.render('Hello world!', True, GREEN, BLUE) # render
textRectObj = textSurfaceObj.get_rect() # create rect object
textRectObj.center = (200, 150) # center text

while True: # main game loop
    DISPLAYSURF.fill(WHITE)
    DISPLAYSURF.blit(textSurfaceObj, textRectObj)
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    pygame.display.update()

# How to display Text
#1. Create a pygame.font.Font object
#2. Create a Surface object, and call render() method.
#3. Create a Rect object, by calling the get_rect() method.
#4. Set the position of the Rect object.
#5. Blit the Rect object onto the screen.
#6. Call the pygame.display.update() method

# render(Font, Aliased, Font_color, Background_color)
# Aliased, True - Blocky, False - smooth
