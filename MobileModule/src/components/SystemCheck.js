import { Button } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom';
import "./SystemCheck.css"
import styles from './../styles.module.css';
import background from './../bg_images/bg1.jpg';
import icon from "./icon.png"
import DetectRTC from 'detectrtc';
import swal from 'sweetalert';

const NetworkSpeed = require('network-speed');  // ES5
const testNetworkSpeed = new NetworkSpeed();

var buttonViewDisabled = true

function ValidateCheck() {

  var isAllowed = false;


  // Network Check
  var netSpeedVar = sessionStorage.getItem("netspeed");
  if (netSpeedVar > 2) {
    isAllowed = true
  }


  // Browser Check
  if (DetectRTC.browser.isChrome) {  //.................................Chrome
    // If Browser is Chrome
    if (DetectRTC.browser.version > 80) {
      // If the Browser is updated
      isAllowed = true
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser")
      isAllowed = false
    }
  } if (DetectRTC.browser.isFirefox) { //.................................Firefox
    // If Browser is Chrome
    if (DetectRTC.browser.version > 60) {
      // If the Browser is updated
      isAllowed = true
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser")
      isAllowed = false
    }
  } if (DetectRTC.browser.isSafari) {  //.................................Safari
    // If Browser is Chrome
    if (DetectRTC.browser.version > 12) {
      // If the Browser is updated
      isAllowed = true
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser")
      isAllowed = false
    }
  } if (DetectRTC.browser.isOpera) { //.................................Opera
    // If Browser is Chrome
    if (DetectRTC.browser.version > 60) {
      // If the Browser is updated
      isAllowed = true
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser")
      isAllowed = false
    }
  } if (DetectRTC.browser.isEdge) { //.................................Edge
    // If Browser is Chrome
    if (DetectRTC.browser.version > 80) {
      // If the Browser is updated
      isAllowed = true
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser")
      isAllowed = false
    }
  }

  // OS Check
  // Note: Not sure WHat we are going to do with This

  // Camera Permission
  DetectRTC.load(function () {

    const webcam = DetectRTC.isWebsiteHasWebcamPermissions;
    if (!webcam) {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      var video = document.querySelector("#videoElement");
      if (navigator.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })

          .catch(function (err0r) {
            //console.log("Something went wrong!");
          });
      }
    }

  });

  const webcam = DetectRTC.isWebsiteHasWebcamPermissions;
  //console.log(webcam)
  if (webcam) {
    isAllowed = true;
  } else {
    isAllowed = false;
  }

  // Final Approval
  if (isAllowed) {
    buttonViewDisabled = false
  } else {
    buttonViewDisabled = true
  }


}

const SystemCheck = () => {

  // Network Speed Check
  async function getNetworkDownloadSpeed() {
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
    const fileSizeInBytes = 500000;
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    return speed
  }
  getNetworkDownloadSpeed().then((value) => { sessionStorage.setItem("netspeed", value["mbps"]) })

  // System Detections Package
  var DetectRTC = require('detectrtc');

  ValidateCheck();

  function handleClick() {
    history.push("/validate");
  }

  var elem = document.documentElement;

  /* View in fullscreen */
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      history.push("/instructions")
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
      history.push("/instructions")
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
      history.push("/instructions")
    }
  }
  const history = useHistory();


  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}> </div>
    <div class="main">
      <p class="sign" align="center">Mobile Compatibility Check</p>
      <table align="center">
        <tbody><tr>
          <td class="text-center">
            <div>
              <img src={icon} alt="System compatibility" id="classIcon" />
            </div>
          </td>
          <td>
            <ul>
              <li class="test">
                <span><b>Mobile OS:</b>  {"- " + JSON.stringify(DetectRTC.osName, null, 2).slice(1, -1) + " " + JSON.stringify(DetectRTC.osVersion, null, 0).slice(1, -1)} </span>
              </li>
              {/* <li class="test">
                <span><b>Browser:</b> {"- " + JSON.stringify(DetectRTC.browser.name).slice(1, -1) + " " + JSON.stringify(DetectRTC.browser.version)} </span>
              </li> */}
              <li class="test">
                <span><b>Internet Speed:</b> {"- " + sessionStorage.getItem("netspeed") + " mbps"} </span>
              </li>
              <li class="test">
                <span><b>Mobile Camera:</b> {"- " + JSON.stringify(DetectRTC.isWebsiteHasWebcamPermissions)} </span>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>


      <center>
        <Button

          className="activateButton"
          variant="contained"
          color="secondary"
          onClick={handleClick}>
          Activate Your Mobile Camera and Network Check
        </Button>
        <br />
        <br />
      </center>


      <center>
        <Button
          size="large"
          disabled={buttonViewDisabled}
          variant='contained'
          color="primary"
          onClick={openFullscreen}
          style={{ margin: '10px 0' }}>
          Next
        </Button>
      </center>

    </div></>


  )
}


export default SystemCheck;