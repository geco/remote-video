
exports.index = (req, res) => {
  const baseAddress = req.protocol+'://' + req.get('Host');
  res.render('audio', {
    title: 'Audio',
    elements: {
      audio : baseAddress + '/audiostream/stream.mp3'
    }
  });
};
