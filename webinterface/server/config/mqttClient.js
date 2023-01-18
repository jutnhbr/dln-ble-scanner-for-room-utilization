import mqttClient from "mqtt";
import * as database from "./database.js";
import * as dotenv from "dotenv";
dotenv.config();

const host = process.env.HOST_HOME
const host_htw = process.env.HOST_HTW
const topic = process.env.TOPIC_SCAN;
let client;
let message = "";
let arr = [];
let currentTopic = null;



const options = {
    clientId: process.env.CLIENT_ID,
    protocol: "ws"
}

export const connect = () => {
    client = mqttClient.connect(host, options);

    client.on('error', (err) => {
        console.log(err);
        client.end();
    });

    client.on("connect", () => {
        console.log("Client Connected!");
        client.subscribe([topic], () => {
            console.log("Subscribed to topic: " + topic);
            currentTopic = topic;
        })
    })
    client.on("close", () => {
        console.log('Connection to broker closed');
        currentTopic = null;
        reconnect();
    });
}

export const reconnect = () => {
    client.reconnect();
}

export const subscribe = () => {
    client.on("message", (topic, payload) => {
        console.log("Message received");
        message = payload.toString();
        message = JSON.parse(message);
        // add every entry to an array
        for (let i = 0; i < Object.keys(JSON.parse(message["scanresult"])).length; i++) {
            // console.log(JSON.parse(message["scanresult"])[i]);
            database.writeScan(JSON.parse(message["scanresult"])[i]);
        }
    });
}

export const checkConnection = () => {
    if (client.connected) {
        return "Connected";
    } else {
        return "Not Connected";
    }
}

export const getTopic = () => {
    return currentTopic;
}


