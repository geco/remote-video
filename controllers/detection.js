const request = require('request');

exports.index = (req, res) => {
  var action = req.query.action;
  switch (action) {
    case 'status':
      request('http://localhost:9999/1/detection/status', function (error, response, body) {
        var status1 = (new Date()).toLocaleString() + ' - ';
        if (!error && response.statusCode == 200) {
          status1 += body;
        } else {
          status1 += 'Error';
        }
        request('http://localhost:9999/2/detection/status', function (error, response, body) {
          var status2 = (new Date()).toLocaleString() + ' - ';
          if (!error && response.statusCode == 200) {
            status2 += body;
          } else {
            status2 += 'Error';
          }
          res.status(200).send({status1:status1, status2: status2})
        })
      })
    break;
    case 'start':
    case 'pause':
      request('http://localhost:9999/1/detection/'+action, function (error, response, body) {
        var status1 = (new Date()).toLocaleString() + ' - ';
        if (!error && response.statusCode == 200) {
          status1 += body;
        } else {
          status1 += 'Error';
        }
        request('http://localhost:9999/2/detection/'+action, function (error, response, body) {
          var status2 = (new Date()).toLocaleString() + ' - ';
          if (!error && response.statusCode == 200) {
            status2 += body;
          } else {
            status2 += 'Error';
          }
          res.status(200).send({status1:status1, status2: status2})
        });
      });
    break;
    default:
      res.status(500).send('Unrecognized action')
    break;
  }
};
