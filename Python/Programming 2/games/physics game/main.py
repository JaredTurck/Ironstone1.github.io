import msvcrt, time

def draw_bar(playerX, playerY):
    for i in range(6):
        grid[playerY +i +1][playerX] = "|"

player1Y = 0
player2Y = 0
BALL = [10,25]

while True:
    grid = [["██"]+[" " for i in range(50)]+["██"] for ii in range(20)]
    grid = [["█"]*54] + grid + [["█"]*54]

    key = msvcrt.getch()
    if key in [b'w', b's']:
        player1Y = {b'w':player1Y-1, b's':player1Y+1}[key]
        
    elif key in [b'+', b'-']:
        player2Y = {b'+':player2Y+1, b'-':player2Y-1}[key]

    draw_bar(2 ,player1Y)       # player 1
    draw_bar(49,player2Y)     # player 2

    BALL -= 1
    grid[BALL[0]][BALL[1]] = "X"
    

    [print(*line, sep="") for line in grid]
    time.sleep(0.1)

# create grid
# WHILE TRUE:
#   get player 1 and 2 key press (bars position)
#   clear bars from grid
#   draw new bars onto grid for player 1 and 2
#
#   move ball('X') by 1 on grid
#   IF ball touching bar:
#       ball bounces off bar, change ball position by 1 (collision code)
#
#   IF ball touching outer-wall:
#       game over, player on oposit wall wins

#{b'w':player1Y+1, b's':player1Y-1, b'+':player2Y+1, b'-':player2Y-1}
