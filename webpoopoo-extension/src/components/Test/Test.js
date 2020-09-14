import React, { Component, props } from 'react';
import * as io from 'socket.io-client';

import './Test.css';

export class Test extends Component {
  // url = 'http://127.0.0.1:9050';

  url = 'http://localhost:4000';
  socket;
  room;
  username;
  users;

  constructor() {

    super(props)
    // this.socket = io(this.url);
    // console.log(this.socket)
    // this.state = {}

    /*const socket = new WebSocket('ws://localhost:3000');



    socket.onopen(() => {
      socket.send('Hello!');
    });

    socket.onmessage(data => {
      console.log(data);
    });*/
  }

  button() {
    // this.socket.on('roomMessageResponse', (message) => {
    //   console.log(message)
    // });
    /*console.log(this.socket)
    this.socket.emit('connectUser', 'test');
    console.log('test')*/

    var PORT = 9050;
    var HOST = '127.0.0.1';

    var dgram = require('dgram');
    var message = new Buffer('My KungFu is Good!');
    
    var client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
      if (err) throw err;
      console.log('UDP message sent to ' + HOST + ':' + PORT);
      client.close();
    });
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