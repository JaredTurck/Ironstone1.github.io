import pygame

myRect = pygame.Rect(10, 20, 200, 300) # rectangle X, Y, width, height
print(myRect.right) # print X cordinate of left side

myRect.left = 350 # change value
print(myRect.right) # pygame will auto update varibles for you

#myRect.left         The int value of the X-coordinate of the left side of the rectangle.
#myRect.right        The int value of the X-coordinate of the right side of the rectangle.
#myRect.top          The int value of the Y-coordinate of the top side of the rectangle.
#myRect.bottom       The int value of the Y-coordinate of the bottom side.
#myRect.centerx      The int value of the X-coordinate of the center of the rectangle.
#myRect.centery      The int value of the Y-coordinate of the center of the rectangle.
#myRect.width        The int value of the width of the rectangle.
#myRect.height       The int value of the height of the rectangle.
#myRect.size         A tuple of two ints: (width. height)
#myRect.topleft      A tuple of two ints: (left. top)
#myRect.topright     A tuple of two ints: (right. top)
#myRect.bottomleft   A tuple of two ints: (left. bottom)
#myRect.bottomright  A tuple of two ints: (right. bottom)
#myRect.midleft      A tuple of two ints: (left. centery)
#myRect.midright     A tuple of two ints: (right. centery)
#myRect.midtop       A tuple of two ints: (centerx. top)
#myRect.midbottom    A tuple of two ints: (centerx. bottom)
