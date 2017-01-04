var lame = require('lame');

  // create the Encoder instance
  var encoder = new lame.Encoder({
    // input
    channels: 1,        // 2 channels (left and right)
    bitDepth: 16,       // 16-bit samples
    sampleRate: 48000,  // 44,100 Hz sample rate

    // output
    bitRate: 64,
    outSampleRate: 48000,
    mode: lame.MONO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
  });

  process.stdin.pipe(encoder);

  // set up an express app
  var express = require('express')
  var app = express()

  app.get('/stream.mp3', function (req, res) {
    res.set({
      'Content-Type': 'audio/mpeg3',
      'Transfer-Encoding': 'chunked'
    });
    encoder.pipe(res);
  });

  var server = app.listen(3000, '127.0.0.1');
