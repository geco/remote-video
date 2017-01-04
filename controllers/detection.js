const request = require('request');
const async = require('async');

exports.index = (req, res) => {
  var action = req.query.action;
  var camCount = process.env.CAM_HOSTS.split(',').length;
  switch (action) {
    case 'status':
    case 'start':
    case 'pause':
      async.timesSeries(camCount, (n, next) => {
        request(process.env.MOTION_WEBCONTROL_HOST+'/'+(n+1)+'/detection/'+action, function (error, response, body) {
          var status = (new Date()).toLocaleString() + ' - ';
          if (!error && response.statusCode == 200) {
            status += body;
          } else {
            status += 'Error';
          }
          next(null, status);
        })
      }, (err, statusArray) => {
        res.status(200).send({status:statusArray})
      });
    break;
    default:
      res.status(500).send('Unrecognized action')
    break;
  }
};
