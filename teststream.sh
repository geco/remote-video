ffmpeg -f video4linux2 -s 320x240 -r 16 -i /dev/video0 -f alsa -ac 1 -i "hw:CARD=Webcam,DEV=0" \
-g 52 -acodec libvorbis -ab 64k -vcodec libvpx -vb 448k \
record.webm
#-f webm http://localhost:8090/feed1.ffm
