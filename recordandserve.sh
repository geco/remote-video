rm record.webm
ffmpeg \
  -r 5 \
  -thread_queue_size 512 \
  -f v4l2 -framerate 25 -video_size 640x480 -i "/dev/video0" \
  -thread_queue_size 512 \
    -f alsa -ac 1 -channel_layout mono -ar 48000 -i "hw:CARD=Webcam,DEV=0" \
  -c:v libvpx -crf 20  -ac 1 -c:a libvorbis \
  record.webm &
http-server -p 10000
