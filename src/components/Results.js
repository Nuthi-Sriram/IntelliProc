import React from 'react'
import firebase from "firebase/app";
import { Button } from '@material-ui/core';
import './Results.css';
import logo from './../logo.png';
import styles from './../styles.module.css';
import background from './../bg_images/bg7.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

class Results extends React.Component {


constructor(props) {
    super(props);
    this.state = {studentslist : []}
    }

  componentDidMount() {
  var  childcode = sessionStorage.getItem("inputcode");
  //console.log("Checktable", childcode);
   
      firebase.database().ref("stud_records").child(childcode).on("value", snapshot => {
     
        let studentlist = [];
        snapshot.forEach(snap => {
        // snap.val() is the dictionary with all your keys/values from the 'stud_records' path
            studentlist.push(snap.val());
            //console.log("Chekit" ,studentlist);
        });
        this.setState({ studentslist: studentlist });
      });     
 }


GoToAdmin() {
        localStorage.clear();
        window.location.href = '/admin';
    }

  render(){
  return (
    <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}></div>
    <div className={styles.fullScreenHeader}>
    <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
      <div class="givecolor">
        <h3>CHEAT SCORE RECORDS</h3><br/>
      </div>

      <div className="container">
        <table id="example" class="display table">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Alt</th>
              <th>Face</th>
              <th>Fullscreen</th>
              <th>Tab</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.studentslist.map(data => {
              var base64 = data.photo;
              //console.log("show name", base64);
              return (
                <tr className="pool">
                  <td>{data.sname}</td>
                  <td>{data.semail}</td>
                  <td>{data.alt}</td>
                  <td>{data.face}</td>
                  <td>{data.fullscreen}</td>
                  <td>{data.tab}</td>
                  <td> {<img src={data.photo} width="150px" height="100px" />}
                  </td>
                </tr>
              );
            })}

          </tbody>

        </table>
      </div>
      <div className="center-block"><Button onClick={this.GoToAdmin} variant="contained" color="primary"> Return To Admin </Button></div>
    </div></>
     
  );
}
}

export default Results;