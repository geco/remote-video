export AUDIO_DEVICE="hw:CARD=Webcam,DEV=0"
export VIDEO_DEVICE="/dev/video0"
export VIDEO_CAPABILITIES="video/x-raw, format=YUY2, width=640, height=480, framerate=5/1"
export AUDIO_CAPABILITIES="audio/x-raw, rate=48000, channels=1"


ffmpeg \
  -re \
  -r 5 \
  -i <(
      gst-launch-1.0 -q \
          v4l2src device="$VIDEO_DEVICE" do-timestamp=true pixel-aspect-ratio=1 \
              ! $VIDEO_CAPABILITIES \
              ! queue max-size-buffers=0 max-size-time=0 max-size-bytes=0 \
              ! mux. \
          alsasrc device="$AUDIO_DEVICE" do-timestamp=true \
              ! $AUDIO_CAPABILITIES \
              ! queue max-size-buffers=0 max-size-time=0 max-size-bytes=0 \
              ! mux. \
          matroskamux name=mux \
              ! fdsink fd=1
  ) \
  -c:v libx264 -an -ac 1 \
  -f flv rtmp://localhost/myapp/mystream
