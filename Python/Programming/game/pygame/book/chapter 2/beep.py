# load sound file, supported formats incluse WAV, MP3, or OGG
sound = pygame.mixer.Sound("SoundFile.wav")
sound.play() # play sound
time.sleep(1) # let the sound play for 1 second
sound.stop() # end sound


# Loading and playing a sound effect:
soundObj = pygame.mixer.Sound('beepingsound.wav')
soundObj.play()
# Loading and playing background music:
pygame.mixer.music.load('backgroundmusic.mp3')
pygame.mixer.music.play(-1, 0.0) # -1 will repeart for ever
# ...some more of your code goes here...
pygame.mixer.music.stop() # stop the background music
