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
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;

// Function to handle when bot is connected and authenticated
function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`)
}

// Function to handle message recieved by bot
function handleOnMessage(message) {

    /*
    nlp.ask(message.text, (err, res) => {
        if(err) {
            console.log(err);
            return;
        }

        if(!res.intent) {
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", message.channel);
        } else if(res.intent[0].value == 'time' && res.location) {
            return rtm.sendMessage(`I don't yet know the time in ${res.location[0].value}`, message.channel);
        } else {
            console.log(res);
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", message.channel)
        }

        rtm.sendMessage('Sorry I do not understand', message.channel, function() {
            // Optional callback
        });
    });
    */

    if (message.text.toLowerCase().includes('iris')) {
        nlp.ask(message.text, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }

            try {
                console.log(res.intent);

                // Error check
                if(!res.intent || !res.intent[0] || !res.intent[0].value) {
                    throw new Error("Could not extract intent");
                }

                // const intent = require('../intents/timeIntent');
                const intent = require('../intents/' + res.intent[0].value + 'Intent');

                intent.process(res, function(error, response) {
                    if(error) {
                        console.log(error.message);
                        return;
                    }

                    return rtm.sendMessage(response, message.channel);
                });
            } catch (err) {
                console.log(err);
                console.log(res);
                rtm.sendMessage("Sorry, I don't know what you are talking about", message.channel);
            }
        });
    }



    /*
    rtm.sendMessage('this is a test message', message.channel, function () {
        // Optional callback function that executes when a message is sent by the bot.
    });
    */
}

    function addAuthenticatedHandler(rtm, handler) { // 2nd parameter will be a function that handles the event
        rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler)
    }

    module.exports.init = function slackClient(token, logLevel, nlpClient) {
        rtm = new RtmClient(token, { logLevel: logLevel });
        nlp = nlpClient;
        addAuthenticatedHandler(rtm, handleOnAuthenticated);
        rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
        return rtm;
    }

    module.exports.addAuthenticatedHandler = addAuthenticatedHandler;