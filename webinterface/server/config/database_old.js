/*
const Influx = require('influx');

let influx;

const createClient = () => {
    influx = new Influx.InfluxDB({
        host: process.env.INFLUX_URL,
        database: "scans",
        schema: [
            {
                measurement: 'scans',
                fields: {
                    result_raw: Influx.FieldType.STRING,
                    result_addr_type: Influx.FieldType.STRING,
                    result_addr: Influx.FieldType.STRING,
                    result_name: Influx.FieldType.STRING,
                    result_rssi: Influx.FieldType.INTEGER,
                    isConnectable: Influx.FieldType.BOOLEAN,
                },
                tags: ["topic"]
            }
        ]
    });
    influx.getDatabaseNames()
        .then((names) => {
            if (!names.includes("scans")) {
                console.log("Creating database");
                return influx.createDatabase("scans");
            } else {
                console.log("Database found!")
            }
        })
}

const writeScan = (scan) => {
    influx.writePoints([
        {
            measurement: 'scans',
            tags: {topic: process.env.INFLUXDB_TOPIC},
            fields: {
                result_raw: scan.result,
                result_addr_type: scan.result.split(',')[0].split('(')[1],
                result_addr: scan.result.split(',')[1].split(')')[0],
                result_name: scan.result_name,
                result_rssi: scan.result_rssi,
                isConnectable: scan.connectable,
            }
        }
    ]).catch((err) => {
        console.log("Error writing to InfluxDB");
    })
    console.log("Scan written to InfluxDB");
}

const getAllScans = async () => {
    return await influx.query("select * from scans");
}


module.exports = {
    createClient,
    writeScan,
    getAllScans
}

 */
