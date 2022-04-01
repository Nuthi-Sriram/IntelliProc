// Import necessary modules
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

const Dashboard = (props) => {

  var form_link = sessionStorage.getItem("form_link");

  const [countalt, setcountalt] = useState(0);
  const [countctrl, setcountctrl] = useState(0);
  const [countmeta, setcountmeta] = useState(0);
  const [count_tabchange, setcount_tabchange] = useState(0);
  const [count_fullscreen, setcount_fullscreen] = useState(0);

  sessionStorage.setItem("countalt", countalt);
  sessionStorage.setItem("countctrl", countctrl);
  sessionStorage.setItem("countmeta", countmeta);
  sessionStorage.setItem("count_tabchange", count_tabchange);
  sessionStorage.setItem("count_fullscreen", count_fullscreen);

  // Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }

  // Alert on Tab Changed within the Same browser Window
  function handleVisibilityChange() {
    if (document.hidden) {
      //swal("Changed Tab Detected", "Action has been Recorded", "error");
      swal({
        title: 'Changed Tab Detected',
        text: 'Action has been Recorded',
        icon: 'error'
      }).then(function() {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
        // the page is hidden
        setcount_tabchange(count_tabchange + 1);
        sessionStorage.setItem("count_tabchange", count_tabchange);
      });
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

  var elem = document.documentElement;

  // Exit full screen alert
  document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
      // console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
    } else {
      swal({
        title: 'Exited full screen',
        text: 'Action has been Recorded',
        icon: 'error'
      }).then(function() {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
        setcount_fullscreen(count_fullscreen + 1);
        sessionStorage.setItem("count_fullscreen", count_fullscreen);
      });

      //swal("Exited full screen", "Action has been Recorded", "error");
      // history.push("/fullscreenalert");
      
      //console.log(count_fullscreen)
    }

  });

  // Detect usage of keyboard shortcuts
  document.onkeydown = function (event) {
    //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
    if (event.altKey) {
      setcountalt(countalt + 1);
      sessionStorage.setItem("countalt", countalt);
      swal('Alt Keypress Detected');
      return false;
    }
    else if (event.ctrlKey) {
      setcountctrl(countctrl + 1);
      sessionStorage.setItem("countctrl", countctrl);
      swal('Ctrl Keypress Detected');
      return false;
    }
    else if (event.metaKey) {
      setcountmeta(countmeta + 1);
      sessionStorage.setItem("countmeta", countmeta);
      swal('Meta Keypress Detected');
      return false;
    }
    else {
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
    var count_left = sessionStorage.getItem("count_left")
    var count_right = sessionStorage.getItem("count_right")
    var countalt = sessionStorage.getItem("countalt")
    var countctrl = sessionStorage.getItem("countctrl")
    var countmeta = sessionStorage.getItem("countmeta")
    var checkn = sessionStorage.getItem("checkname")
    var checke = sessionStorage.getItem("checkemail")
    var photo = sessionStorage.getItem("imageSrc")
    var audiorec = sessionStorage.getItem("audiorec")

    // Execute (1)
    // var getImageUrl = function (time) {
    //   // Execute (2)
    //   var returnVal;
    //   // Execute (3)
    //   storage.ref('audio/' + time + '.mp3').getDownloadURL().then(function (url) {
    //     // Execute (unknown)
    //     returnVal = url;
    //   });
    //   // Execute (4)
    //   return returnVal;
    // };
    // console.log(getImageUrl+"output link");
    // var audiorec=getImageUrl
    //Fetching data from FireBase
    const con_db = firebase.database().ref("stud_records");
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
        left: count_left,
        right: count_right,
        face: count_multipleFace,
        alt: countalt,
        ctrl: countctrl,
        meta: countmeta,
        semail: checke,
        sname: checkn,
        photo: photo,
        audiorec: audiorec
      })
    });

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
    var isAllowed = sessionStorage.getItem("form_link");;
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
          <p align="center" style={{ fontSize: '18px' }}>To Save Your Attendance :<br /> Kindly Click <strong>Exit Exam Window</strong> After Submission Of Google Form </p>
          <center>
            <Button
              style={{ fontSize: '15px' }}
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleClicksub}>
              Exit Exam Window
            </Button>
          </center>
          {/* <br/> */}
          <p align="left" style={{ fontSize: '18px' }}><i>DONOT ESCAPE THIS PAGE ELSE ANSWERS WILL BE UNSAVED!!</i></p>
        </div>

        <iframe src={isAllowed} id='form'>Loading…</iframe >

      </header>

    </div>
  )
}

export default Dashboard;