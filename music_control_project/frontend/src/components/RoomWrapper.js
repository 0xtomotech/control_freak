import React from 'react';
import { useParams } from 'react-router-dom';
import Room from './Room';

function RoomWrapper() {
    const { roomCode } = useParams(); // Use useParams hook to get the route params
    return <Room roomCode={roomCode} />; // Pass roomCode as a prop to Room
}

export default RoomWrapper;
