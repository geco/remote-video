cd /home/enrico/homeapps/remote-video
ffmpeg -f alsa -ac 1 -channel_layout mono -ar 48000 -i "hw:CARD=Webcam,DEV=0" -f s16le -acodec pcm_s16le - | node audio.js -

