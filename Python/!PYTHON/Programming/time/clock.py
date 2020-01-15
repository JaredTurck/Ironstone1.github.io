# past 0- 30
# to 31 - 60

past = {0 : "O'clock", 15 : "quater past", 30 : "half past", 45 : "quater to"}

units = {"00" : "", "01" : "one", "02" : "two", "03" : "three", "04" : "four",
         "05" : "five", "06" : "six", "07" : "seven", "08" : "eight",
         "09" : "nine", "10" : "ten", "11" : "eleven", "12" : "twelve",
         "13" : "thirteen", "14" : "fourteen", "15" : "fifteen",
         "16" : "sixteen", "17" : "seventeen", "18" : "eighteen",
         "19" : "nineteen", "20" : "twenty", "30" : "thirty","40" : "fourty",
         "50" : "fifty", "60" : "sixty"}

def int2num(n):
    n = "%02d" % n
    a = [units[n] if n in units else ""][0]
    b = [units[i] for i in [n[0]+"0", "0"+n[1]] if n.isdigit() == True]

    return [" ".join(b) if a == "" else a][0]

def clock(clock):
    hour, mins = clock.split(":")

    pastTo = ["to" if int(mins) > 30 else "past" if int(mins) < 30 else ""][0]
    mins = [past[int(mins)] if int(mins) in past else int2num(int(mins))][0]

    return mins, pastTo, units[hour]
