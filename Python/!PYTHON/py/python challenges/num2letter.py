"""
Given a string s consisting from digits and #, translate s to
English lowercase characters as follows:

Characters ("a" to "i") are represented by ("1" to "9").
Characters ("j" to "z") are represented by ("10#" to "26#").

Examples:
>>> decrypt("10#11#12")
"jkab"

>>> decrypt("1326#")
"acz"

>>> decrypt("25#")
"y"
"""

def num2letter(txt):
    chars = [str(i) if i < 10 else str(i)+"#" for i in range(1, 27)][::-1]
    for c in chars:
        v = chr(int(c.replace('#',''))+96)
        txt = txt.replace(c, v)

    return txt

def test():
    assert num2letter("10#11#12") == "jkab"
    assert num2letter("1326#") == "acz"
    assert num2letter("25#") == "y"
