import sys,os,pygame,random,math

pygame.init()
pygame.display.set_caption("Nsnake v1.0")
pygame.font.init()
random.seed()

#Global constant definitions
SPEED = 0.36                                    # float var, defines speed of snake
SNAKE_SIZE = 9                                  # int var, defines snakes head size
APPLE_SIZE = SNAKE_SIZE                         # int var, copy SNAKE_SIZE var to new memory address
SEPARATION = 9                                  # int var, defines the number fo pixelx between snakes body segments
SCREEN_HEIGHT = 600                             # int var, defines height of window in pixels
SCREEN_WIDTH = 800                              # int var, defines width of window in pixels
FPS = 25                                        # int var, defines number of frames to render per second (fps) for pygame graphics engine
KEY = {"UP":1,"DOWN":2,"LEFT":3,"RIGHT":4}      # dict var, maps string directional keys to integers

#Screen initialization
screen = pygame.display.set_mode((SCREEN_WIDTH,SCREEN_HEIGHT),pygame.HWSURFACE)     # creates the window, and defines it's width and height.

#Resources
score_font = pygame.font.Font(None,25)                                              # creates new object font and sets it's size to 25
score_numb_font = pygame.font.Font(None,25)                                         # creates new object font and sets it's size to 25
game_over_font = pygame.font.Font(None,25)                                          # creates new object font and sets it's size to 25
play_again_font = score_numb_font                                                   # assigns var 'play_again_font' to thje value of 'score_numb_font'
score_msg = score_font.render("Score:",1,pygame.Color("green"))                     # prepairs font for rendering, and sets it's size, color, and display text
score_msg_size = score_font.size("Score")                                           # returns size of var 'score_font' as int, and assigns to var 'score_msg_size'

background_color = pygame.Color(74,74,74)                                           # sets the background color of the display window, (75,75,75) in RGB in grey (#4b4b4b in hex)
black = pygame.Color(0,0,0)                                                         # creates new color object, (0,0,0) in RGB is black

#Clock
gameClock = pygame.time.Clock()                                                     # tracks the games frame rate


def checkCollision(posA,As,posB,Bs):
    #As size of a | Bs size of B
    if(posA.x   < posB.x+Bs and posA.x+As > posB.x and posA.y < posB.y + Bs and posA.y+As > posB.y):        # checks if the snakes head is touching any of the snakes body segments
        return True                                                                                         # returns boolean true, this line only executes if the if statment is true
    return False                                                                                            # returns boolean false

def checkLimits(entity):
    if(entity.x > SCREEN_WIDTH):                                                                            # checks if snake head x coordinate off the screen width
        entity.x = SNAKE_SIZE                                                                               # if true, set x coordinate of snake to var SNAKE_SIZE
    if(entity.x < 0):                                                                                       # checks if snake head x coordinate off the screen, e.g. less than 0
        entity.x = SCREEN_WIDTH - SNAKE_SIZE                                                                # if true, set x coordinate of snake to SCREEN_WIDTH - SNAKE_SIZE
    if(entity.y > SCREEN_HEIGHT):                                                                           # checks if snake head y coordinate off the screen height
        entity.y = SNAKE_SIZE                                                                               # if true, set y coordinate of snake to var SNAKE_SIZE
    if(entity.y < 0):                                                                                       # checks if snake head y coordinate off the screen, e.g. less than 0
        entity.y = SCREEN_HEIGHT - SNAKE_SIZE                                                               # if true, set x coordinate of snake to SCREEN_HEIGHT - SNAKE_SIZE
        
class Apple:
    def __init__(self,x,y,state):                                                                           # var to initilise
        self.x = x                                                                                          # assign class var x to local scope x
        self.y = y                                                                                          # assign class var y to local scope y
        self.state = state                                                                                  # assign class var state to local scope state
        self.color = pygame.color.Color("yellow")
    def draw(self,screen):                                                                                  # defines draw function, draws the apples onto the screen
        pygame.draw.rect(screen,self.color,(self.x,self.y,APPLE_SIZE,APPLE_SIZE),0)
        
class Segment:
    def __init__(self,x,y):                                                                                 # sets thex and y coordinates of the snakes body segments
        self.x = x
        self.y = y
        self.direction = KEY["UP"]
        self.color = "white"
        
class Snake:
    def __init__(self,x,y):                                                                                 # sets the x, y coordinates for the snakes head
        self.x = x
        self.y = y
        self.direction = KEY["UP"]
        self.stack = []
        
        self.stack.append(self)
        
        blackBox = Segment(self.x,self.y + SEPARATION)
        blackBox.direction = KEY["UP"]
        blackBox.color = "NULL"
        self.stack.append(blackBox)

        
        
    def move(self):                                                                                         # moves the snakes head in diffrent directions depending what directional key you press
        last_element = len(self.stack)-1
        while(last_element != 0):
            self.stack[last_element].direction = self.stack[last_element-1].direction
            self.stack[last_element].x = self.stack[last_element-1].x 
            self.stack[last_element].y = self.stack[last_element-1].y 
            last_element-=1
        if(len(self.stack)<2):
            last_segment = self
        else:
            last_segment = self.stack.pop(last_element)
        last_segment.direction = self.stack[0].direction
        if(self.stack[0].direction ==KEY["UP"]):
            last_segment.y = self.stack[0].y - (SPEED * FPS)
        elif(self.stack[0].direction == KEY["DOWN"]):
            last_segment.y = self.stack[0].y + (SPEED * FPS) 
        elif(self.stack[0].direction ==KEY["LEFT"]):
            last_segment.x = self.stack[0].x - (SPEED * FPS)
        elif(self.stack[0].direction == KEY["RIGHT"]):
            last_segment.x = self.stack[0].x + (SPEED * FPS)
        self.stack.insert(0,last_segment)

    def getHead(self):                                                                                      # returns the number of elements in the snakes body 'stack'
        return(self.stack[0])
    
    def grow(self):                                                                                         # function that controls how new segments are added to the end of the snakes tail.
        last_element = len(self.stack)-1
        self.stack[last_element].direction = self.stack[last_element].direction
        if(self.stack[last_element].direction == KEY["UP"]):
            newSegment = Segment(self.stack[last_element].x,self.stack[last_element].y-SNAKE_SIZE)
            blackBox = Segment(newSegment.x,newSegment.y-SEPARATION)
            
        elif(self.stack[last_element].direction == KEY["DOWN"]):
            newSegment = Segment(self.stack[last_element].x,self.stack[last_element].y+SNAKE_SIZE)
            blackBox = Segment(newSegment.x,newSegment.y+SEPARATION)
            
        elif(self.stack[last_element].direction == KEY["LEFT"]):
            newSegment = Segment(self.stack[last_element].x-SNAKE_SIZE,self.stack[last_element].y)
            blackBox = Segment(newSegment.x-SEPARATION,newSegment.y)
            
        elif(self.stack[last_element].direction == KEY["RIGHT"]):
            newSegment = Segment(self.stack[last_element].x+SNAKE_SIZE,self.stack[last_element].y)
            blackBox = Segment(newSegment.x+SEPARATION,newSegment.y)
            
        blackBox.color = "NULL"
        self.stack.append(newSegment)
        self.stack.append(blackBox)
        
    def iterateSegments(self,delta):                                                                        # blank function
        pass
    
    def setDirection(self,direction):                                                                       # sets the direcxtion for each directional key pressed
        if(self.direction == KEY["RIGHT"] and direction == KEY["LEFT"] or self.direction == KEY["LEFT"] and direction == KEY["RIGHT"]):
            pass
        elif(self.direction == KEY["UP"] and direction == KEY["DOWN"] or self.direction == KEY["DOWN"] and direction == KEY["UP"]):
            pass
        else:
            self.direction = direction
            
    def get_rect(self):                                                                                     # returns the x,y coordinates of snake
        rect = (self.x,self.y)
        return rect
    
    def getX(self):                                                                                         # returns x coordinate
        return self.x
    
    def getY(self):                                                                                         # returns y coordinate
        return self.y
    
    def setX(self,x):                                                                                       # sets the x coordinate
        self.x = x
        
    def setY(self,y):                                                                                       # sets the y coordinate
        self.y = y
        
    def checkCrash(self):                                                                                   # crash code, checks if snake has crashed into it's own tail               
        counter = 1
        while(counter < len(self.stack)-1):
            if(checkCollision(self.stack[0],SNAKE_SIZE,self.stack[counter],SNAKE_SIZE)and self.stack[counter].color != "NULL"):
                return True
            counter+=1
        return False
    
    def draw(self,screen):                                                                                  # draws the snake segments onto the screen
        pygame.draw.rect(screen,pygame.color.Color("red"),(self.stack[0].x,self.stack[0].y,SNAKE_SIZE,SNAKE_SIZE),0)
        counter = 1
        while(counter < len(self.stack)):
            if(self.stack[counter].color == "NULL"):
                counter+=1
                continue
            pygame.draw.rect(screen,pygame.color.Color("blue"),(self.stack[counter].x,self.stack[counter].y,SNAKE_SIZE,SNAKE_SIZE),0)
            counter+=1
        
                
def getKey():                                                                                               # gets which directional key the user pressed
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    return KEY["UP"]
                elif event.key == pygame.K_DOWN:
                    return KEY["DOWN"]
                elif event.key == pygame.K_LEFT:
                    return KEY["LEFT"]
                elif event.key == pygame.K_RIGHT:
                    return KEY["RIGHT"]
                elif event.key == pygame.K_ESCAPE:
                    return "exit"
                elif event.key == pygame.K_y:
                    return "yes"
                elif event.key == pygame.K_n:
                    return "no"
            if event.type == pygame.QUIT:
                sys.exit()

def respawnApple(apples,index,sx,sy):                                                                   # respawns a new apple at a random location
    radius = math.sqrt((SCREEN_WIDTH/2*SCREEN_WIDTH/2  + SCREEN_HEIGHT/2*SCREEN_HEIGHT/2))/2
    angle = 999
    while(angle > radius):
        angle = random.uniform(0,800)*math.pi*2
        x = SCREEN_WIDTH/2 + radius * math.cos(angle)
        y = SCREEN_HEIGHT/2 + radius * math.sin(angle)
        if(x == sx and y == sy):
            continue
    newApple = Apple(x,y,1)
    apples[index] = newApple
        
def respawnApples(apples,quantity,sx,sy):                                                               # respawns multiple apples
    counter = 0
    del apples[:]
    radius = math.sqrt((SCREEN_WIDTH/2*SCREEN_WIDTH/2  + SCREEN_HEIGHT/2*SCREEN_HEIGHT/2))/2
    angle = 999
    while(counter < quantity):
        while(angle > radius):
            angle = random.uniform(0,800)*math.pi*2
            x = SCREEN_WIDTH/2 + radius * math.cos(angle)
            y = SCREEN_HEIGHT/2 + radius * math.sin(angle)
            if( (x-APPLE_SIZE == sx or x+APPLE_SIZE == sx) and (y-APPLE_SIZE == sy or y+APPLE_SIZE == sy) or radius - angle <= 10):
                continue
        apples.append(Apple(x,y,1))
        angle = 999
        counter+=1
        
def endGame():                                                                                          # function that ends the game once it is called
    message = game_over_font.render("Game Over",1,pygame.Color("white"))
    message_play_again = play_again_font.render("Play Again? Y/N",1,pygame.Color("green"))
    screen.blit(message,(320,240))
    screen.blit(message_play_again,(320+12,240+40))

    pygame.display.flip()
    pygame.display.update()
    
    myKey = getKey()
    while(myKey != "exit"):
        if(myKey == "yes"):
            main()
        elif(myKey == "no"):
            break
        myKey = getKey()
        gameClock.tick(FPS)
    sys.exit()

def drawScore(score):                                                                                   # function that draws the score onto the window
    score_numb = score_numb_font.render(str(score),1,pygame.Color("red"))
    screen.blit(score_msg, (SCREEN_WIDTH-score_msg_size[0]-60,10) )
    screen.blit(score_numb,(SCREEN_WIDTH - 45,12))
    
def drawGameTime(gameTime):                                                                             # function that draws the time onto the window
    game_time = score_font.render("Time:",1,pygame.Color("green"))
    game_time_numb = score_numb_font.render(str(gameTime/1000),1,pygame.Color("red"))
    screen.blit(game_time,(30,10))
    screen.blit(game_time_numb,(80,12))
    
def exitScreen():                                                                                       # blank function
    pass

def main():                                                                                             # main, first function that is called when the game starts
    score = 0
    
    #Snake initialization
    mySnake = Snake(SCREEN_WIDTH/2,SCREEN_HEIGHT/2)                                         # set the snakes initile location to the center of the window, (x/2, y/2)
    mySnake.setDirection(KEY["UP"])
    mySnake.move()
    start_segments=3
    while(start_segments>0):                                                                # while the snake has more then 0 segments, allow it to grow and move
        mySnake.grow()
        mySnake.move() 
        start_segments-=1

    #Apples
    max_apples = 1                                                                          # sets maximum number of apples on the screen at any one time to 1
    eaten_apple = False
    apples = [Apple(random.randint(60,SCREEN_WIDTH),random.randint(60,SCREEN_HEIGHT),1)]
    respawnApples(apples,max_apples,mySnake.x,mySnake.y)
    
    startTime = pygame.time.get_ticks()
    endgame = 0
    
    while(endgame!=1):                                                                      # while the user has not died, endlessly loop
        gameClock.tick(FPS)

        #Input
        keyPress = getKey()                                                                 # check if user pressed a key
        if keyPress == "exit":                                                              # if the user presses the close button (red X, top right corner), exit game
            endgame = 1
       
        #Collision check
        checkLimits(mySnake)                                                                # check if the snake is touching it's tail
        if(mySnake.checkCrash()== True):
            endGame()
            
        for myApple in apples:                                                              # check if any of the apples are colliding with the snake
            if(myApple.state == 1):
                if(checkCollision(mySnake.getHead(),SNAKE_SIZE,myApple,APPLE_SIZE)==True):
                    mySnake.grow()
                    myApple.state = 0
                    score+=5
                    eaten_apple=True
            

        #Position Update
        if(keyPress):                                                                       # if the user did press a key, then call setDirection function
            mySnake.setDirection(keyPress)    
        mySnake.move()
        
        
        
        #Respawning apples
        if(eaten_apple == True):                                                            # if an apple has been eaten, then respawn a new one
            eaten_apple = False
            respawnApple(apples,0,mySnake.getHead().x,mySnake.getHead().y)

        #Drawing
        screen.fill(background_color)                                                       # draw each apple onto the screen
        for myApple in apples:
            if(myApple.state == 1):
                myApple.draw(screen)

        mySnake.draw(screen)                                                                # draw the snake onto the screen
        drawScore(score)
        gameTime = pygame.time.get_ticks() - startTime
        drawGameTime(gameTime)

        pygame.display.flip()
        pygame.display.update()                                                             # refresh the screen after every frame
        
       
        
        
        
main()                                                                                      # call the main() function, starts the game
