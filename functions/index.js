const functions = require("firebase-functions");
const express = require("express");
const server = express();
server.get("/some-data", (request, response) => {
    response.send("Hello world");
});
exports.app = functions.https.onRequest(server);