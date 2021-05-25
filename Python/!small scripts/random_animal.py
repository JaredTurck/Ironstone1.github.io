import random
from urllib.request import urlretrieve

file = open("animals.txt", "r").read().split("\n")
animal = file[random.randint(0, len(file)-1)]
