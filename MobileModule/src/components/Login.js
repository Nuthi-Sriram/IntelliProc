import React from 'react';
import { useHistory } from 'react-router-dom'
import auth from './Auth';
import swal from 'sweetalert';
import styles from './../styles.module.css';
import logo from './../logo.png';
import background from './../bg_images/bg1.jpg';
import { GoogleLogin } from 'react-google-login'

const client_id = "1055373727921-fh700o9ekcphgpkheb2op7pbodna7n16.apps.googleusercontent.com"

const LoginPage = () => {


  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }


  const onSuccess = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //console.log('Name: ' + profile.getName());
    var checkname = profile.getName();
    sessionStorage.setItem("checkname", checkname);
    //console.log('Image URL: ' + profile.getImageUrl());
    //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var checkemail = profile.getEmail();
    sessionStorage.setItem("checkemail", checkemail);

    auth.login(() => {
      history.push("/systemcheck")
    });
  };

  const onFaliure = (res) => {
    swal("Login Failed", "Kindly try again using Google Account", "error");
    console.log('[Login Success] res:', res);
  };

  const history = useHistory();


  return (
    <div>
      <head>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="1055373727921-fh700o9ekcphgpkheb2op7pbodna7n16.apps.googleusercontent.com"></meta>
      </head>

      <div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}> </div>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" height="250" margin="0" className={styles.circle} /><br />
        <h2 style={{ color: 'white' }}>Sign In</h2>
        <small>
          Use your Gmail account
        </small><br /><br />

        <GoogleLogin
          clientId={client_id}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFaliure}
          prompt="select_account"
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
      </div>
    </div>
  );
}

export default LoginPage;