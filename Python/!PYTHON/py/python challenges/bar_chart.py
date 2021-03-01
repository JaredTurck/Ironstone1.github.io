"""
Given a dictionary containing quarterly sales values for a year,
return a string representing a bar chart of the sales by quarter.

Quarter names (Q1, Q2, Q3, Q4) should appear on the left.
Quarters should be sorted in descending order by value.
Quarters with the same value should be shown in their yearly order (Q1 -> Q4).
Bars should begin with a "|".
Repeat the character "#" to fill the bar, with each character having a value of 50.
A single space comes after the bar, then the sales for that quarter.
If the value is 0, there should be no space after "|".
Use the newline character ("\n") to separate each bar in the chart.

Example:
>>> bar_chart({"Q4": 250, "Q1": 300, "Q2": 150, "Q3": 0})
Q1|###### 300
Q4|##### 250
Q2|### 150
Q3|0

>> bar_chart({"Q4": 500, "Q3": 100, "Q2": 100, "Q1": 150})
Q4|########## 500
Q1|### 150
Q2|## 100
Q3|## 100
"""

def bar(data):
    # sort the data by number
    keys = sorted([[data[i], i] for i in data], reverse=True)

    # sort the data by Q
    sort = []
    for i in range(len(keys)):
        for ii in range(len(keys)):
            if keys[i][0] == keys[ii][0]:
                if keys[i][1] != keys[ii][1]:
                    if int(keys[ii][1][1]) < int(keys[i][1][1]):
                        if keys[ii] not in sort:
                            sort.append(keys[ii])
                            
                    elif int(keys[ii][1][1]) > int(keys[i][1][1]):
                        if keys[ii] not in sort:
                            sort.append(keys[ii])
                            
        if keys[i] not in sort:
            sort.append(keys[i])

    # generate bar chart
    output = []
    for key in sort:
        row = key[1]+"|"+"#"*int(key[0]/50)+" "+str(key[0])
        output.append(row)

    return "\n".join(output).replace("| 0", "|0")

def test():
    assert bar({"Q4": 250, "Q1": 300, "Q2": 150, "Q3": 0}) == \
           "Q1|###### 300\nQ4|##### 250\nQ2|### 150\nQ3|0"
    assert bar({"Q4": 500, "Q3": 100, "Q2": 100, "Q1": 150}) == \
           "Q4|########## 500\nQ1|### 150\nQ2|## 100\nQ3|## 100"
    print(bar({"Q4": 250, "Q1": 300, "Q2": 150, "Q3": 0}))
    print(bar({"Q4": 500, "Q3": 100, "Q2": 100, "Q1": 150}))
