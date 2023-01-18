import "./StatsPanel.css";
import {BluetoothSearching, Devices, DeviceUnknown} from "@mui/icons-material";
const StatsPanel = ({stats}) => {
    return (
        <div className="stats-panel">
            <p>
                <BluetoothSearching/> Total Devices: {stats.all}
            </p>
            <p>
                <Devices/>  Total Possible Consumer Devices: {stats.consumer}
            </p>
            <p>
                <DeviceUnknown/> Other Devices: {stats.all - stats.consumer}
            </p>
        </div>
    )
}

export default StatsPanel;