import config from "../config";
import React, { useState } from "react";
//import TextField from "@material-ui/core/TextField";
//import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';
import './Results.css';
import styles from './../styles.module.css';
import logo from './../logo.png';
//import Button from '@material-ui/core/Button';
import firebase from "firebase/app";
// import Button from '@material-ui/core/Button';
require('firebase/auth')


const AdminSignIn = () => {
 
  const [currentUser, setCurrentUser] = useState(null);    
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {
      config.auth().signInWithEmailAndPassword(email.value, password.value).then((u)=>{
        setCurrentUser(true);
      }).catch((error) =>
      {
        swal("Please Contact Admin To Register");
      });    
      
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
      return <Redirect to="/admin" />;
  }

  // const handleLogout=() =>{
  //   config.auth.signOut();
  // };
   
  return (
    <><div className={styles.bg}>

    </div>
        <div className={styles.appHeader}>
          <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
          <h2 style={{ color: 'white' }}>Sign In</h2><br />
          <form onSubmit={handleSubmit}>
            <label for="email" style={{ color: 'white', fontSize: '20px' }}>Email: </label><br />
            <input type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              class="form-control-lg"
              autocomplete="email"
              autofocus placeholder="Enter email" />
            <br/><br />
            <label for="password" style={{ color: 'white', fontSize: '20px' }}>Password: </label><br />
            <input type="password"
              name="password"
              id="password"
              placeholder="Password"
              autocomplete="current-password"
              class="form-control-lg" placeholder="Password" />
            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0'}}>
              <button type="reset" class="btn btn-primary">Reset</button>
              <button type="submit" class="btn btn-success">Submit</button>
              {/* <input type="submit" class="btn btn-success"/> */}
            </div>
          </form>
      </div></>
  );
}


export default AdminSignIn;
