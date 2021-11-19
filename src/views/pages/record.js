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

  onData(recordedBlob) { }

  onStop(recordedBlob) {
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var date = new Date();
    const blobRef = storageRef.child(
      `audio/${date.getDate()}/${date.toLocaleTimeString()}.mp3`
    );
    try {
      // blobRef.put(recordedBlob.blob).then(function (snapshot) {
      //   // alert("Audio Saved Successfully!!!");
      //   console.log("Uploaded MP3 to firebase");
      // });
      myfunction();
      function myfunction()
      {
          
  
          // put file to firebase 
          var uploadTask = blobRef.put(recordedBlob.blob);
          uploadTask.then(function (snapshot) {
            // alert("Audio Saved Successfully!!!");
            console.log("Uploaded MP3 to firebase");
          });
          // all working for progress bar that in html
          // to indicate image uploading... report
          uploadTask.on('state_changed', function(snapshot){
            // var progress = 
            //  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //   var uploader = document.getElementById('uploader');
            //   uploader.value=progress;
            //   switch (snapshot.state) {
            //     case firebase.storage.TaskState.PAUSED:
            //       console.log('Upload is paused');
            //       break;
            //     case firebase.storage.TaskState.RUNNING:
            //       console.log('Upload is running');
            //       break;
            //   }
          }, function(error) {console.log(error);
          }, function() {
  
              //  // get the uploaded image url back
              //  uploadTask.snapshot.ref.getDownloadURL().then(
              //   function(downloadURL) {
  
              //  // You get your url from here
              //   console.log('File available at', downloadURL);
  
              // // print the image url 
              //  console.log(downloadURL);
              // document.getElementById('submit_link').removeAttribute('disabled');


              uploadTask.snapshot.ref.getDownloadURL().then(
                function (downloadURL) {
          
                  // You get your url from here
                  // alert('File available at', downloadURL);
          
                  // print the image url
                  console.log(downloadURL);
                  sessionStorage.setItem("audiorec", downloadURL);
                  // var ar=sessionStorage.getItem("audiorec");
                  // console.log("spacing ");
                  // console.log(ar);
                });
          });
      };
 





      // blobRef.snapshot.ref.getDownloadURL().then(
      //   function (getDownloadURL) {
      //     console.log(getDownloadURL);
      //     alert(getDownloadURL);
      //     sessionStorage.getItem("audiorec", getDownloadURL);
      //   }
      // ) 


      // blobRef.snapshot.ref.getDownloadURL().then(
      //   function (downloadURL) {
  
      //     // You get your url from here
      //     alert('File available at', downloadURL);
  
      //     // print the image url
      //     console.log(downloadURL);
      //     sessionStorage.getItem("audiorec", downloadURL);
      //   });


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
            Start Audio Recording
          </button>
          <button
            onClick={this.stopRecording}
            disabled={!this.state.record}
            type="button"
          >
            Stop Audio Recording
          </button>
        </div>
      </div>
    );
  }
}




