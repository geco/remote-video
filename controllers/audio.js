
exports.index = (req, res) => {
  const baseAddress = req.protocol+'://'+req.hostname;
  res.render('audio', {
    title: 'Audio',
    elements: {
      audio : baseAddress+':50030/stream.mp3'
    }
  });
};
