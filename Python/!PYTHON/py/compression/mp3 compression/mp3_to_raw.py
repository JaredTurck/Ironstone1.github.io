from pydub import AudioSegment
import matplotlib.pyplot as plot
import numpy

sound = AudioSegment.from_mp3("sound1.mp3")

# get samples
raw_data = sound.raw_data
raw_samples = numpy.frombuffer(raw_data, dtype=numpy.int16)

sample_rate = sound.frame_rate
sample_size = sound.sample_width
print(f"Sample Rate: {sample_rate}\nSample Size: {sample_size}")

# move samples to the channels
channel_num = sound.channels
channels = dict([[i, []] for i in range(channel_num)])
print(f"No. Channels: {channel_num}")

for i,sample in enumerate(raw_samples):
    channels[i % channel_num].append(sample)

def print_waveform(channel_num):
    y = channels[channel_num][:9_000_000]
    x = [i for i in range(len(y))][:9_000_000]
    
    plot.fill_between(x, y)
    plot.show()

# get the peaks and troughs
peak_trough = []
channel_no = 0
sensitivity = 5 # ingore peaks/troughs that are smaller then 5Hz
on_peak = True

last_sample = channels[channel_no][0]
for i in range(len(channels[channel_no])):
    current_sample = channels[channel_no][i]

    if on_peak == True:
        # check if we hit a peak
        if current_sample < (last_sample - sensitivity):
            peak_trough.append([i, last_sample])
            on_peak = False
            
    elif on_peak == False:
        # check if we hit trough
        if current_sample > (last_sample + sensitivity):
            peak_trough.append([i, last_sample])
            on_peak = True

    last_sample = channels[channel_no][i]
        
[print(f"Channel {i} length: {len(channels[i])}") for i in range(len(channels))]
print(f"Number of peaks/troughs: {len(peak_trough)}\nSensitivity: {sensitivity}")
print(f"Reduction: {round(((len(channels[0])-len(peak_trough))/len(channels[0]))*100,2)}%")

#compress:
#mp3 is decompressed back to original samples
#only record the peaks and troughs of the waveform, throw away all the other samples
#array of peaks/troughs then compressed into a string of characters that represents
#the original waveform

#decompress:
#string of characters is converted back to array of peaks/troffs
#maths is used to guess what the rest of the waveform looks like
#- draw vectors using the peak/troff information
#resample the vector
#compress the resampled vectors back into an mp3 file

"""
if _ is a sample and you have 3 channels then song [_ _ _] [_ _ _] [_ _ _] has
9 samples, 3 frames. Each _ is sample _ size bytes long. If sample_size is 2 then
song is 12 bytes long, played at a sample rate of 6 will have a duration of 1 sec.
"""

# Bezier curve
# use the Bezier curve to predict the missing samples when decompressing
