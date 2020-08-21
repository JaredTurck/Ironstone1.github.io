import pygame, sys # import pygame and sys module
from pygame.locals import * # import all from pygame.locals

pygame.init() # initialize pygame

# set up the window
DISPLAYSURF = pygame.display.set_mode((500, 400), 0, 32) # create the screen
pygame.display.set_caption('Drawing') # create a caption

# set up the colors
BLACK = ( 0, 0, 0)      # define varible BLACK  - RGB (0,0,0)
WHITE = (255, 255, 255) # define varible WHITE  - RGB (255,255,255)
RED = (255, 0, 0)       # define varible RED    - RGB (255,0,0)
GREEN = ( 0, 255, 0)    # define varible GREEN  - RGB (0, 255, 0)
BLUE = ( 0, 0, 255)     # define varible BLUE   - RGB (0, 0, 255)

# draw on the surface object
DISPLAYSURF.fill(WHITE) # fills the screen with colour WHITE
# pygame.draw.polygon(surface, color, pointlist, width)
pygame.draw.polygon(DISPLAYSURF, GREEN, ((146, 0), (291, 106), (236, 277), (56, 277), (0, 106)))

# pygame.draw.line(surface, color, start_point, end_point, width)
pygame.draw.line(DISPLAYSURF, BLUE, (60, 60), (120, 60), 4)
pygame.draw.line(DISPLAYSURF, BLUE, (120, 60), (60, 120))
pygame.draw.line(DISPLAYSURF, BLUE, (60, 120), (120, 120), 4)

# pygame.draw.circle(surface, color, center_point, radius, width)
pygame.draw.circle(DISPLAYSURF, BLUE, (300, 50), 20, 0)

# pygame.draw.eclipse(surface, color, bounding_rectangle, width)
pygame.draw.ellipse(DISPLAYSURF, RED, (300, 250, 40, 80), 1)

# pygame.draw.rect(surface, color, rectangle_tuple, width)
pygame.draw.rect(DISPLAYSURF, RED, (200, 150, 100, 50))

pixObj = pygame.PixelArray(DISPLAYSURF)
pixObj[480][380] = BLACK # set pixel (480,380) BLACK
pixObj[482][382] = BLACK # set pixel (482, 382) BLACK
pixObj[484][384] = BLACK # set pixel (484, 384) BLACK
pixObj[486][386] = BLACK # set pixel (486, 386) BLACK
pixObj[488][388] = BLACK # set pixel (488, 388) BLACK
del pixObj # close the pixel array

# run the game loop
while True:
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    pygame.display.update() # used to update display on users monitor
