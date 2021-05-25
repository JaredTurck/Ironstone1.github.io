import pyaudio

def record():
    p = pyaudio.PyAudio()
    stream = p.open(
        format=pyaudio.paInt16,
        channels=1,
        rate=44100,
        input=True,
        output=True,
        frames_per_buffer=1024)

    frames = []

    while True:
        frames.append(stream.read(1024))
        
        

    
