import React, { Component } from 'react'
import shortid from 'shortid'

export default class Chat extends Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    // this is an "echo" websocket service for testing pusposes
    this.connection = new WebSocket('ws://localhost:9000')
    // listen to onmessage event
    this.connection.onmessage = evt => {
      // add the new message to state
      this.setState({ messages: [...this.state.messages, evt.data] })
    }

    // for testing: sending a message to the echo service every 2 seconds,
    // the service sends it right back
    setInterval(_ => {
      this.connection.send(Math.random())
    }, 2000)
  }

  render() {
    return (
      <>
        <div>
          <div className="messages">
            {this.state.messages.map(message => {
              return <div key={shortid.generate()}>{message}</div>
            })}
          </div>
        </div>
      </>
    )
  }
}
