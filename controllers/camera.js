
exports.index = (req, res) => {
  var camList = process.env.CAM_HOSTS.split(',');
  const baseAddress = req.protocol+'://' + req.get('Host');
  var cameras = [];
  camList.forEach((cam, index)=>{
     var camSplitted = cam.split('|')
     cameras.push({address: baseAddress+'/cam'+(index+1), name:camSplitted[0]})
  })
  res.render('camera', {
    title: 'Camera',
    cameras: cameras,
    audio: baseAddress + '/audiostream/stream.mp3'
  });
};
