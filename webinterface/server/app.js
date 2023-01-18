import express from 'express';
import path, {dirname} from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as mqttClient from "./config/mqttClient.js";
// Import Routes
import {mqttRoute} from './routes/mqtt.js';
import {scansRoute} from './routes/scans.js';




let app = express();

// Middleware and Routers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname("./"), 'public')));
app.use('/mqtt', mqttRoute);
app.use('/scans', scansRoute);

// Cross Origin Resource Sharing
app.use(cors({
    origin: "http://localhost:3006",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Connect to MQTT Broker
mqttClient.connect();
// Subscribe to MQTT Topic
mqttClient.subscribe();
// Start Server
app.listen(3000);




export default app;