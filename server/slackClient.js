/* THE BAD WAY OF DOING MICROSERVICES

var RtmClient = require('@slack/client').RtmClient;

// var token = process.env.SLACK_API_TOKEN || '';
var token = 'xoxb-285839840913-uEHnUVOosHRxCVe2fBCBENVO';

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

*/

// THE BETTER WAY OF DOING MICROSERVICES
'use strict';

var RtmClient = require('@slack/client').RtmClient;

module.exports.init = function slackClient(token, logLevel) {
    const rtm = new RtmClient(token, {logLevel: logLevel});
    return rtm;
}