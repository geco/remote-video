var sys = require('sys');
var fs = require('fs');
var util = require('util');

if (process.argv.length != 4) {
  sys.puts('Require the following command line arguments:' +
    ' http_port webm_file');
  sys.puts(' e.g. 9001 /home/foo/file.webm');
  process.exit();
}

var port = process.argv[2];
var file = process.argv[3];
