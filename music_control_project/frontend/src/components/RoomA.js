import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.navigationInProgress = false;  // Add a flag to indicate navigation is in progress
        this._isMounted = false; // Add a mounted flag
    }
    // By moving the call to this.getRoomDetails() into componentDidMount, you ensure the component is fully mounted before fetching data. 
    componentDidMount() {
        this._isMounted = true; // Set to true when the component mounts
        this.getRoomDetails();
    }

    componentWillUnmount() {
        // This will be called right before the component is removed from the DOM
        this.navigationInProgress = true;  // Ensure no API calls are made after component begins unmounting
        this._isMounted = false; // Set to false when the component unmounts
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.props.roomCode)
        .then((response) => {
            // Reedirect user to the homepage if the room code is invalid
            if (!response.ok) {
                // may not be correct below
                this.props.navigate("/");
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        })
        .catch((error) => {
            console.error("Failed to fetch room details: ", error);
            // Handle failure (e.g., by setting state to show an error message)
        });
    }


    leaveButtonPressed() {
        // need requestOptions as it is a POST request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/leave-room', requestOptions)
        .then((response) => {
            if (!response.ok) {
                // Handle unsuccessful response (e.g., server error or room not found)
                return response.json().then(data => {
                    throw new Error(data.Message || 'Failed to leave the room');
                });
            }
            return response.json(); // If response is okay, also convert to JSON to log the message
        })
        .then((data) => {
            console.log(data.Message);
            this.navigationInProgress = true;  // Set a flag to indicate navigation is in progress
            this.props.navigate("/");
        })
        .catch((error) => {
            console.error(error);
            // Optionally handle the error state in the UI (e.g., show an error message to the user)
            // For now, we navigate to the homepage regardless of the error as a fallback
            this.props.navigate("/");
        });
    }

    render() {
        // Access roomCode directly from props now
        const { roomCode } = this.props;
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Code: {roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest can pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Are you a host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>

            // <div>
            //     <h3>{roomCode}</h3>
            //     <p>Votes: {this.state.votesToSkip}</p>
            //     <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
            //     <p>Host: {this.state.isHost.toString()}</p>
            // </div>
        );
    }
}

function RoomWrapper() {
    let navigate = useNavigate();
    const { roomCode } = useParams(); // Use useParams hook to get the route params
    return <Room roomCode={roomCode} navigate={navigate} />; // Pass roomCode as a prop to Room
}

export default RoomWrapper;