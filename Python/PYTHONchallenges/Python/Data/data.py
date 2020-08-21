from pandas import *
data = read_excel("WHO POP TB some.xls")
print(data)
Population = data["Population (1000s)"]
TBDeaths = data["TB deaths"]
# calculating sum, min, max, mean, median:
print("TB DEATHS:")
print("SUM:",TBDeaths.sum())
print("MIN:",TBDeaths.min())
print("MAX:",TBDeaths.max())
print("AVERAGE:",TBDeaths.sum() / 12) # (.sum()/12) and .mean() are the same.
print("MEAN:",TBDeaths.mean())
print("MEDIAN:",TBDeaths.median())
print("\nPOPULATION (1000s):")
print("SUM:",Population.sum())
print("MIN:",Population.min())
print("MAX:",Population.max())
print("MEAN:",Population.mean())
print("MEDIAN:",Population.median())
# Sorting data:
print("\nSORTED BY POPULATION:\n",data.sort_values(by="Population (1000s)"))
# Calculating Death Rate:
print("\nCALCULATING DEATH RATE:")
TBDeathsColumn = data["TB deaths"]
PopulationColum = data["Population (1000s)"]
DeathRate = TBDeathsColumn * 100 / PopulationColum
print(DeathRate)
# Appending DeathRate Colum to Data Base
data["TB deaths (per 1000,000)"] = DeathRate
print(data)
