'use strict';

const service = require("../server/service"); // Ties into service.js (just created)
const http = require('http'); // Part of base NODE.JS

const server = http.createServer(service); // Server objects that uses express
server.listen(3000);

server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode`);
});