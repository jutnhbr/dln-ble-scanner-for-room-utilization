import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useFetch} from "../../hooks/useFetch";
import {CloudQueue} from "@mui/icons-material";


const NavBar = () => {

    const {fetchedData, isLoading, errMsg} = useFetch("http://localhost:3000/mqtt/status");
    const handleRefresh = () => {
        fetch("http://localhost:3000/mqtt/connect", {
            method: "POST",
        }).then((res) => {
            window.location.reload();
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MQTT Status: {isLoading ? "Loading..." : fetchedData.status}  |
                        Topic: {isLoading ? "Loading..." : fetchedData.topic}
                    </Typography>
                    <Button onClick={handleRefresh} color="inherit">Refresh</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;