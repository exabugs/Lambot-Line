'use strict';

var ChannelID = 1470000000; // Your ID
var ChannelSecret = "def889cei00000000000000000000000000000"; // Your ID
var MID = "u0e0450000000000000000000"; // Your ID


var request = require('request');

function send(data, callback) {
  var options = {
    uri: 'https://trialbot-api.line.me/v1/events',
    json: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charser=UTF-8',
      'X-Line-ChannelID': ChannelID,
      'X-Line-ChannelSecret': ChannelSecret,
      'X-Line-Trusted-User-With-ACL': MID
    }
  };
  request(options, function (error, response, body) {
    callback();
  });
}

exports.handler = function (event, context, callback) {
  var result = event.result && event.result[0];
  if (result) {
    var content = result.content || {};
    var message = {
      "to": [content.from],
      "toChannel": 1383378250, // 1383378250 Fixed value
      "eventType": "138311608800106203", // “138311608800106203” Fixed value.
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
