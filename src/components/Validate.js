import { Button } from '@material-ui/core';
import React from 'react'
import Webcam from "react-webcam";
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import './validate.css';
import styles from './../styles.module.css';
import background from './../bg_images/bg7.jpg';
import { Container, Row, Col } from 'react-bootstrap'

const ValidatePage = () => {
  var buttonfield = true;
  var final_submit = document.querySelector(".final-submit");

  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }

  // Check if the webcam permission is granted or not
  navigator.getMedia = (navigator.getUserMedia || // use the proper vendor prefix
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

  // Import face profile
  const JSON_PROFILE = require('../descriptors/bnk48.json');

  // Initial State
  const INIT_STATE = {
    imageURL: 'https://miro.medium.com/max/800/1*NOhvBhAvNH8EddaPhnMxiw.jpeg',
    fullDesc: null,
    detections: null,
    descriptors: null,
    match: null
  };

  var state = { ...INIT_STATE, faceMatcher: null };
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  //image as base64
  //console.log(imgSrc);

  var buttonCheck = () => {
    const temp = sessionStorage.getItem("flag");
    if (temp == 1)
      buttonfield = false;
  }

  const history = useHistory();

  const handleImage = async (image = state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
      if (!!fullDesc) {
        state.fullDesc = fullDesc;
        state.detections = fullDesc.map(fd => fd.detection);
        state.descriptors = fullDesc.map(fd => fd.descriptor);
      }
    });
    if (!!state.descriptors && !!state.faceMatcher) {
      let match = await state.descriptors.map(descriptor =>
        state.faceMatcher.findBestMatch(descriptor)
      );
      state.match = match;
    }
  };

  const componentWillMount = async () => {
    await loadModels();
    state.faceMatcher = await createMatcher(JSON_PROFILE);
    await handleImage(state.imageURL);
  };

  componentWillMount();

  const resetState = () => {
    state = { ...INIT_STATE };
  };

  var drawBox = null;
  var imgCheck;
  var drawDetections = () => {
    imgCheck = state.imageURL;
    const detections = state.detections;
    const match = state.match;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }
  }

  // function handleClick() {
  //   history.push("/systemcheck");
  // }

  var imageSrc;
  const capture = async () => {
    try {
      if (!!webcamRef.current) {
        await getFullFaceDescription(
          imageSrc = webcamRef.current.getScreenshot()
        ).then(fullDesc => {
          if (!!fullDesc) {
            state.fullDesc = fullDesc;
            state.detections = fullDesc.map(fd => fd.detection);
            state.descriptors = fullDesc.map(fd => fd.descriptor);
          }
        })
      }
    } catch (err) {
      console.log("Error while capturing image: " + err);
      swal("Camera access denied", "Please provide access to your web camera to proceed with the test", "error");
    };
    // console.log(imageSrc);
    if (!!state.descriptors && !!state.faceMatcher) {
      let match = state.descriptors.map(descriptor =>
        state.faceMatcher.findBestMatch(descriptor)
      );
      state.match = match;
    }
    setImgSrc(imageSrc);
    sessionStorage.setItem("imageSrc", imageSrc);
    drawDetections();
    // console.log("Matching face name: "+state.match);
    // console.log(state.match[0]._label);
    const name = sessionStorage.getItem("checkname");

    // Check for webcam permission
    navigator.getMedia({ video: true }, function () {
      if (state.match == null || state.match == 0 || state.match[0]._label !== name) {
        swal("Student not recognized as " + name, "You can not proceed with the test unless you are the authorized student.", "error");
        if (final_submit)
          final_submit.disabled = true;
      }
      else {
        swal("Success", "Student recognized as " + name);
        buttonfield = false;
        if (final_submit)
          final_submit.disabled = false;
        else
          swal("Please capture your photo again!");
      }
    }, function () {
      if (final_submit)
        final_submit.disabled = true;
      swal("Camera access denied", "Please provide access to your web camera to proceed with the test", "error");
    });
  };

  const handleClick = () => {
    history.push("/systemcheck");
  };

  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}> </div><center style={{ color: 'white', marginTop: '10px' }}>

      <h2><b>Facial Biometric Phase</b></h2>
      <small>Make sure that your FACE is well aligned with the webcam. This picture will be used for identification purpose.</small>

    </center><Container fluid style={{ color: 'white', marginTop: '20px' }}>
        <Row>
          <Col sm={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <center>
              <label style={{ color: 'white', fontSize: '20px' }}>WebCam: </label><br />
              <Webcam
                style={{ borderRadius: '10px' }}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg" /></center>

          </Col>
          <Col sm={6}>
            <center>
              <label style={{ color: 'white', fontSize: '20px' }}>Captured Image: </label><br />
              {imgSrc && (
                <img
                  style={{ borderRadius: '10px' }}
                  src={imgSrc} />
              )}{!!drawBox ? drawBox : null}</center>

          </Col>
        </Row>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        <button type="reset" class="btn btn-primary" onClick={capture}>Capture Photo</button>
        <button type="submit" class="btn btn-success final-submit" onClick={handleClick} disabled={buttonfield}>Confirm and move to the exam</button>
      </div></>
  )
}

export default ValidatePage;