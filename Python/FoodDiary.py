import datetime

class Person(object):
    def __init__(self, YearBorn, weight, height, gender, name):
        __dic__ = '''Function to Initlise Person attributes'''
        self.age = datetime.datetime.now().year - YearBorn;
        self.gender = "male";
        self.name = name;

        self.weight = weight;
        self.height = height;
        self.emotion = None;
        self.foodLog = {};

        self.Max_Colories = (
            {(7, "male") : 1649, (7, "female") : 1530,
             (8, "male") : 1745, (8, "female") : 1625,
             (9, "male") : 1840, (9, "female") : 1721,
             (10,"male") : 2032, (10,"female") : 1936, #...
             (13,"male") : 2414, (13,"female") : 2223,
             (14,"male") : 2629, (14,"female") : 2342,
             (15,"male") : 2820, (15,"female") : 2390,
             (16,"male") : 2964, (16,"female") : 2414,
             (17,"male") : 3083, (17,"female") : 2462,
             (18,"male") : 3155, (18,"female") : 2462
            })[self.age, self.gender]
        self.hunger = self.Max_Colories;     

    def eat(self, FoodName, calcs, quantity):
        __dic__ = "Updates the maximum number of calores eaten today"
        self.hunger -= calcs * quantity;
        self.foodLog[len(self.foodLog)] = (FoodName, calcs, quantity);

    def reset(self):
        self.hunger = 0;
        

Jared = Person(2000, 45, 172, "male", "Jared")
