import {ResponsiveLine} from "@nivo/line";
import "./CustomLineChart.css";
import {useEffect, useRef, useState} from "react";

const CustomLineChart = ({data}) => {
    const prevDateRef = useRef(null);

    useEffect(() => {
        prevDateRef.current = null;
    }, [data]);

    const formatDate = value => {
        const date = new Date(value);
        const currentDate = date.toDateString();

        if (prevDateRef.current !== currentDate) {
            prevDateRef.current = currentDate;
            return `${date.getDate()}-${date.getMonth() + 1} ${date.getHours()}:${
                date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            }`;
        }
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    };


    return (
        <div className={"line-chart-container"}>
            <ResponsiveLine
                colors={(d) => d.color}
                data={data}
                margin={{top: 50, right: 110, bottom: 50, left: 60}}
                xScale={{type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 75,
                    legend: 'date',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    format: value => formatDate(value)

                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}


export default CustomLineChart;