import React, { useState } from 'react';
import firebase from "firebase/app";
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import styles from './../styles.module.css';
import logo from './../logo.png';
//import { Redirect } from "react-router-dom";
import swal from 'sweetalert';
const CodeCheck = () => {
  const history = useHistory();
    const [inputcode, setInputcode] = useState('');

    function onChangeInputcode(e) {
    setInputcode(e.target.value);
  }
   var code_exist = false;
  
  
    function Getdata() {
        const res = firebase.database().ref("stud_records").once('value',(snapshot)=>{
        snapshot.forEach(function(snapshot) {

            var childKey = snapshot.key;
            //console.log("check childkey", childKey)
            if(childKey === inputcode)
            {
              sessionStorage.setItem("inputcode", inputcode);
              //console.log("Show sucess" ,childKey);
              code_exist = true;
              swal("Success");
              history.push("/results"); 
            }
          }); 
          if(code_exist === false){
            swal("Incorrect Code");
          }        
      });      
    }
  

    return (
    <><div className={styles.bg}></div>
    <div className={styles.appHeader}>
      <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
      <h2 style={{ color: 'white' }}><i>Verify Exam Code!</i></h2><br/>
      <label style={{ color: 'white', fontSize: '20px' }}>Enter exam code: </label>
      <input type="text" name="inputcode" id="inputcode" onChange={onChangeInputcode} class="form-control-lg" value={inputcode} placeholder="Exam Code"></input>
      <br></br>
      <button class="btn btn-primary" onClick={Getdata}>Submit</button>
    </div></>

  )
}

export default CodeCheck;