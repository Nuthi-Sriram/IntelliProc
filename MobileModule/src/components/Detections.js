import React from "react";
import swal from 'sweetalert';
//import count from './Login';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "./Detections.css";
var count_phone = 0;
var count_book = 0;
var count_laptop = 0;
var count_noFace = 0;
var count_multipleFace = 0;


export default class Detection extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();

  componentDidMount() {

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: 500,
            height: 300
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          //console.error(error);
        });
    }
  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      if (this.canvasRef.current) {
        sessionStorage.setItem("count_phone", false);
        sessionStorage.setItem("count_book", false);
        sessionStorage.setItem("count_laptop", false);
        sessionStorage.setItem("count_noFace", false);
        sessionStorage.setItem("count_multipleFace", false);
        this.renderPredictions(predictions);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
      } else {
        return false;
      }
    });
  };

  renderPredictions = predictions => {
    //var count=100;
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach(prediction => {

      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 8, textHeight + 8);
      
      let multipleFace = 0;
      for (let i = 0; i < predictions.length; i++) {

        //Face,object detection
        if (predictions[i].class === "person") {
          multipleFace = multipleFace + 1;
        }
        else if (predictions[i].class === "cell phone") {
          swal("Cell Phone Detected", "Action has been Recorded", "error");
          count_phone = count_phone + 1;
        }
        else if (predictions[i].class === "book") {
          swal("Book Detected", "Action has been Recorded", "error");
          count_book = count_book + 1;
        }
        else if (predictions[i].class === "laptop") {
          // swal("Laptop Detected", "Action has been Recorded", "error");
          count_laptop = count_laptop + 1;
        }
        else if (predictions[i].class !== "person") {
          // swal("Face Not Visible", "Action has been Recorded", "error");
          count_noFace = count_noFace + 1;
        }
      }
      if (multipleFace > 1)
      {
        swal("Multiple Faces Detected", "Action has been Recorded", "error");
        count_multipleFace = count_multipleFace + 1;
      }
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      //console.log(predictions)
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      //console.log(prediction.class);

      if (prediction.class === "person" || prediction.class === "cell phone" || prediction.class === "book" || prediction.class === "laptop") {
        ctx.fillText(prediction.class, x, y);
      }
    });
    //console.log("final")
    //console.log(count_facedetect)
    if (count_phone)
      sessionStorage.setItem("count_phone", true);
    if (count_book)
      sessionStorage.setItem("count_book", true);
    if (count_laptop)
      sessionStorage.setItem("count_laptop", true);
    if (count_noFace)
      sessionStorage.setItem("count_noFace", true);
    if (count_multipleFace)
      sessionStorage.setItem("count_multipleFace", true);

  };

  render() {
    return (
      <div>
        <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="500"
          height="300"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="500"
          height="300"
        />
      </div>
    );
  }
}