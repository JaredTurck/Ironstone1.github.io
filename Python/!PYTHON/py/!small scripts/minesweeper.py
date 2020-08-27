from random import randint as r

class minesweeper():
    def __init__(self):
        self.grid_wh = 5
        self.mine_count = 3
        self.guess_count = 0
        self.grid = [[" . " for i in range(self.grid_wh)] for i in range(self.grid_wh)]
        self.mines = [str(r(0,self.grid_wh-1)) + str(r(0,self.grid_wh-1)) for i in range(self.mine_count)]
        self.alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    def generate_mines(self):
        mines = list(set([str(r(0,self.grid_wh-1)) + str(r(0,self.grid_wh-1)) for i in range(self.mine_count)]))
        while len(mines) < self.mine_count:
            mines.append(str(r(0,self.grid_wh-1)) + str(r(0,self.grid_wh-1)))
            mines = list(set(mines))
        return mines

    def print_grid(self):
        print("\n    "+"   ".join([self.alpha[i] for i in range(self.grid_wh)]))
        for i in range(self.grid_wh):
            print(str(i+1) + " |" + "|".join(self.grid[i]) + "|")

    def get_input(self):
        user = input("Enter Guess: ")
        while True:
            if len(user) == 2:
                if user[1] in "".join([str(i+1) for i in range(5)]) and user[0].upper() in self.alpha[:self.grid_wh]:
                    return user.upper()
                
            user = input("Invalid Input!\nEnter Guess: ")

    def start_game(self):
        self.print_grid()
        while True:
            guess = self.get_input()
            if self.grid[int(guess[1])-1][self.alpha.index(guess[0])] == " X ":
                print("You already entered this guess!")
            else:
                self.grid[int(guess[1])-1][self.alpha.index(guess[0])] = " X "
                if str(int(guess[1])-1) + str(self.alpha.index(guess[0])) in self.mines:
                    for mine in self.mines:
                        self.grid[int(mine[0])][int(mine[1])] = " 💣"
                    self.print_grid()
                    print("You hit a mine, Game Over!")
                    return True
                
                self.guess_count += 1
                self.print_grid()

    def validate_input(self, text, text2, MinNum, MaxNum):
        user = input(text)
        while user not in [str(i) for i in range(MinNum, MaxNum+1)]:
            user = input(text2)
        return int(user)

    def setup_game(self):
        while True:
            MC = str(self.mine_count)
            gwh = str(self.grid_wh)
            
            print("\n--- Settings ---\nNo. mines: "+MC+"\nGrid Size: "+gwh+"x"+gwh+"\n")
            user = self.validate_input("Menu:\n1. Change No. mines\n2. Change grid size\n3. Back\n> ", "Invalid Input!\n> ", 1, 3)
            if user == 1:
                errorText = "Please enter a number smaller then " + str(int(gwh)*int(gwh)) + "!\nEnter Number of mines: "
                self.mine_count = self.validate_input("Enter Number of mines: ",errorText, 0, self.grid_wh*self.grid_wh)
            
            elif user == 2:
                self.grid_wh = self.validate_input("Enter size of grid (e.g. 5 for 5x5): ", "Try enter a smaller number!\n> ", 2, 9)

            elif user == 3:
                self.grid = [[" . " for i in range(self.grid_wh)] for i in range(self.grid_wh)]
                self.mines = self.generate_mines()
                return True

    def show_scoreboard(self):
        pass

MineSweeper = minesweeper()

while True:
    user = input("\nMain Menu:\n1. Settings\n2. Scoreboard\n3. exit\n\nOr just press enter to start a new game... ")
    if user == "1":
        MineSweeper.setup_game()
    elif user == "2":
        MineSweeper.show_scoreboard()
    elif user == "3":
        break
    else:
        MineSweeper.start_game()


# mine sweeper rules
# 3 random mines in the grid
# user enter coordinate, e.g. E4
# if user hits a mine game over

# print leaderboard
# fix for larger grids (above 9)

# print you win screen, if grid has no squares left only mines
