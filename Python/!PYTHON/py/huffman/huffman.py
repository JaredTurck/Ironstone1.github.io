import os

text = """A frog is any member of a diverse and largely carnivorous group of
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
frequency = lambda text: sorted(set([(text.count(i), i) for i in text]))
trim_tree = lambda f:[f[1] if type(f[1]) == str else (trim_tree(f[1][0]), trim_tree(f[1][1]))][0]
assign_codes = lambda node, pat :[codes.append([node, pat]) if type(node) == str else (assign_codes(node[0], pat+'0'), assign_codes(node[1], pat+"1"))]
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

def compress_file(filename="img1.png"):
    text = "".join([chr(i+200) for i in open(filename, "rb").read()])
    tree = trim_tree(build_tree(frequency(text)))
    assign_codes(tree, "")
    encoded = encode(text)
    path = os.path.dirname(os.path.abspath(__file__))
    print(f"Original size: {len(text)} bytes")
    print(f"Compressed size: {len(encoded)/8} bytes")
    
    driver = open(os.path.join(path, "a.txt"), "wb+")
    driver.write(bytearray([int(encoded[i:i+8], 2) for i in range(0, len(encoded), 8)]))
    driver.close()

def compress_text(text):
    tree = trim_tree(build_tree(frequency(text)))
    assign_codes(tree, "")

    encoded = encode(text)
    decoded = decode(tree, encoded)
    print(encoded)
