ffmpeg -r 5 -thread_queue_size 512 -f v4l2 -video_size 640x480 \
-i /dev/video0 -thread_queue_size 512 -f alsa -ac 1 -channel_layout mono -ar 48000 -i "hw:CARD=Webcam,DEV=0" \
-c:v libvpx -crf 30  -ac 1 -c:a libvorbis -ab 32k \
record.webm
