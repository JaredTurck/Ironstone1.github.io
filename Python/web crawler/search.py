import time

class search():
    def __init__(self):
        self.dataset = open('self.domains.txt', 'r', encoding='ISO-8859-1').read().split('\n')
        self.counts = {};
        self.best_result = ["", 0]
        self.result_count = 0
        self.prepare_counts()

    def prepare_counts(self):
        count_file = open('counts.txt', 'r', encoding='ISO-8859-1').read().split('\n')
        for line in count_file:
            current_line = line.split(',', 1)
            if len(current_line) == 2:
                if current_line[1].isdigit() == True:
                    self.counts[current_line[0]] = int(current_line[1])

    def search_dataset(self, term):
        self.start_search = time.time()
        self.result_count = 0
        self.best_result = ["", 0]

        # itterate through each line in dataset
        for itter, line in enumerate(self.dataset):
            current_url = line.split(',', 1)[0]
            if line.find(term) > -1:
                if current_url in self.counts:
                    if self.counts[current_url] > self.best_result[1]:
                        self.best_result[0] = current_url
                        self.best_result[1] = self.counts[current_url]
                    self.result_count += 1

        # show result
        search_time =  time.time() - self.start_search
        print('best match:', self.best_result[0] + '\nsearch time:', str(search_time) +\
              "\nSearch Results: " + str(self.result_count))
        

s = search()

menu = input("Menu:\n1. Search\n2. Exit\n> ")
while menu != "2":
    if menu == "1":
        s.search_dataset(input("search: "))
    if menu not in ["1", "2"]:
        print("Invalid Input!")
    menu = input("\nMenu:\n1. Search\n2. Exit\n> ")
