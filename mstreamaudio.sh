cd /home/enrico/homeapps/remote-video
ffmpeg -r 1 -loop 1 -y -i 1x1.png -f alsa -ac 1 -thread_queue_size 512 -channel_layout mono -ar 48000 -i "hw:CARD=Webcam,DEV=0" \
-g 52 -c:v libvpx -crf 30 -ac 1 -c:a libvorbis -ab 32k -r 1 -shortest \
-f webm "http://localhost:20000/publish/first?password=secret00"  > log-audio.log  2>&1 &
