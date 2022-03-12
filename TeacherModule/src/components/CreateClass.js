import React, { useState } from 'react';
//import config from "../config";
import firebase from "firebase/app";
import './Results.css';
import styles from './../styles.module.css';
import logo from './../logo.png';
import background from './../bg_images/bg17.jpg';
import swal from 'sweetalert';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const CreateClass = () => {
  const history = useHistory();
  const [classname, setClassname] = useState('')

  const onChangeClassname = (e) => {
    setClassname(e.target.value);
  };

  function create() {
    const con_db = firebase.database().ref("class_records");
    if(classname=='')
      swal("Please enter a non-empty class name!");
    else {
    con_db.on('value', (snapshot) => {
      var s = snapshot.val()
      console.log(s)
      con_db.child(classname).set({
        classname: classname,
        studentcount: 0
      });
      sessionStorage.setItem("classname", classname);
      sessionStorage.setItem("studentcount", 0);
      history.push(`/viewclass/${classname}`)
    });
  }
}

  function back() {
    history.push('/dashboard');
  }

  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}> </div>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
        <h2 style={{ color: 'white' }}>
          <i>Class Creation!</i>
        </h2><br />

        <div style={{ padding: '0 63px' }}>
          <label style={{ color: 'white', fontSize: '20px' }}>Enter class name: </label>
          <input type="text"
            name="classname"
            id="classname"
            placeholder="Enter class name"
            value={classname}
            onChange={onChangeClassname}
            className="form-control-lg"
            required
            autoFocus />
          <br /><br />

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
            <button class="btn btn-primary" onClick={back} ><FaAngleLeft /> Back</button>
            <button class="btn btn-success" onClick={create} >Create <FaAngleRight /></button>
          </div>
        </div>

      </div></>

  )
}

export default CreateClass;