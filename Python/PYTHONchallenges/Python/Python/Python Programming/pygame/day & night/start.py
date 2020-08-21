import pygame, random, time
screen = pygame.display.set_mode((1000, 500))


def fall(number, Time, bounce=False):
    rain = pygame.image.load("rain.png")
    rainDict = {}
    RainCount = 0

    while True:
        for i in rainDict:
            if bounce == True:
                screen.fill((0,0,0))
            screen.blit(rain, rainDict[i])
            rainDict[i][1] += 1
            pygame.display.update()

            time.sleep(Time/1000)

        if random.randint(0,number) == 0:
            rainDict[RainCount] = [random.randint(0, 1000),0]
            RainCount += 1

        try:
            for i in rainDict:
                if rainDict[i][1] >= 500:
                    rainDict.pop(i)
        except:
            pass

fall(24, 2)
