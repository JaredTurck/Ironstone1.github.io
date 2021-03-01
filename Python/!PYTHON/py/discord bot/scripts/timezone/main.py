
file = open("zones.txt", "r").read().split("\n ")

items = []

for line in file[:3]:
    current_line = line.replace("âˆ’","-").replace("UTC-","-").replace("UTC+","+").split("\n")
    country = current_line[0].split("\t")[0];
    for timezone in current_line:
        if "-" in timezone:
            UTC = timezone.split("-")[1].split(" ")[0]
        elif "+" in timezone:
            UTC = timezone.split("+")[1].split(" ")[0]

        #print(country+", "+UTC, [timezone.split(" â€” ")[1]])

        if " â€” " in timezone:
            for city in timezone.split(" â€” ")[1].split(", "):
                print(country+", "+UTC, [city])
