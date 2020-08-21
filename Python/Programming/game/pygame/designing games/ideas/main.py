import pygame

def check(X, Y, width, height, colour = (0,0,0)):
    p = {
        "TL" : (X-1, Y-1),
        "TR" : (X + width +1, Y-1),
        "BL" : (X-1, Y + height +1),
        "BR" : (X + width +1, Y + height +1)
        }

    points = [[range(p["TL"][0], p["TR"][0]), p["TL"][1]], # X
              [range(p["BL"][0], p["BR"][0]), p["BL"][1]], # X
              [range(p["TL"][1], p["BL"][1]), p["TL"][0]], # Y
              [range(p["TR"][1], p["BR"][1]), p["TR"][0]]] # Y
    
    for pos in enumerate(points):
        for ii in pos[1][0]:
            if pos[0] in [0,1]:
                X, Y = (pos[1][1], ii)
            if pos[0] in [2,3]:
                X, Y = (ii, pos[1][1])

            if Surface.get_at((X, Y))[:-1] == colour:
                return True

def arrow_keys(X, Y):
    key = pygame.key.get_pressed()
    if key[pygame.K_LEFT]:
        X -= 1
    if key[pygame.K_RIGHT]:
        X += 1
    if key[pygame.K_UP]:
        Y -= 1
    if key[pygame.K_DOWN]:
        Y += 1
    return X, Y

X,Y = 0,0
screen = pygame.display.set_mode((1200,800))
screen.fill((255,255,255))

#background = pygame.image.load("background.png").convert()
block = pygame.image.load("block.png").convert()

#screen.blit(background, (0,0))
screen.blit(block, (X,Y))

while True:
    screen.blit(block, (X,Y))
    pygame.display.update()
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

    X, Y = arrow_keys(X,Y)
