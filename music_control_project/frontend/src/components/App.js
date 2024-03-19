import React, { Component } from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';

export default class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
        <div className='center'>
            <HomePage />
        </div>);
    }

    // render() {
    //     return (<h1>Testing React. Made by {this.props.name}</h1>); //embed JS code inside html with {}
    // }
}

const appDiv = document.getElementById("app");

// render(<App name="Tomo" />, appDiv);

render(<App />, appDiv);