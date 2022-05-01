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
import Card from 'react-bootstrap/Card';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdLogout } from 'react-icons/md';
import background from './../bg_images/bg18.png';
import logo from './../logo.png';
import styles from './../styles.module.css';
var questionlist, temp = 0, select = '', nulls = [], selected_answers = [];

const Dashboard = (props) => {

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

  firebase.database().ref("exam_records").child(sessionStorage.getItem("formvalid")).child("questions").on("value", snapshot => {
    questionlist = [];
    snapshot.forEach(snap => {
      // snap.val() is the dictionary with all your keys/values from the 'exam_records' path
      questionlist.push(snap.val());
    });
  });

  useEffect(() => {
    for (let i = 0; i < questionlist.length; i++) {
      nulls.push('');
    }
  });

  const [question, setquestion] = useState(questionlist[0].question);
  const [image_question, setimage_question] = useState(questionlist[0].imagequest);
  const [opt1, setopt1] = useState(questionlist[0].option1);
  const [opt2, setopt2] = useState(questionlist[0].option2);
  const [opt3, setopt3] = useState(questionlist[0].option3);
  const [opt4, setopt4] = useState(questionlist[0].option4);
  const [index, setindex] = useState(0);
  const [options, setOptions] = useState(nulls);

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
      }).then(function () {
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
    }
  }
  document.addEventListener("visibilitychange", handleVisibilityChange, false);

  //To make sure the user does not open any other App or lose Focus from the test Window
  var i = 0;
  const history = useHistory();

  function onAccept() {
    history.push('/thankyou')
  }

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
      }).then(function () {
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

    selected_answers = [];
    var final_result = 0;
    firebase.database().ref("stud_records").child(sessionStorage.getItem("formvalid")).child(PIDs).child("answers").on("value", snapshot => {
      snapshot.forEach(snap => {
        selected_answers.push(snap.val());
      });
      console.log("selected answers: ", selected_answers);
      for (let i = 0; i < questionlist.length; i++) {
        if (selected_answers[i] && questionlist[i].answer == selected_answers[i].selected) {
          final_result += parseInt(questionlist[i].marks);
          console.log("quest, ", questionlist[i].marks);
          console.log("Hello, ", final_result);
        }
      }
      sessionStorage.setItem("FinalResult", final_result);
      const con_db = firebase.database().ref("stud_records");
      var codeexam = sessionStorage.getItem("formvalid");
      con_db.child(codeexam).child(PIDs).update({
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
        audiorec: audiorec,
        result: final_result
      });
      history.push('/thankyou');
    })

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

  useEffect(() => {
    setindex(temp);
    setquestion(questionlist[temp].question);
    setimage_question(questionlist[temp].imagequest);
    setopt1(questionlist[temp].option1);
    setopt2(questionlist[temp].option2);
    setopt3(questionlist[temp].option3);
    setopt4(questionlist[temp].option4);
  }, [temp]);

  useEffect(() => {
    options[index] = select;
  }, [select]);

  function previous() {
    temp = index - 1;
  }

  function next() {
    temp = index + 1;
  }

  function handleOptionChange(changeEvent) {
    select = changeEvent.target.value;
    var PIDs = sessionStorage.getItem("checkname");
    const con_db = firebase.database().ref("stud_records");
    var codeexam = sessionStorage.getItem("formvalid");
    con_db.child(codeexam).child(PIDs).child("answers").child(question).update({
      selected: select,
    })
  }

  function onChangeQuestionNav(ind) {
    temp = ind;
  }

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

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className={styles.studentAppHeader}>
        <div className={styles.firstcolumn} style={{ width: '70%' }}>
          <center>
            <div>
              <h2 class="givecolor">{sessionStorage.getItem("formvalid")}</h2>
            </div><br />

            <Row>
              <Col xs={1}></Col>
              <Col xs={10}>

                <div>
                  <Card style={{ maxHeight: '62vh' }}>
                    <Card.Header as="h5" style={{ backgroundColor: '#373b40', maxHeight: '40vh' }}>
                      {image_question
                        ? <Row>
                          <Col xs={5} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>{question}</Col>
                          <Col xs={7}><img style={{ width: '100%', maxHeight: '35vh', borderRadius: '5px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} src={image_question} /></Col>
                        </Row>
                        : <Row>{question}</Row>
                      }
                    </Card.Header>
                    <Card.Body style={{ backgroundColor: '#d7dcdf' }}>
                      <div style={{ textAlign: 'left', fontSize: 'large' }}>
                        <Card.Text style={{ color: 'black' }}>
                          <div class="form-group">
                            <label>
                              {options[index] === opt1
                                ? <input name="options" value={opt1} type="radio" class="input-radio" checked={true} />
                                : <input name="options" value={opt1} type="radio" class="input-radio" onChange={handleOptionChange} />
                              } &ensp;{opt1}
                            </label><br />
                            <label>
                              {options[index] === opt2
                                ? <input name="options" value={opt2} type="radio" class="input-radio" checked={true} />
                                : <input name="options" value={opt2} type="radio" class="input-radio" onChange={handleOptionChange} />
                              } &ensp;{opt2}
                            </label><br />
                            <label>
                              {options[index] === opt3
                                ? <input name="options" value={opt3} type="radio" class="input-radio" checked={true} />
                                : <input name="options" value={opt3} type="radio" class="input-radio" onChange={handleOptionChange} />
                              } &ensp;{opt3}
                            </label><br />
                            <label>
                              {options[index] === opt4
                                ? <input name="options" value={opt4} type="radio" class="input-radio" checked={true} />
                                : <input name="options" value={opt4} type="radio" class="input-radio" onChange={handleOptionChange} />
                              } &ensp;{opt4}
                            </label><br />
                          </div>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
                  {index > 0
                    ? <button class="btn btn-primary" onClick={previous}><FaAngleLeft /> Previous</button>
                    : <button class="btn btn-primary" disabled><FaAngleLeft /> Previous</button>}
                  {index < questionlist.length - 1
                    ? <button class="btn btn-primary" onClick={() => next()}>Next <FaAngleRight /></button>
                    : <button class="btn btn-success" onClick={() => handleClicksub()}>Submit <FaAngleRight /></button>}
                </div>
              </Col>
              <Col xs={1}></Col>
            </Row>

          </center>
        </div>

        <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
          <div className={styles.subcolumn}>
            <center>
              <div style={{ backgroundColor: 'gray', borderRadius: '5px', border: '1px solid darkgrey' }}>
                {minutes === 0 && seconds === 1 ? null : <h1 align="center" style={{ fontSize: '40px' }}>  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '35px 0' }}>
                {questionlist.map((_, index) => {
                  return (
                    <span>
                      {options[index]
                        ? <span onClick={() => onChangeQuestionNav(index)} style={{ padding: '22px 26px', margin: '5px', backgroundColor: 'green', border: '2px solid darkgreen', borderRadius: '5px', color: 'white', fontSize: '22px', cursor: 'pointer' }} >{index}</span>
                        : <span onClick={() => onChangeQuestionNav(index)} style={{ padding: '22px 26px', margin: '5px', backgroundColor: '#b9e0f9', border: '2px solid #0a4c75', borderRadius: '5px', color: 'black', fontSize: '22px', cursor: 'pointer' }} >{index}</span>
                      }
                    </span>
                  );
                })}
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

                  <div style={{ backgroundColor: 'gray', borderRadius: '5px', border: '1px solid darkgrey', marginTop: '300px', width: '100%' }}>
                    <h1 align="center" style={{ fontSize: '35px' }}>{sessionStorage.getItem("checkname")}</h1>
                  </div>
                </center>
              </div>
            </center>
          </div>
        </div>
      </div></>
  )
}

export default Dashboard;