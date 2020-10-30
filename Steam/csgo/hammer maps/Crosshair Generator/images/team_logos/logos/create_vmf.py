import os

text = 'LightmappedGeneric"\n{\n\t"$basetexture" "{N}"\n}'
for file in os.listdir():
    if ".vtf" in file:
        with open(file.replace(".vtf", ".vmt"), "w") as fw:
            fw.write(text.replace("{N}", file.split(".")[0]))
