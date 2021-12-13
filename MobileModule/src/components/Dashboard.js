import React from 'react';
import { useState, useEffect } from 'react';
import Detection from './Detections';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DetectRTC from 'detectrtc';
import swal from 'sweetalert';
import exam_timer from './formvalid';
import formvalid from './formvalid';
import firebase from "firebase/app";
import "./Dashboard2.css";

// var checkn = "";
// var checke = "";


const Dashboard = (props) => {



  var countalt = 0;
  var countctrl = 0;

  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }

  // Alert on Tab Changed within the Same browser Window
  function handleVisibilityChange() {
    if (document.hidden) {
      var count_tabchange = 0;
      swal("Changed Tab Detected", "Action has been Recorded", "error");
      // the page is hidden
      count_tabchange = count_tabchange + 1
      sessionStorage.setItem("count_tabchange", count_tabchange);
    } else {
      // the page is visible
    }
  }
  document.addEventListener("visibilitychange", handleVisibilityChange, false);

  //To make sure the user does not open any other App or lose Focus from the test Window
  var i = 0;

  const history = useHistory();

  function onAccept() {
    history.push('/thankyou')
  }

  // Count number of times escaped Fullscreen

  /*if (document.fullscreenElement) {
    //console.log("In Full");
  } else {
    history.push('fullscreenalert')
  }*/

  document.addEventListener('fullscreenchange', (event) => {
    var count_fullscreen = 0;
    if (document.fullscreenElement) {
      // console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
    } else {
      history.push("/fullscreenalert")
      count_fullscreen = count_fullscreen + 1;
      sessionStorage.setItem("count_fullscreen", count_fullscreen);
      //console.log(count_fullscreen)
    }

  });

  document.onkeydown = function (event) {
    //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
    if (event.altKey) {
      countalt = countalt + 1;
      sessionStorage.setItem("countalt", countalt);
      swal('Alt Keypress Detected');
      return false;
    }
    else if (event.ctrlKey) {
      countctrl = countctrl + 1;
      sessionStorage.setItem("countctrl", countctrl);
      swal('Ctrl Keypress Detected');
      return false;
    }
    else {
      sessionStorage.setItem("countalt", countalt);
      sessionStorage.setItem("countctrl", countctrl);
      return true;
    }
  }

  //Displays Score in Thankyou page
  function handleClicksub() {
    var PIDs = sessionStorage.getItem("checkname")
    //console.log(PIDs)
    var count_multipleFace = sessionStorage.getItem("count_multipleFace")
    var count_fullscreen = sessionStorage.getItem("count_fullscreen")
    var count_tabchange = sessionStorage.getItem("count_tabchange")
    var count_phone = sessionStorage.getItem("count_phone")
    var count_book = sessionStorage.getItem("count_book")
    var count_laptop = sessionStorage.getItem("count_laptop")
    var count_noFace = sessionStorage.getItem("count_noFace")
    var countalt = sessionStorage.getItem("countalt")
    var countctrl = sessionStorage.getItem("countctrl")
    var checkn = sessionStorage.getItem("checkname")
    var checke = sessionStorage.getItem("checkemail")
    var photo = sessionStorage.getItem("imageSrc")
    //Fetching data from FireBase
    const con_db = firebase.database().ref("studmobile_records");
    // const con_db2 = firebase.database().ref("studmobile_records");
    con_db.on('value', (snapshot) => {


      var s = snapshot.val()
      var codeexam = sessionStorage.getItem("formvalid", formvalid);
      //var codeexam =  s[d]
      //console.log(s)
      con_db.child(codeexam).child(PIDs).set({
        tab: count_tabchange,
        fullscreen: count_fullscreen,
        phone: count_phone,
        book: count_book,
        laptop: count_laptop,
        noFace: count_noFace,
        face: count_multipleFace,
        alt: countalt,
        ctrl: countctrl,
        semail: checke,
        sname: checkn,
        photo: photo

      })
    });

    // con_db2.on('value', (snapshot) => {


    //   var s = snapshot.val()
    //   var codeexam = sessionStorage.getItem("formvalid", formvalid);
    //   //var codeexam =  s[d]
    //   //console.log(s)
    //   con_db2.child(codeexam).child(PIDs).set({

    //     fullscreen: count_fullscreen,
    //     phone: count_phone,
    //     book: count_book,
    //     laptop: count_laptop,
    //     semail: checke,
    //     sname: checkn,
    //     photo: photo

    //   })
    // });

    history.push('/thankyou')
  };


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


  // enable/disable iframe according to camera permissions
  const webcam = DetectRTC.isWebsiteHasWebcamPermissions;


  if (webcam === true) {

  }
  else {
    var isAllowed = '/components/404.js';
    swal("Enable Your Camera");
  }

  // Fetches the timer provided by Admin in Admin page to Dashboard
  var get_time = sessionStorage.getItem("exam_timer");
  var get_sec = sessionStorage.getItem("exam_sec");
  if (get_sec === null) {
    get_sec = 0;
  }
  const { initialMinute = get_time, initialSeconds = get_sec } = props;
  const myInterval = React.useRef();
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        var currectSec = seconds;
        sessionStorage.setItem("exam_sec", currectSec);
      }
      else {
        var currectTime = minutes - 1;
        sessionStorage.setItem("exam_timer", currectTime);
        setMinutes(minutes - 1);
        setSeconds(59);

      }

      if (minutes === 1 && seconds === 0) {
        swal("Only 1 Minute Left, Please Submit or else Answers WONT BE SAVED ");
      }

      if (seconds <= 0 && minutes <= 0) {
        history.push('/thankyou');
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return (


    <div className="App-header" id="Dash">

      <header>

        <div className="detect">
          {/* Detection Section Starts here*/}
          <Detection>

          </Detection>
          {/*Detection Section ends here */}
        </div>

        <div className="lame">
          <h3 align="left">Name :  <span style={{ fontSize: '20px' }} > {JSON.stringify(sessionStorage.getItem("checkname")).slice(1, -7)}</span></h3>
          <h3 align="left">PID :  <span style={{ fontSize: '20px' }} > {JSON.stringify(sessionStorage.getItem("checkname")).slice(-7).slice(0, -1)}</span></h3>
        </div>

        <div className="leftClass">
          <p>Timer: {minutes === 0 && seconds === 1 ? null : <h1 align="center" style={{ fontSize: '69px' }}>  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
          } </p>
        </div>

        <div className="button">

          <center>
            <Button
              style={{ fontSize: '15px' }}
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleClicksub}>
              End proctoring
            </Button>
          </center>
          {/* <br/> */}

        </div>



        {/* <iframe src={isAllowed} id='form'>Loading…</iframe > */}

      </header>

    </div>
  )
}

export default Dashboard;
