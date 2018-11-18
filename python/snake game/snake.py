import turtle, time, random                 # imports the turtle, time and random modules from the standard library.

#init
segments = []                               # defines the list variable segments with an empty list
delay = 0.1                                 # defines the float variable delay and assigns it the value 0.1
score = 0                                   # defines the integer variable score and assigns it the value 0
high_score = 0                              # defines the integer variable high_score and assigns it the value 0

# Set up the window
wn = turtle.Screen()                        # Create the Window
wn.title("A Snake Game")                    # Give the window a title
wn.bgcolor("green")                         # Set the windows background colour to green
wn.setup(width=600, height=600)             # set the windows dimensions
wn.tracer(0)                                # Turns off the windows updates //?

# Snake head
head = turtle.Turtle()                      # create an instance of the class turtle called 'head'
head.speed(0)                               # call the speed method
head.shape("square")                        # defines the shape of the snakes head
head.color("black")                         # defines the colour of the snakes head
head.penup()                                # stop the snake from drawing when moving
head.goto(0,0)                              # moves the snakes head to the coordinates 0,0 on the screen.
head.direction = "stop"                     # stops the turtles head from moving strait away

# Snake food
food = turtle.Turtle()                      # creates an instance of the class turtle called "food"
food.speed(0)                               # calls the speed method
food.shape("circle")                        # defines the shape of the food
food.color("red")                           # defines the colour of the food
food.penup()                                # stop the snake from drawing when moving
food.goto(0,100)                            # moves the food to the coordinates 0,0 on the screen.


# Pen
pen = turtle.Turtle()                       # creates an instance of the class turtle called "pen"
pen.speed(0)                                # calls the speed method
pen.shape("square")                         # defines the shape of the pen
pen.color("white")                          # defines the colour of the pen
pen.penup()                                 # stop the pen from drawing when moving
pen.hideturtle()                            # hides the pen, stops it from being displayed on the screen
pen.goto(0, 260)                            # moves the food to the coordinates 0,0 on the screen.
pen.write("Score: 0  High Score: 0", align="center", font=("Courier", 24, "normal")) # draws the Score and high score text on the screen

# Functions
def go_up():                                # defines a function called go_up
    if head.direction != "down":            # if statement is used to check if the variable direction is not equal to (!=) down
        head.direction = "up"               # direction variable is assigned the value "up"

def go_down():
    if head.direction != "up":              # if statement is used to check if the variable direction is not equal to (!=) up
        head.direction = "down"             # direction variable is assigned the value "down"

def go_left():
    if head.direction != "right":           # if statement is used to check if the variable direction is not equal to (!=) right
        head.direction = "left"             # direction variable is assigned the value "left"

def go_right():
    if head.direction != "left":            # if statement is used to check if the variable direction is not equal to (!=) left
        head.direction = "right"            # direction variable is assigned the value "right"

def move():                                 # a function called move is defined
    if head.direction == "up":              # if statement is used to check if the variable direction is not equal to (==) up
        y = head.ycor()                     # gets the current y coordinate of the snake and assigns the returned value to the variable "y"
        head.sety(y + 20)                   # changes the y coordinates of the snake, to it's current y coordinate + 20

    if head.direction == "down":            # if statement is used to check if the variable direction is not equal to (==) down
        y = head.ycor()                     # gets the current y coordinate of the snake and assigns the returned value to the variable "y"
        head.sety(y - 20)                   # changes the y coordinates of the snake, to it's current y coordinate - 20

    if head.direction == "left":            # if statement is used to check if the variable direction is not equal to (==) left
        x = head.xcor()                     # gets the current x coordinate of the snake and assigns the returned value to the variable "x"
        head.setx(x - 20)                   # changes the y coordinates of the snake, to it's current x coordinate - 20

    if head.direction == "right":           # if statement is used to check if the variable direction is not equal to (==) right
        x = head.xcor()                     # gets the current x coordinate of the snake and assigns the returned value to the variable "x"
        head.setx(x + 20)                   # changes the y coordinates of the snake, to it's current x coordinate + 20

# Keyboard bindings
wn.listen()                                 # wait for the user to press a key
wn.onkeypress(go_up, "w")                   # did the user press the up arrow key? if true, execute the go_up function
wn.onkeypress(go_down, "s")                 # did the user press the down arrow key? if true, execute the go_down function
wn.onkeypress(go_left, "a")                 # did the user press the left arrow key? if true, execute the go_left function
wn.onkeypress(go_right, "d")                # did the user press the right arrow key? if true, execute the go_right function

# Main game loop
while True:                                 # endless loop
    wn.update()                             # clears previous frame, so new frame does not overwrite it when displayed.

    # Check for a collision with the border
    if head.xcor()>290 or head.xcor()<-290 or head.ycor()>290 or head.ycor()<-290:  # is the snakes heads current x,y coordinate in the range -290 to 290?
        time.sleep(1)                       # pause the program for 1 second
        head.goto(0,0)                      # change the coordinates of the sakes head to 0,0
        head.direction = "stop"             # stops the turtles head from moving strait away

        # Hide the segments
        for segment in segments:
            # changes the coordinates of each of the snakes segments ( e.g. the grey blocks behind the snakes head.) to 1000,1000
            # this coordinate is off the screen, so they wont be displayed.
            segment.goto(1000, 1000)
            
        # Clear the segments list
        segments.clear() # removes all of the snakes segments

        # Reset the score
        score = 0 # sets the score to 0

        # Reset the delay
        delay = 0.1 # assigns the value 0.1 to the variable delay

        pen.clear() # delete any drawing on the screen
        pen.write("Score: {}  High Score: {}".format(score, high_score), align="center", font=("Courier", 24, "normal")) # draws the Score and high score text on the screen


    # Check for a collision with the food
    if head.distance(food) < 20:
        # Move the food to a random spot
        x = random.randint(-290, 290)       # generates a random number in the range -290 to 290 and assigns it to the variable x
        y = random.randint(-290, 290)       # generates a random number in the range -290 to 290 and assigns it to the variable y
        food.goto(x,y)                      # change the coordinates of the food to the values of the variables x and y

        # Add a segment
        new_segment = turtle.Turtle()       # create an instance of the class turtle called 'new_segment'
        new_segment.speed(0)                # call the speed method
        new_segment.shape("square")         # defines the shape of the segment, e.g. square.
        new_segment.color("grey")           # defines the color of the segment, e.g. grey.
        new_segment.penup()                 # stop the snake from drawing when moving
        segments.append(new_segment)        # adds the new snakes segment to the list 'segments'.

        # Shorten the delay
        delay -= 0.001                      # subtract assignment operator (-=), takes the current value of the variable delay and subtracts 0.001 from it then assigns it back to it's self.

        # Increase the score
        score += 10                         # addition assignment operator (+=), takes the current value of the variable score and adds 10 to it then assigns it back to it's self.

        if score > high_score:              # checks to see if the score is greater than the high score.
            high_score = score              # if it is, then it updates the high score with the new score.
        
        pen.clear()                         # removes all of the food
        pen.write("Score: {}  High Score: {}".format(score, high_score), align="center", font=("Courier", 24, "normal")) # draws the Score and high score text on the screen

    # Move the end segments first in reverse order
    for index in range(len(segments)-1, 0, -1):
        x = segments[index-1].xcor()
        y = segments[index-1].ycor()
        segments[index].goto(x, y)

    # Move segment 0 to where the head is
    if len(segments) > 0:
        x = head.xcor()
        y = head.ycor()
        segments[0].goto(x,y)

    move()    

    # Check for head collision with the body segments
    for segment in segments:
        if segment.distance(head) < 20:
            time.sleep(1)
            head.goto(0,0)
            head.direction = "stop"
        
            # Hide the segments
            for segment in segments:
                segment.goto(1000, 1000)
        
            # Clear the segments list
            segments.clear()

            # Reset the score
            score = 0

            # Reset the delay
            delay = 0.1
        
            # Update the score display
            pen.clear()
            pen.write("Score: {}  High Score: {}".format(score, high_score), align="center", font=("Courier", 24, "normal"))

    time.sleep(delay)

wn.mainloop()
