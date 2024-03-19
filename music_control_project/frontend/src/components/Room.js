import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
    }
    // By moving the call to this.getRoomDetails() into componentDidMount, you ensure the component is fully mounted before fetching data. 
    componentDidMount() {
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.props.roomCode)
        .then((response) => {
            if (!response.ok) {
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

    render() {
        // Access roomCode directly from props now
        const { roomCode } = this.props;
        return (
            <div>
                <h3>{roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}

function RoomWrapper() {
    const { roomCode } = useParams(); // Use useParams hook to get the route params
    return <Room roomCode={roomCode} />; // Pass roomCode as a prop to Room
}

export default RoomWrapper;