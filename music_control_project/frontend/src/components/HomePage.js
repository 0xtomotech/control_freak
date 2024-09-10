import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
// Assuming CreateRoomPageWrapper and RoomJoinPageWrapper are also updated to functional components if needed.
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

const HomePage = () => {
    const [roomCode, setRoomCode] = useState(null);
    const location = useLocation(); // Use useLocation hook to react to changes in the URL

    useEffect(() => {
        const fetchUserRoom = async () => {
            try {
                const response = await fetch('/api/user-in-room');
                if (!response.ok) {
                    throw new Error('Failed to fetch user room status');
                }
                const data = await response.json();
                setRoomCode(data.code);
            } catch (error) {
                console.error(error);
                setRoomCode(null);
            }
        };

        fetchUserRoom();
    }, [location.pathname]); // Add history to the dependency array if using react-router v5. If using v6, find the equivalent navigation event listener mechanism

    const renderHomepage = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">Control Freak</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained">
                    <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                    <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={roomCode ? <Navigate to={`/room/${roomCode}`} replace /> : renderHomepage()} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
    );
};

export default HomePage;
