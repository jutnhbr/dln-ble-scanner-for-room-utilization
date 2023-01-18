import "./SelectorMenu.css";

const SelectorMenu = ({handleChangeTimeRange, handleChangeTimeWindow, handleFetch, handleShowTestData, datatype}) => {
    return (
        <div className={"menu-container"}>
            <p>Time Range: </p>
            <select defaultValue={"10d"} onChange={handleChangeTimeRange}>
                <option value="12h">12h</option>
                <option value="1d">1d</option>
                <option value="3d">3d</option>
                <option value="7d">7d</option>
                <option value="10d">10d</option>
                <option value="14d">14d</option>
                <option value="30d">30d</option>
            </select>
            <p>Time Window: </p>
            <select defaultValue={"5m"} onChange={handleChangeTimeWindow}>
                <option value="5m">5m</option>
                <option value="10m">10m</option>
                <option value="15m">15m</option>
                <option value="30m">30m</option>
                <option value="1h">1h</option>
            </select>
            <button onClick={handleFetch}>Apply</button>
            <p>Showing {datatype}</p>
            <button onClick={handleShowTestData}>Switch Test / Real Data</button>
        </div>
    )
}

export default SelectorMenu;