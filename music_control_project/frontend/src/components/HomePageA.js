import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import CreateRoomPageWrapper from "./CreateRoomPage";
import Room from "./Room";
import RoomWrapper from "./Room";
import RoomJoinPageWrapper from "./RoomJoinPage";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }
    
    async componentDidMount() {
        fetch('/api/user-in-room')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch user room status');
            }
            return response.json();
        })
        .then((data) => {
            this.setState({
                roomCode: data.code,
            })
        })
        .catch((error) => {
            console.error(error);
            // In case of an error (e.g., room does not exist), ensure roomCode is null
            this.setState({
                roomCode: null,
            });
        });
    }

    renderHomepage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        Control Freak
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained">
                        <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                        <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode() {
        this.setState({
            roomCode: null,
        });
    }


    render() {
        return (
            <Router>
              <Routes>
                <Route
                    path="/"
                    element={
                        this.state.roomCode ? (<Navigate to={`/room/${this.state.roomCode}`} replace />) : (this.renderHomepage())
                    } 
                />
                <Route path="/join" element={<RoomJoinPageWrapper />} />
                <Route path="/create" element={<CreateRoomPageWrapper />} />
                {/* Old implementation */}
                {/* <Route
                    path="/room/:roomCode"
                    element={<RoomWrapper />} 
                /> */}
                
                <Route path="/room/:roomCode" element={<RoomWrapper />} />
              </Routes>
            </Router>
          );
    }
}