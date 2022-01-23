import React, { useState } from 'react';
//import config from "../config";
import firebase from "firebase/app";
import './Results.css';
import styles from './../styles.module.css';
import logo from './../logo.png';
import background from './../bg_images/bg5.jpg';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const Admin = () => {
  const history = useHistory();

  const [examcode, setTitle] = useState('')
  const [formlink, setFormlink] = useState('')
  const [examtimer, setTimer] = useState('')

  const onChangeexamcode = (e) => {
    setTitle(e.target.value);
  };
  const onChangeformlink = (e) => {
    setFormlink(e.target.value);
  };
  const onChangeTimer = (e) => {
    setTimer(e.target.value);
  };

  function handleClicksub() {

    const con_db = firebase.database().ref("con_dbs");

    con_db.on('value', (snapshot) => {
      var s = snapshot.val()
      console.log(s)
      con_db.child(examcode).set({
        formlink: formlink,
        examtimer: examtimer
      });
      alert("The form was submitted");
      history.push("/");

    });
  }

  function results() {
    history.push('/codecheck');
  }

  function logout() {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}> </div>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
        <h2 style={{ color: 'white' }}>
          <i>Welcome Teacher!</i>
        </h2><br />

        <div style={{ padding: '0 63px' }}>
          <label style={{ color: 'white', fontSize: '20px' }}>Unique code for the exam: </label>
          <input type="text"
            name="examcode"
            id="examcode"
            placeholder="Enter the Code"
            value={examcode}
            onChange={onChangeexamcode}
            class="form-control-lg"
            autofocus />
          <br /><br />

          <label style={{ color: 'white', fontSize: '20px' }}>Examination form Link: </label>
          <input type="text"
            name="formlink"
            id="formlink"
            placeholder="Form Link"
            value={formlink}
            onChange={onChangeformlink}
            class="form-control-lg" />
          <br /><br />

          <label style={{ color: 'white', fontSize: '20px' }}>Exam Duration (in minutes): </label>
          <input type="number"
            name="examtimer"
            id="examtimer"
            min="2"
            placeholder="Exam Duration"
            value={examtimer}
            onChange={onChangeTimer}
            class="form-control-lg" />
          <br /> <br />

          <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '30px 0' }}>
            <button class="btn btn-primary" onClick={handleClicksub} style={{ width: '100%' }}>Create Test</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
            <button class="btn btn-success" onClick={results} >Test Results</button>
            <button type="logout" class="btn btn-danger" onClick={logout} >LogOut</button>
          </div>
        </div>

      </div></>

  )
}

export default Admin;