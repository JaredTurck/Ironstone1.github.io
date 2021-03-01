from text_to_speech import speak
import text_to_speech

print("press enter twice to speach text")
data = []
current = input("Enter text> ")
data.append(current)
while current != "":
    current = input("> ")
    data.append(current)

speak("".join(data))
