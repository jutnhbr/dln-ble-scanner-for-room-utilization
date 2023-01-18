const generateData = (numPoints, maxValue) => {
    const data1 = [];
    const data2 = [];
    let currentDate = new Date("2022-12-31T01:00:00Z");
    let currentValue1 = 5;
    let currentValue2 = 5;
    for (let i = 0; i < numPoints; i++) {
        currentValue1 = Math.round(currentValue1 + Math.random() * 5 - 2.5);
        if (currentValue1 > maxValue) {
            currentValue1 = maxValue;
        }
        if (currentValue1 < 0) {
            currentValue1 = 0;
        }
        data1.push({
            x: currentDate.toISOString(),
            y: currentValue1
        });
        currentValue2 = Math.round(currentValue2 + Math.random() * 5 - 2.5);
        if (currentValue2 > currentValue1) {
            currentValue2 = currentValue1 - 1;
        }
        if(currentValue2 < 0) {
            currentValue2 = 0;
        }
        data2.push({
            x: currentDate.toISOString(),
            y: currentValue2
        });
        currentDate.setMinutes(currentDate.getMinutes() + 5);
    }
    return [data1, data2];
}


export const createDataSet = (numPoints, maxValue) => {
    const [data1, data2] = generateData(numPoints, maxValue);
    return {
        // calculate total number of points
        data1Count: data1.reduce((acc, item) => acc + item.y, 0),
        data2Count: data2.reduce((acc, item) => acc + item.y, 0),
        datasets: [
            {
                id: "count",
                color: "hsl(0, 70%, 50%)",
                data: data1
            },
            {
                id: "consumer",
                color: "hsl(134,80%,41%)",
                data: data2
            }
        ]
    }
}


export default createDataSet();