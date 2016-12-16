/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  const baseAddress = req.protocol+'://'+req.hostname;
  res.render('camera', {
    title: 'Camera',
    elements: {
      img1: baseAddress+':50001',
      img2: baseAddress+':50002',
      audio :baseAddress+':50030/stream.mp3'
    }
  });
};
