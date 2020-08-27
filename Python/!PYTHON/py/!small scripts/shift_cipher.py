def shift_cipher(text, itter, output=""):
    alpha = "abcdefghijklmnopqrstuvwxyz "
    for letter in text:
        output += alpha[(alpha.index(letter.lower()) + itter) % len(alpha)]
    return output

print(shift_cipher(input("Enter text: "), itter=-5))
