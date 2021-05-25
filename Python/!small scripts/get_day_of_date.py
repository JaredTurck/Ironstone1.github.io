import datetime

# setup
_DAYS_IN_MONTH = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

_DAYS_BEFORE_MONTH = [-1]
dbm = 0
for dim in _DAYS_IN_MONTH[1:]:
    _DAYS_BEFORE_MONTH.append(dbm)
    dbm += dim
del dbm, dim

# functions
def weekday(year, month, day):
    return (_ymd2ord(year, month, day) + 6) % 7

def _ymd2ord(year, month, day):
    return (_days_before_year(year) +
            _days_before_month(year, month) + day)

def _days_before_year(year):
    y = year - 1
    return y*365 + y//4 - y//100 + y//400

def _days_before_month(year, month):
    return _DAYS_BEFORE_MONTH[month] + (month > 2 and _is_leap(year))

def _is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

def test_weekday():
    wrong = []
    correct = []
    # years
    for y in range(1, 9999):
        # months
        for m in range(1,12):
            # days
            for d in range(1, _DAYS_IN_MONTH[m]):
                offical = datetime.datetime(y, m, d, 1, 1, 1, 1).weekday()
                test = get_weekday(y, m ,d)
                if offical == test:
                    correct.append([offical, test])
                else:
                    wrong.append([offical, test, (y, m, d)])
    return wrong, correct

def get_weekday(y, m, d):
    return (( ((y-1)*365 + (y-1)//4 - (y-1)//100 + (y-1)//400) + (_DAYS_BEFORE_MONTH[m] + (m > 2 and (y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)) )) + d) + 6) % 7

def get_weekday2(y, m, d):
    dbf = (lambda dim : [-1]+[sum(dim[1:i]) for i in range(len(dim), 0, -1)][::-1][:-1])([-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
    return (( ((y-1)*365 + (y-1)//4 - (y-1)//100 + (y-1)//400) + (dbf[m] + (m > 2 and (y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)) )) + d) + 6) % 7

def get_weekday_oneliner(y, m, d):
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][(( ((y-1)*365 + (y-1)//4 - (y-1)//100 + (y-1)//400) + ((lambda dim : [-1]+[sum(dim[1:i]) for i in range(len(dim), 0, -1)][::-1][:-1])([-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])[m] + (m > 2 and (y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)) )) + d) + 6) % 7]

def num2name(y, m, d):
    print(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][get_weekday2(y, m, d)])

#(lambda y, m, d : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][(( ((y-1)*365 + (y-1)//4 - (y-1)//100 + (y-1)//400) + ((lambda dim : [-1]+[sum(dim[1:i]) for i in range(len(dim), 0, -1)][::-1][:-1])([-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])[m] + (m > 2 and (y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)) )) + d) + 6) % 7])(2021, 4, 16)
