import pygame, sys, tkinter, os

input("select a folder containg the images to display, press enter to continue!")
Dir = tkinter.filedialog.askdirectory()
files = list()
for i in range(len(os.listdir(Dir))):
    if ".jpg" or ".png" in os.listdir(Dir)[i]:
        files.append(os.listdir(Dir)[i])

screen = pygame.display.set_mode((1024, 768))
screen.fill((0,0,0))

while 1:
    for i in range(len(files)):
        try:
            image = pygame.image.load(files[i])
            screen.blit(image,(0,0))
            pygame.display.update()
            time.sleep(1)
        except:
            print("Image ",files[i],"could not be opened!")

    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(), sys.exit()
