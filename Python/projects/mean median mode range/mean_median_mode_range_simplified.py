# --- simplified mean, median, mode, range ---

def read_file(fname, index):
    data = [] # declare list
    with open(fname, "r") as file: # opens file
        # uses for loop to itterate through each line in file
        for line in file.readlines():
            # split current line at comma
            current_line = line.split(",")
            # append current line to data list
            data.append(float(current_line[index]))

    return data # returns the data list

def calc_median(dataset):
    # sort the data by size order
    dataset = sorted(dataset)
    # find the middle index
    middle = len(dataset)//2

    # --- median ---
    # checks if the dataset length is even number
    if len(dataset) % 2 == 0:
        # finds middle value of dataset with even length
        middle = (dataset[middle] + dataset[middle-1])/2
    
    # --- mode ---
    mode = [] #declare list
    # loop through item in dataset
    for item in dataset:
        # get the largest number of occurrences of a value in the dataset
        maxValue = max([dataset.count(i) for i in dataset])
        # if the current item occurs more or equal to the max value
        if dataset.count(item) >= maxValue:
            # if the item occurs more then once
            if dataset.count(item) != 1:
                # if the item is not already in the list
                if item not in mode:
                    # then append the value to the list
                    mode.append(item)
                    
    # --- mean ---
    # the sum of the dataset divide by the length
    mean = sum(dataset) / len(dataset)
    
    # --- range ---
    # the largest value mins the smallest value
    Range = dataset[-1] - dataset[0]
    
    # --- sum ---
    # all the values in dataset added together
    Sum = sum(dataset)
    
    # --- count ---
    # length of dataset
    count = len(dataset)

    # --- min ---
    # smallest value
    Min = min(dataset)
    
    # --- max ---
    # largest value in dataset
    Max = max(dataset)

    # return the data in dictonary
    return {
        "median" : middle,
        "mode" : mode,
        "mean" : mean,
        "range" : Range,
        "sum" : Sum,
        "count" : count,
        "min" : Min,
        "max" : Max
    }

def main():
    # name of the file
    filename = "CFU9_Data.txt"
    
    # read the file and get first data set
    dataset_x_file = read_file(filename, 0)
    
    # pass dataset through calc_median() function
    dataset_x = calc_median(dataset_x_file)

    # read file and get second dataset
    dataset_y_file = read_file(filename, 1)

    # pass dataset through calc_median()function
    dataset_y = calc_median(dataset_y_file)

    # write data to file
    output = open("CFU9_results.txt", "w")

    # the first line of text that will be written to file
    line_1 = "For the x data, a mean of {0} and a median of {1} were observed.\n"

    # write the file of text to the file, with values
    output.write(line_1.format(dataset_x["mean"], dataset_x["median"]))

    # the second line of text that will be written to file
    line_2 = "The sum of the y data was found to be {0} while the min and max where {1}, {2}"

    # write the second line of text, with values
    output.write(line_2.format(dataset_y["sum"], dataset_y["max"], dataset_y["min"]))

    # close the file
    output.close()

main()
