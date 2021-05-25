import encodings as encodings_dir
import os

start = 0
end = 1114111
invisible_chrs = []
inv_chr_test = u'\u200e' # 8206
encoding = "raw_unicode_escape"

# check for valid encoding
# valid encoding is one that can process all the chars
def check_encoding():
    encodings = os.listdir(os.path.dirname(encodings_dir.__file__))
    valid_encodings = []

    for encoding in encodings:
        try:
            for c in range(start, end+1):
                current_c = chr(c).encode(encoding.split('.')[0])
            valid_encodings.append(encoding.split('.')[0])
            print(f"Encoding {encoding} passed!")
                    
        except UnicodeEncodeError:
            print(f"Encoding {encoding} failed!")

        except UnicodeError:
            print(f"UnicodeError Encoding {encoding} doesn't exist!")

        except LookupError:
            print(f"LookupError Encoding {encoding} doesn't exist!")

    # valid encodings
    print("Valid Encodings: " + ", ".join([i for i in valid_encodings]))

#check_encoding()
# punycode, raw_unicode_escape, unicode_escape, utf_7

for i in range(start, end+1):
    current_c = chr(i).encode(encoding)
    if len(current_c) > 1:
        invisible_chrs.append(i)
        print(f"Invisible char found '{current_c}' ({i})!")
