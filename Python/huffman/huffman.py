import os

text = b"""A frog is any member of a diverse and largely carnivorous group of
short-bodied, tailless amphibians composing the order Anura (literally without
tail in Ancient Greek). The oldest fossil proto-frog appeared in the early
Triassic of Madagascar, but molecular clock dating suggests their origins may
extend further back to the Permian, 265 million years ago. Frogs are widely
distributed, ranging from the tropics to subarctic regions, but the greatest
concentration of species diversity is in tropical rainforest. There are about
7,300 recorded species, which account for around 88% of extant amphibian species.
[1] They are also one of the five most diverse vertebrate orders. Warty frog
species tend to be called toads, but the distinction between frogs and toads is
informal, not from taxonomy or evolutionary history."""

codes = []
frequency = lambda text: sorted(set([[(text.count(i), i), [print(f"generating frequency {round((x/len(text))*100 ,2)}% Complete") if x % 5000 == 0 else None]][0] for x,i in enumerate(text)]))
trim_tree = lambda f:[f[1] if type(f[1]) == int else (trim_tree(f[1][0]), trim_tree(f[1][1]))][0]
assign_codes = lambda node, pat :[codes.append([node, pat]) if type(node) == int else (assign_codes(node[0], pat+'0'), assign_codes(node[1], pat+"1"))]
encode = lambda f: "".join([dict(codes)[c] for c in f])

def build_tree(f):
    for i in range(len(f), 1, -1):
        f=(lambda l:sorted(f[2:]+[(l[0][0]+l[1][0],l)], key=lambda x:x[0]))(tuple(f[0:2]))
    return f[0]

def decode(tree, f, output=""):
    t = tree
    for bit in f:
        if bit == "0": t = t[0]
        else: t = t[1]
        if type(t) == str:
            output += t
            t = tree
    return output

def compress_file(text):
    if os.path.isfile(text):
        text = bytearray(open(text, "rb").read())
    tree = trim_tree(build_tree(frequency(text)))
    assign_codes(tree, "")
    encoded = encode(text)
    print(f"Original size: {len(text)} bytes\nCompressed size: {len(encoded)/8} bytes\nfile size reduced by {round(((len(text)-(len(encoded)/8))/len(text))*100,2)}%! ({len(text)-(len(encoded)/8)} bytes)")
    with open("a.txt", "wb+") as driver:
        driver.write(bytearray([int(encoded[i:i+8], 2) for i in range(0, len(encoded), 8)]))
