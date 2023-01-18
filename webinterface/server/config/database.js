import {InfluxDB, Point} from '@influxdata/influxdb-client'
import * as dotenv from 'dotenv'

dotenv.config();


const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_API_TOKEN;

const influxDB = new InfluxDB({
    url: url,
    token: token,
});

const getWriteApi = () => {
    console.log("Getting write api");
    const writeAPI = influxDB.getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET);
    writeAPI.useDefaultTags({topic: process.env.INFLUXDB_TOPIC});
    return writeAPI;
}

const getQueryApi = () => {
    console.log("Getting query api");
    return influxDB.getQueryApi(process.env.INFLUX_ORG);
}
export const writeScan = (scan) => {
    const writer = getWriteApi();

    const point = new Point('scans')
        .stringField('result_raw', scan.result)
        .stringField('result_addr_type', scan.result.split(',')[0].split('(')[1])
        .stringField('result_addr', scan.result.split(',')[1].split(')')[0])
        .stringField('result_name', scan.result_name)
        .stringField('result_rssi', scan.result_rssi.toString())
        .stringField('isConnectable', scan.connectable.toString())
    writer.writePoint(point);
    writer.close().then(r => console.log("Scan written to InfluxDB"));
}


export const getScansByTimeAll = async (range, timeWindow) => {
    const queryApi = getQueryApi();
    const fluxQuery = `from(bucket: "bleScans") 
    |> range(start: ${range}) 
    |> filter(fn: (r) => r["_measurement"] == "scans") 
    |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value") 
    |> aggregateWindow(every: ${timeWindow}, fn: count, column: "result_raw", createEmpty: false)`;
    return await queryApi.collectRows(fluxQuery);
}

export const getScansByTimeConsumer = async (range, timeWindow) => {
    const queryApi = getQueryApi();
    const fluxQuery = `from(bucket: "bleScans") 
    |> range(start: ${range}) 
    |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value") 
    |> filter(fn: (r) => r["_measurement"] == "scans" and r["isConnectable"] == "true" or r["result_addr_type"] == "ADDR_PUBLIC") 
    |> aggregateWindow(every: ${timeWindow}, fn: count, column: "result_raw", createEmpty: false)`
    return await queryApi.collectRows(fluxQuery);
}

