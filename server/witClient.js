'use strict';

const request = require('superagent');

function handleWitResponse(res) {
    return res.entities;
}

/*
curl \
 -H 'Authorization: Bearer GQLHWTXDCCHLDPYCOPECHRPC4UKDSKLV' \
 'https://api.wit.ai/message?v=20171218&q='
 */

module.exports = function witClient(token) {
    const ask = function ask(message, cb) {
        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + token)
            .query({v: '20171218'})
            .query({q: message})
            .end((err, res) => {
                // Is there an error?
                if(err) {
                    return cb(err);
                }
                
                // Is there a status code other than 200 (NOT OK)
                if(res.statusCode != 200) {
                    return cb('Expected status code 200 but code ' + res.statusCode);
                }

                // Everything is good!
                const witResponse = handleWitResponse(res.body);
                return cb(null, witResponse);
            });
    }

    return {
        ask: ask
    }
}