'use strict';

var ChannelID = 1470000000; // Your ID
var ChannelSecret = "def889cei00000000000000000000000000000"; // Your ID
var MID = "u0e0450000000000000000000"; // Your ID


var https = require('https');

function send(data, callback) {
  var body = JSON.stringify(data);

  var req = https.request({
    hostname: "trialbot-api.line.me",
    port: 443,
    path: "/v1/events",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      'X-Line-ChannelID': ChannelID,
      'X-Line-ChannelSecret': ChannelSecret,
      'X-Line-Trusted-User-With-ACL': MID
    }
  });

  req.end(body, function (err) {
    err && console.log(err);
    callback(err);
  });
}

exports.handler = function (event, context, callback) {
  var result = event.result && event.result[0];
  if (result) {
    var content = result.content || {};
    var message = {
      "to": [content.from],
      "toChannel": 1383378250, // 1383378250 Fixed value
      "eventType": "138311608800106203", // Fixed value.
      "content": {
        "contentType": 1,
        "toType": 1,
        "text": content.text
      }
    };
    send(message, function () {
      callback();
    });
  } else {
    callback();
  }
};
