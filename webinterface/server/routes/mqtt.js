import express from 'express';
import * as mqttClient from "../config/mqttClient.js";
const router = express.Router();

router.get('/status', function (req, res, next) {
    // send status and topic in json format
    res
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({
                status: mqttClient.checkConnection(),
                topic: mqttClient.getTopic()
            }
        );
});

router.post('/connect', function (req, res, next) {
    // connect to mqtt broker
    mqttClient.connect();
    mqttClient.subscribe();
       res
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({
                status: mqttClient.checkConnection(),
                topic: mqttClient.getTopic()
        });
});


export { router as mqttRoute }