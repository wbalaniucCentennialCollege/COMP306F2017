/* THE BAD WAY OF DOING MICROSERVICES

var RtmClient = require('@slack/client').RtmClient;

// var token = process.env.SLACK_API_TOKEN || '';
var token = 'xoxb-285839840913-uEHnUVOosHRxCVe2fBCBENVO';

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

*/

// THE BETTER WAY OF DOING MICROSERVICES
'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`)
}

function addAuthenticatedHandler(rtm, handler) { // 2nd parameter will be a function that handles the event
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler)
}

module.exports.init = function slackClient(token, logLevel) {
    const rtm = new RtmClient(token, {logLevel: logLevel});
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;