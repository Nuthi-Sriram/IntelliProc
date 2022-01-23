import React from 'react'
import styles from './../styles.module.css';
import logo from './../logo.png';
import background from './../bg_images/bg2.jpg';

const PageNotFound = () => {

  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }

  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}></div>
      <header className={styles.appHeader}>

        <img src={logo} alt="logo" height="250" margin="0" className={styles.circle} /><br />
        <h2> 404 </h2>
        <small> Page Not Found </small><br />
        <p style={{ padding: '30px', textAlign: 'center', fontSize: '20px' }}>The Specified file was not found on the website. Please check the URL for mistakes and try again.</p>
      </header></>
  )
}

export default PageNotFound;