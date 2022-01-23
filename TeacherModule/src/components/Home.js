//import config from "../config";
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import logo from './../logo.png';
import './../App.css';
import styles from './../styles.module.css';
import background from './../bg_images/bg2.jpg';
//import { Redirect } from "react-router-dom";
//import { AuthContext } from "./Auth";
import Button from '@material-ui/core/Button';

const MainPage = () => {

  const history = useHistory();

  function handleClickAdmin() {
    history.push("/adminsignin")

  }

  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}>

    </div>
      <header className={styles.appHeader}>

        <img src={logo} alt="logo" height="250" margin="0" className={styles.circle} /><br />
        <p>Welcome to IntelliProc</p>
        <small>Dual camera based proctoring system</small><br /><br />

        {/* <Button id="homeButtons" style={{ fontSize: '15px' }} variant="contained" size="medium" onClick={handleClick}>Start Mobile Proctoring</Button> */}
        <Button id="homeButtons" variant="contained" onClick={handleClickAdmin}>Teacher Dashboard</Button>
        {/* <Button id="homeButtons" variant="contained" onClick={headpose}>Headpose</Button> */}
      </header></>
  );
}

export default MainPage;