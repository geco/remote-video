cd /home/enrico/homeapps/stream-m
java -jar stream-m.jar server.properties > /dev/null  2>&1 &
sleep 2
/home/enrico/homeapps/remote-video/mstreambackground.sh

