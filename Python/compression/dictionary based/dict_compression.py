data = """The cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated
species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild
members of the family. A cat can either be a house cat, a farm cat or a feral cat; the latter ranges
freely and avoids human contact.[5] Domestic cats are valued by humans for companionship and their ability
to hunt rodents. About 60 cat breeds are recognized by various cat registries.

The cat is similar in anatomy to the other felid species: it has a strong flexible body, quick reflexes,
sharp teeth and retractable claws adapted to killing small prey. Its night vision and sense of smell are
well developed. Cat communication includes vocalizations like meowing, purring, trilling, hissing,
growling and grunting as well as cat-specific body language. A predator that is most active at dawn
and dusk, the cat is a solitary hunter but a social species. It can hear sounds too faint or too high
in frequency for human ears, such as those made by mice and other small mammals. It secretes and
perceives pheromones.

Female domestic cats can have kittens from spring to late autumn, with litter sizes often ranging from
two to five kittens. Domestic cats are bred and shown at events as registered pedigreed cats, a hobby
known as cat fancy. Failure to control breeding of pet cats by spaying and neutering, as well as abandonment
of pets, resulted in large numbers of feral cats worldwide, contributing to the extinction of entire bird,
mammal, and reptile species, and evoking population control.

Cats were first domesticated in the Near East around 7500 BC. It was long thought that cat domestication
was initiated in ancient Egypt, as since around 3100 BC veneration was given to cats in ancient Egypt. As of
2021 there are an estimated 220 million owned and 480 million stray cats in the world.[14][15] As of 2017,
the domestic cat was the second-most popular pet in the United States, with 95 million cats owned. In the
United Kingdom, 26% of UK adults have a cat with an estimated population of 10.9 million pet cats as of 2020.
"""

# dictonary based encoding

def get_repeated_words(data):
    # generate the dictonary
    values = {}
    repeated_words = []
    for word in data.split(' '):
        if word in values:
            values[word] += 1
            if word not in repeated_words:
                repeated_words.append(word)
        else:
            values[word] = 1
    return repeated_words

def encode_text(data, write_2_file=True):
    # encode text
    words = get_repeated_words(data)
    encoded_txt = data
    lookup_table = {}

    for i,word in enumerate(words):
        encoded_txt = encoded_txt.replace(" "+word, " "+str(i))
        lookup_table[i] = word

    # write to file
    if write_2_file == True:
        # write data to file
        with open("dict_compression_output.txt", "wb") as file:
            file.write(encoded_txt.encode('UTF-8'))

        # write lookup table to file
        with open("dict_compression_lookup_table.txt", "wb") as file:
            file.write(encode_lookup_table(lookup_table))
            
    return lookup_table, encoded_txt

def encode_lookup_table(lookup_dict):
    output = []
    for key in lookup_dict:
        output.append(f"{key},{lookup_dict[key]}")
    return "|".join(output).encode("UTF-8")

def read_file(fname):
    return open(fname, "r", encoding="UTF-8").read()

file = read_file("cat.txt")
lookup_dict, encoded = encode_text(file)
diff = len(file) - len(encoded), round((1-(len(encoded) / len(file)))*100, 2)
print(f"Original length: {len(file)}\nEncoded length: {len(encoded)}\nBytes saved: {diff[0]} ({diff[1]}%)")
