
class TicTacToe():
    def __init__(self):
        self.grid = [[" ", " ", " "] for i in range(3)]
        self.turn_count = 0
        self.quit = False

    def print_grid(self):
        print("\nPlayer "+"XO"[self.turn_count % 2] + "'s turn!\n"+"\n  A   B   C")
        print(("\n "+"-"*11+"\n").join([str(i+1)+" "+" | ".join(self.grid[i]) for i in range(3)]))

    def get_input(self):
        user = input("Enter guess: ")
        while True:
            if len(user) == 2:
                if user[1] in "123" and user[0].upper() in "ABC":
                    return user.upper()
            user = input("Invalid Input!\nEnter Guess: ")

    def check_winner(self):
        rows = ["".join(list(set(self.grid[i]))) in ["X", "O"] for i in range(3)]
        clms = ["".join(list(set([self.grid[i][n]  for i in range(3)]))) in ["X", "O"] for n in range(3)]
        dgnl = ["".join(list(set(self.grid[0][0] + self.grid[1][1] + self.grid[2][2]))) in ["X", "O"]]
        dgn2 = ["".join(list(set(self.grid[2][0] + self.grid[1][1] + self.grid[0][2]))) in ["X", "O"]]
        if True in rows + clms + dgnl + dgn2:
            print("Player", "XO"[self.turn_count % 2], "Wins!")
            self.quit = True
            
    def start_game(self):
        while self.quit == False:
            self.print_grid()
            user = self.get_input()
            while self.grid[int(user[1])-1]["ABC".index(user[0])] != " ":
                print("Invalid Input, this square is taken!")
                user = self.get_input()
            
            self.grid[int(user[1])-1]["ABC".index(user[0])] = "XO"[self.turn_count % 2]
            self.check_winner()
            self.turn_count += 1

tictac = TicTacToe()
tictac.start_game()

# players:
# 2 players same computer
# 1 player, 1 PC
# play online against someone else
