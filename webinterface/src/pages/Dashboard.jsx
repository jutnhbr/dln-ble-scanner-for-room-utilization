import NavBar from "../components/NavBar/NavBar";
import "./Pages.css"
import CustomLineChart from "../components/CustomLineChart/CustomLineChart";
import {useFetch} from "../hooks/useFetch";
import {useEffect, useState} from "react";
import SelectorMenu from "../components/SelectorMenu/SelectorMenu";
import StatsPanel from "../components/StatsPanel/StatsPanel";
import {createDataSet} from "../data/testData";


const Dashboard = () => {

    // TODO: Code Splitting / refactoring

    const {fetchedData, fetchData} = useFetch("http://localhost:3000/scans/count?timeRange=30d&timeWindow=5m");
    const [chartData, setChartData] = useState(null);
    const [timeRange, setTimeRange] = useState("30d");
    const [timeWindow, setTimeWindow] = useState("5m");
    const [stats, setStats] = useState({all: 0, consumer: 0});
    const [showTestData, setShowTestData] = useState(false);
    const [datatype, setDatatype] = useState("Real Data");

    const formatChartData = (rawData) => {
        const allData = [];
        const consumerData = [];
        const allDevices = rawData.all;
        const consumerDevices = rawData.consumer;

        /*
        allDevices.forEach((device, index) => {
            allData.push({x: device._time, y: device.result_raw});
            if (consumerDevices[index]) {
                consumerData.push({x: consumerDevices[index]._time, y: consumerDevices[index].result_raw});
            } else {
                consumerData.push({x: device._time, y: 0});
            }
        });
         */

        allDevices.forEach((item) => {
            allData.push({x: item._time, y: item.result_raw});
        });
        consumerDevices.forEach((item) => {
            consumerData.push({x: item._time, y: item.result_raw});
        });

        const formattedData = [
            {
                id: "count",
                color: "hsl(0, 70%, 50%)",
                data: allData
            },
            {
                id: "consumer",
                color: "hsl(134,80%,41%)",
                data: consumerData
            }
        ];
        const all = allData.reduce((acc, item) => acc + item.y, 0);
        const consumer = consumerData.reduce((acc, item) => acc + item.y, 0);
        setStats({all, consumer});
        setChartData(formattedData);
    }

    useEffect(() => {
            if (fetchedData) {
                formatChartData(fetchedData);
            }
        }
        , [fetchedData])


    const handleFetch = (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/scans/count?timeRange=${timeRange}&timeWindow=${timeWindow}`;
        fetchData(url).then(r => {
            if (r) {
                formatChartData(r);
            }
        });
    }

    const handleChangeTimeRange = (e) => {
        setTimeRange(e.target.value);
    }

    const handleChangeTimeWindow = (e) => {
        setTimeWindow(e.target.value);
    }

    const handleShowTestData = (e) => {
        e.preventDefault();
        setShowTestData(!showTestData);
        if (showTestData) {
            setDatatype("Test Data");
            const dataset = createDataSet(100, 45);
            setChartData(dataset.datasets);
            setStats({all: dataset.data1Count, consumer: dataset.data2Count});
        } else {
            setDatatype("Real Data");
            fetchData(`http://localhost:3000/scans/count?timeRange=${timeRange}&timeWindow=${timeWindow}`).then(r => {
                if (r) {
                    formatChartData(r);
                }
            });
        }

    }


    return (
        <>
            <NavBar/>
            <SelectorMenu handleChangeTimeRange={handleChangeTimeRange}
                          handleChangeTimeWindow={handleChangeTimeWindow}
                          handleFetch={handleFetch}
                          handleShowTestData={handleShowTestData}
                          datatype={datatype}/>
            {chartData && <CustomLineChart data={chartData}/>}
            <div className={"stats"}>
                <StatsPanel stats={stats}/>
            </div>
        </>
    )
}

export default Dashboard;