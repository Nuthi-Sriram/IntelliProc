import React from "react";
import { ReactMic } from "react-mic";
import firebase from "firebase/app";
import { Timer } from "../components";

export class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    };
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  };

  stopRecording = () => {
    this.setState({
      record: false
    });
  };

  onData(recordedBlob) {}

  onStop(recordedBlob) {
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var date = new Date();
    const blobRef = storageRef.child(
      `audio/${date.getDate()}/${date.toLocaleTimeString()}.mp3`
    );
    try {
      blobRef.put(recordedBlob.blob).then(function(snapshot) {
        alert("Recorder Success!!!");
        console.log("Upload MP3 to firebase");
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <Timer begin={this.state.record} />
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#282c34"
        />
        <div>
          <button
            onClick={this.startRecording}
            disabled={this.state.record}
            type="button"
          >
            Start
          </button>
          <button
            onClick={this.stopRecording}
            disabled={!this.state.record}
            type="button"
          >
            Stop
          </button>
        </div>
      </div>
    );
  }
}
