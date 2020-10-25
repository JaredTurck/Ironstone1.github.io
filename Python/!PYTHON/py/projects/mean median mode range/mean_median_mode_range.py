#Medumn (middle)
#arrange data from smallest to largest
#locate the central number, and this is the medumn
#- if there are numbers number in middle, menium is average of those 2 numbers

#Mean is average
#Mode is most common value
#Range is larget - smallest

def read_file(fname, index):
    return [float(i.split(",")[index]) for i in open(fname,"r").read().split("\n")]

def calc_median(dataset):
    return (lambda d : {
        "median" : (lambda m,d : [ (d[m] + d[m-1])/2 if len(d)%2==0 else d[m] ] )(len(d)//2,d)[0],
        "mode" : list(set([i for i in d if d.count(i) >= max(
            (lambda x : [x if x!=[] else [len(d)]])([d.count(i) for i in d if d.count(i)!=1])[0]) ])),
        "mean" : sum(d)/len(d), "range" : d[-1] - d[0], "sum":sum(d), "count":len(d), "min":d[0], "max":d[-1]
    })(sorted(dataset))

def main():
    x_data = calc_median(read_file("CFU9_Data.txt", 0))
    y_data = calc_median(read_file("CFU9_Data.txt", 1))
    with open("CFU9_results.txt", "w") as output:
        output.write(  
            ("For the x data, a mean of {0} and a median of {1} were observed.\n" +\
            "The sum of the y data was found to be {2} while the min and max where {3}, {4}").format(
                x_data["mean"], x_data["median"], y_data["sum"], y_data["min"], y_data["max"]))

main()
