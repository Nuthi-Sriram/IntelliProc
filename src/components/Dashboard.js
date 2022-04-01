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
import { Container, Row, Col } from 'react-bootstrap';
import { MdLogout } from 'react-icons/md';
import background from './../bg_images/bg18.png';
import logo from './../logo.png';
import styles from './../styles.module.css';

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
    /*if (document.hidden) {
      //swal("Changed Tab Detected", "Action has been Recorded", "error");
      swal({
        title: 'Changed Tab Detected',
        text: 'Action has been Recorded',
        icon: 'error'
      }).then(function() {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { // Safari //
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE11
          elem.msRequestFullscreen();
        }
        // the page is hidden
        setcount_tabchange(count_tabchange + 1);
        sessionStorage.setItem("count_tabchange", count_tabchange);
      });
    } else {
      // the page is visible
    }*/
  }
  document.addEventListener("visibilitychange", handleVisibilityChange, false);

  //To make sure the user does not open any other App or lose Focus from the test Window
  var i = 0;
  const history = useHistory();

  function onAccept() {
    history.push('/thankyou')
  }

  var elem = document.documentElement;

  /*// Exit full screen alert
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
        } else if (elem.webkitRequestFullscreen) { // Safari
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE11
          elem.msRequestFullscreen();
        }
        setcount_fullscreen(count_fullscreen + 1);
        sessionStorage.setItem("count_fullscreen", count_fullscreen);
      });

      //swal("Exited full screen", "Action has been Recorded", "error");
      // history.push("/fullscreenalert");
    }

  });*/

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

  function logout() {
    localStorage.clear();
    window.location.href = '/';
};

  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}></div>

      <header className={styles.studentheader}>
        <div className={styles.menu} style={{ float: 'left', padding: '5px 0 5px 5%' }} >
          <img src={logo} alt="logo" height="60" className={styles.navcircle} />
          <h2 className={styles.navtitle}><i>Intelliproc</i></h2>
        </div>
        <nav id="nav-bar" className={styles.navbar}>
          <div className={styles.menu}>
            <a onClick={logout}>LogOut <MdLogout /></a>
          </div>
        </nav>
      </header>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}  className={styles.studentAppHeader}>
        <div className={styles.firstcolumn} style={{ width:'65%' }}>
          <center>
            <div>
              <h2 class="givecolor">{sessionStorage.getItem("formvalid")}</h2>
            </div>
              jdhsfyukj  uw gfuyjdhh
          </center>
        </div>

        <div style={{ width:'35%', display: 'flex', flexDirection: 'column' }}>
          <div className={styles.subcolumn}>
            <center>
              <div style={{ backgroundColor: 'gray' }}>
                <p>{minutes === 0 && seconds === 1 ? null : <h1 align="center" style={{ fontSize: '40px' }}>  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                } </p>
              </div>
            </center>
          </div>

          <div className={styles.subcolumn}>
            <center>
              <div className="detect" style={{ margin: '0 auto' }}>
                <center>
                {/* Detection Section Starts here*/}
                <Detection>

                </Detection>
                {/*Detection Section ends here */}
                </center>
              </div>
            </center>
          </div>
        </div>
      </div></>
  )
}

export default Dashboard;