import pygame

pygame.init()
screen = pygame.display.set_mode((1000,800))

screen.blit(pygame.image.load("block.png"), (200,200))
speed = 2

arms = {"left":[pygame.image.load("arm4.png"), [25,200]],
        "right":[pygame.image.load("arm4.png"), [775,200]]}
blocks = {0:[pygame.image.load("block.png"), [100,100]]}

while True:
    screen.fill((0,0,200))
    for i in arms:
        screen.blit(arms[i][0], tuple(arms[i][1]))
        
    lines = [arms["left"][1], arms["right"][1]]
    lines = [[lines[i][0]+100,lines[i][1]] for i in range(2)]
    pygame.draw.line(screen, (225,0,0), lines[0], lines[1], 5)

    screen.blit(pygame.image.load("base.png"),(0,0))
    for i in blocks:
        blocks[i][1] = [lines[0][0]-100, lines[0][1]+176]
        screen.blit(blocks[i][0], blocks[i][1])
    
    pygame.display.update()
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

    Key = pygame.key.get_pressed()
    if Key[pygame.K_UP]:
        arms["left"][1][1] += speed
        arms["right"][1][1] -= speed
            
    if Key[pygame.K_DOWN]:
        arms["left"][1][1] -= speed
        arms["right"][1][1] += speed

    arm = {0:arms["left"], 1:arms["right"]}
    for i in arm:
        if arm[i][1][1] > 500:
            arm[i][1][1] -= speed
            arm[(i+1) % 2][1][1] += speed
