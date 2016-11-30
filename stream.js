var fs = require('fs');
var util = require('util');
var http = require('http');
var path = require('path');

if (process.argv.length != 6) {
  console.log('Require the following command line arguments:' +
    ' external_host external_port internal_port webm_file');
  console.log(' e.g. myserver.mydomain.com 50001 10000 record.webm');
  process.exit();
}

var external_host = process.argv[2];
var external_port = process.argv[3];
var internal_port = process.argv[4];
var fileName = process.argv[5];

http.createServer(function (req, res) {
  if (req.url != "/movie.webm") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://'+external_host+':'+external_port+'/movie.webm" controls></video>');
  } else {
    var file = path.resolve(__dirname, fileName);
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          res.writeHead(404, {'Content-Type': 'text/plain'});

          //return res.end(err);
        }
      return res.end(JSON.stringify(err));
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
  }
}).listen(internal_port);
