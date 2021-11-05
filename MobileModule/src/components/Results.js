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
    this.state = {
      studentslist: [],
      studentsmobilelist: []
    }
  }

  componentDidMount() {
    var childcode = sessionStorage.getItem("inputcode");
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


    firebase.database().ref("studmobile_records").child(childcode).on("value", snapshot => {

      let studentmobilelist = [];
      snapshot.forEach(snap => {
        // snap.val() is the dictionary with all your keys/values from the 'stud_records' path
        studentmobilelist.push(snap.val());
        //console.log("Chekit" ,studentlist);
      });
      this.setState({ studentsmobilelist: studentmobilelist });
    });
  }


  GoToAdmin() {
    localStorage.clear();
    window.location.href = '/admin';
  }

  render() {
    return (
      <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}></div>
        <div className={styles.resultsHeader}>
          <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
          <div class="givecolor">
            <h3>CHEAT SCORE FOR LAPTOP RECORDS</h3><br />
          </div>

          <div style={{ margin: '0 10px' }}>
            <table id="example" class="display table">
              <thead class="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>ExitFullScreen</th>
                  <th>Phone</th>
                  <th>Book</th>
                  <th>Laptop</th>
                  <th>noFace</th>
                  <th>MultipleFace</th>
                  <th>Alt</th>
                  <th>ctrl</th>
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
                      <td>{data.fullscreen}</td>
                      <td>{data.phone}</td>
                      <td>{data.book}</td>
                      <td>{data.laptop}</td>
                      <td>{data.noFace}</td>
                      <td>{data.face}</td>
                      <td>{data.alt}</td>
                      <td>{data.ctrl}</td>
                      <td> {<img src={data.photo} alt="Student Identification" width="150px" height="100px" style={{ borderRadius: '5px' }} />}
                      </td>
                    </tr>
                  );
                })}

              </tbody>

            </table>
          </div>

          <div class="givecolor">
            <h3>CHEAT SCORE FOR MOBILE RECORDS</h3><br />
          </div>

          <div style={{ margin: '0 10px' }}>
            <table id="example" class="display table">
              <thead class="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>ExitFullScreen</th>
                  <th>Phone</th>
                  <th>Book</th>
                  <th>Laptop</th>
                  <th>Device Photo</th>
                </tr>
              </thead>
              <tbody>
                {this.state.studentsmobilelist.map(data => {
                  var base64 = data.photo;
                  //console.log("show name", base64);
                  return (
                    <tr className="pool">
                      <td>{data.sname}</td>
                      <td>{data.semail}</td>
                      <td>{data.fullscreen}</td>
                      <td>{data.phone}</td>
                      <td>{data.book}</td>
                      <td>{data.laptop}</td>
                      <td>{data.face}</td>

                      <td> {<img src={data.photo} alt="Presence of laptop" width="150px" height="100px" style={{ borderRadius: '5px' }} />}
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