import express from 'express';
import * as database from "../config/database.js";

const router = express.Router();

router.get('/count', async function (req, res, next) {
    let range = "-" + req.query.timeRange;
    let timeWindow = req.query.timeWindow;
    let data = await database.getScansByTimeAll(range, timeWindow);
    let dataConsumer = await database.getScansByTimeConsumer(range, timeWindow);
    console.log(data);
    res
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({
            "all": data,
            "consumer": dataConsumer
        });
});


export {router as scansRoute}