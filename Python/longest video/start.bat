ffmpeg -y -safe 0 -f concat -i mylist.txt -filter_complex [0:v]scale=128:96[Scaled] -map [Scaled] -r 1 output_vid_600hour.mp4

pause