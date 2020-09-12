import React, { Component, props } from 'react';
import * as io from 'socket.io-client';

import './Test.css';

export class Test extends Component {
  // url = 'http://91.166.171.168:9050';

  url = 'http://localhost:4000';
  socket;
  room;
  username;
  users;

  constructor() {

    // super(props)
    // this.socket = io(this.url);
    // console.log(this.socket)
    // this.state = {}

    const socket = new WebSocket('ws://localhost:3000');

    

    socket.onopen(() => {
      socket.send('Hello!');
    });

    socket.onmessage(data => {
      console.log(data);
    });
  }

  button() {
    // this.socket.on('roomMessageResponse', (message) => {
    //   console.log(message)
    // });
    console.log(this.socket)
    this.socket.emit('connectUser', 'test');
    console.log('test')
  }


  render() {
    // this.socket.on('message', () => {
    //   console.log('ok');
    // })

    return (
      <div className="Test">
        Test Component

        <button onClick={this.button.bind(this)}>
          salut
        </button>
      </div>
    )
  }

}

export default Test;