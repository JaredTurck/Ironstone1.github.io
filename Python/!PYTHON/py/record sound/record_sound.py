import pyaudio
import sys
import wave

chunk = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
RECORD_SECONDS = 5

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
                channels=CHANNELS, 
                rate=RATE, 
                input=True,
                output=True,
                frames_per_buffer=chunk)

print("* recording")
frames = []
for i in range(0, 44100 // chunk * RECORD_SECONDS):
    data = stream.read(chunk)
    frames.append(data)
    # check for silence here by comparing the level with 0 (or some threshold) for 
    # the contents of data.
    # then write data or not to a file

print("* done")

# stop recording
stream.stop_stream()
stream.close()
p.terminate()

# write to file
file = wave.open("output.mp3", "wb")
file.setnchannels(CHANNELS)
file.setsampwidth(p.get_sample_size(FORMAT))
file.setframerate(RATE)
file.writeframes(b''.join(frames))
file.close()
