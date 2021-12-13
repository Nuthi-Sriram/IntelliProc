
import React, { useState } from 'react';
import firebase from "firebase/app";
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import "./formvalid.css"
import styles from './../styles.module.css';
import logo from './../logo.png';
import background from './../bg_images/bg5.jpg';
import swal from 'sweetalert';

const Formvalid = () => {
  const history = useHistory();

  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }

  const [formvalid, setFormvalid] = useState('');


  function onChangeformvalid(e) {
    setFormvalid(e.target.value);
  }



  function handleClickformvalid() {
    //console.log(formvalid)
    const con_db = firebase.database().ref("con_dbs");

    //console.log(Object.keys(con_db))
    con_db.on('value', (snapshot) => {
      var s = snapshot.val()
      var d = s[formvalid]

      if (d != null) {
        var form_link = d["formlink"]
        var exam_timer = d["examtimer"]
        //console.log(exam_timer);
        //console.log(form_link);
        sessionStorage.setItem("form_link", form_link);
        sessionStorage.setItem("exam_timer", exam_timer);
        sessionStorage.setItem("formvalid", formvalid);

        history.push("/Dashboard");
      }
      else {
        swal("Invalid Exam Code", "Please Enter A Valid Examcode", "error");
      }

    });
  };

  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}> </div>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
        <h2 style={{ color: 'white' }}>
          <i>Welcome Student!</i>
        </h2><br />

        <div style={{ padding: '0 63px' }}>
          <label style={{ color: 'white', fontSize: '20px' }}>Enter exam code to proceed: </label>
          <input type="text"
            name="formvalid"
            id="formvalid"
            placeholder="Exam Code"
            value={formvalid}
            onChange={onChangeformvalid}
            class="form-control-lg"
            autofocus />
          <br /><br />


          <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '30px 0' }}>
            <button class="btn btn-primary" onClick={handleClickformvalid} style={{ width: '100%' }}>Submit</button>
          </div>
        </div>

      </div></>

  )
}

export default Formvalid;