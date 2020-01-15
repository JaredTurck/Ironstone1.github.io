data = open("pt-data1.csv").readlines()
PereodicTable = {}

for element in data:
    e = element.replace("\n","").replace(" ","").split(",")

    propertie = {"atomic number"              : e[0],
                 "symbol"                     : e[1],
                 "name"                       : e[2],
                 "atomic mass"                : e[3]+" g/mol",
                 "CPK color"                  : e[4],
                 "electronic configuration"   : e[5],
                 "electronegativity"          : e[6]+" Pauling",
                 "atomic radius"              : e[7]+" pm",
                 "ion radius"                 : e[8]+" pm",
                 "van der Waals radius"       : e[9]+" pm",
                 "IE-1"                       : e[10]+" kJ/mol",
                 "EA"                         : e[11]+" kJ/mol",
                 "standard state"             : e[12],
                 "bonding type"               : e[13],
                 "melting point"              : e[14]+" K",
                 "boiling point"              : e[15]+" K",
                 "density"                    : e[16]+" g/mL",
                 "metal or nonmetal"          : e[17],
                 "year discovered"            : e[18]}

    PereodicTable[ propertie["name"].lower() ] = propertie

def pereodic(name, *properties):

    if "all" in properties:
        properties = [i for i in PereodicTable[name]]

    for i in properties:
        print(i+": ",PereodicTable[name][i])
