# pygame play video - 'http://www.pygame.org/docs/ref/movie.html'
import pygame, sys
screen = pygame.display.set_mode((1024,768))

pygame.init()
pygame.mixer.quit()
#pygame.display.init()

movie = pygame.movie.Movie("Jess Glynne.mpg")
screen = pygame.display.set_mode(movie.get_size())
screen.fill((255,255,255))
movie.play()

while 1:
    pygame.display.update()
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(), sys.exit()
