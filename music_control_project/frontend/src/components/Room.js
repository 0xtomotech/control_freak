import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';

const Room = () => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const getRoomDetails = async () => {
            try {
                const response = await fetch(`/api/get-room?code=${roomCode}`, { signal: signal });
                if (!response.ok) {
                    navigate("/");
                    throw new Error('Network response was not ok'); // This might still be useful for logging but won't prevent the navigation.
                } else {
                    const data = await response.json();
                    setRoomDetails({
                        votesToSkip: data.votes_to_skip,
                        guestCanPause: data.guest_can_pause,
                        isHost: data.is_host,
                    });
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Failed to fetch room details: ", error);
                    navigate("/");
                }          
            }
        };
    
        getRoomDetails();

        return () => {
            abortController.abort();
        };
    
    }, [roomCode, navigate]); // Depend on roomCode and navigate to re-run effect if they change

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/leave-room', requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.Message || 'Failed to leave the room');
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.Message);
            navigate("/");
        })
        .catch((error) => {
            console.error(error);
            navigate("/");
        });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest can pause: {roomDetails.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Are you a host: {roomDetails.isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default Room;
