emoji_mapping = {":)": ":smile:", "poop": ":poop emoji:", "lol": ":laughing:", "lmao": ":happy laugh:", ":(": ":sad:"}

def mapping():
    text = input("> ").lower()
    for key in emoji_mapping.keys():
        text = text.replace(key, emoji_mapping[key])
    print(text)

mapping()
