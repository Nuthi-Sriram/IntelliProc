import { Button } from '@material-ui/core';
import React from 'react'
import Webcam from "react-webcam";
//import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import './validate.css';
import styles from './../styles.module.css';
import background from './../bg_images/bg7.jpg';
import { Container, Row, Col } from 'react-bootstrap'

const ValidatePage = () => {
  var buttonfield = true;
  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }
  // document.addEventListener("visibilitychange", handleVisibilityChange, false);
  //for capturing image
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    sessionStorage.setItem("imageSrc", imageSrc);
  }, [webcamRef, setImgSrc]);

  //image as base64
  //console.log(imgSrc);

  if (imgSrc) {
    buttonfield = false;
  }


  const history = useHistory();

  // /* View in fullscreen */
  // function openFullscreen() {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //     history.push("/instructions")
  //   } else if (elem.webkitRequestFullscreen) { /* Safari */
  //     elem.webkitRequestFullscreen();
  //     history.push("/instructions")
  //   } else if (elem.msRequestFullscreen) { /* IE11 */
  //     elem.msRequestFullscreen();
  //     history.push("/instructions")
  //   }
  // }
  function handleClick() {
    history.push("/systemcheck");
  }
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
              )}</center>

          </Col>
        </Row>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0'}}>
        <button type="reset" class="btn btn-primary" onClick={capture}>Capture Photo</button>
        <button type="submit" class="btn btn-success" onClick={handleClick} disabled={buttonfield}>Confirm and move to the exam</button>
      </div></>
  )
}

export default ValidatePage;