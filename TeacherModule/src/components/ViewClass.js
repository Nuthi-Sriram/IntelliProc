import React,{ useState } from 'react'
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import './Results.css';
import logo from './../logo.png';
import styles from './../styles.module.css';
import background from './../bg_images/bg7.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { MdDeleteOutline, MdLogout } from 'react-icons/md';
import { FaAngleLeft, FaAngleRight, FaRedo } from "react-icons/fa";
var studentlist;

class ViewClass extends React.Component {

  constructor(props) {
    super(props);
    this.handleClicksub = this.handleClicksub.bind(this);
    this.state = {
        classId: this.props.match.params.id,
        studentmail:'',
        studentname:'',
        studentreg:'',
        studentlist: []
    }
  }

  componentDidMount() {
    var childnode = this.state.classId;
    sessionStorage.setItem("classid", childnode)
    firebase.database().ref("class_records").child(childnode).on("value", snapshot => {
      studentlist = [];
      snapshot.forEach(snap => {
        // snap.val() is the dictionary with all your keys/values from the 'class_records' path
        if (snap.key!='classname' && snap.key!='studentcount')
          studentlist.push(snap.val());
      });
      console.log(studentlist)
      this.setState({ studentlist: studentlist });
    });
  }

  onChangestudentname = (e) => {
    this.setState({studentname: e.target.value});
    console.log("length: ",this.state.studentlist.length);
  };
  onChangestudentreg = (e) => {
    this.setState({studentreg: e.target.value});
  };
  onChangestudentmail = (e) => {
    this.setState({studentmail: e.target.value});
  };

  handleClicksub() {
    var childnode = sessionStorage.getItem("classid")
    const con_db = firebase.database().ref("class_records").child(childnode);
    con_db.on('value', (snapshot) => {
      var s = snapshot.val()
      console.log(s)
      con_db.child(this.state.studentreg).set({
        studentname: this.state.studentname,
        studentmail: this.state.studentmail,
        studentreg: this.state.studentreg
      });
    });
    //window.location.href = `/viewclass/${childnode}`
  }

  delete_student(studReg) {
    firebase.database().ref("class_records").child(sessionStorage.getItem("classid")).child(studReg).remove();
  }

  back() {
    firebase.database().ref(`class_records/${sessionStorage.getItem("classid")}/studentcount`).set(studentlist.length);
    window.location.href = '/dashboard';
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  };

  render() {
    return (
      <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}></div>

      <header className={styles.teacherheader}>
          <div className={styles.menu} style={{ float: 'left', padding: '5px 0 5px 5%' }} >
            <img src={logo} alt="logo" height="70" className={styles.navcircle}/>
            <h2 className={styles.navtitle}><i>Intelliproc</i></h2>
          </div>
          <nav id="nav-bar" className={styles.navbar}>
            <div className={styles.menu}>
              <a onClick={this.logout}>LogOut <MdLogout/></a>
            </div>
          </nav>
        </header>

        <div className={styles.resultsHeader} style={{ paddingBottom: '10px' }}>
            <div>
                <h2 class="givecolor">{this.state.classId.toUpperCase()}</h2>
            </div><br/><br/>
          <Container fluid style={{ color: 'white', marginTop: '20px' }}>
            <Row>

            <Col md={1}></Col>

              <Col md={5} xs={12}>
                <center>
                  <label style={{ fontSize: '30px' }}>Students List</label><br /><br/>

                  <table id="example" class="display table">
                    <thead class="thead-dark">
                        <tr>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.studentlist.map(data => {
                        return (
                            <tr className="pool">
                            <td>{data.studentreg}</td>
                            <td>{data.studentname}</td>
                            <td>{data.studentmail}</td>
                            <td style={{ color:'#ff4d4d' }}><a onClick={() => this.delete_student(data.studentreg)}><MdDeleteOutline /></a></td>
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '30px 0' }}>
                        <button class="btn btn-outline-primary" onClick={this.back} style={{ width: '100%' }}><FaAngleLeft /> Back to Dashboard</button>
                    </div>
                </center>
              </Col>

              <Col md={1}></Col>

              <Col md={4} xs={12}>
                <center>
                  <label style={{ fontSize: '30px' }}>Add Student</label><br /><br/>

                  <div style={{ padding: '0 63px' }}>
                  <form onSubmit={this.handleClicksub}>
                    <label style={{ color: 'white', fontSize: '20px' }}>Name:&ensp;&nbsp; </label>
                    <input type="text"
                        name="studentname"
                        id="studentname"
                        placeholder="Enter student name"
                        value={this.studentname}
                        onChange={this.onChangestudentname}
                        class="form-control-lg"
                        required
                        autoFocus />
                    <br /><br />

                    <label style={{ color: 'white', fontSize: '20px' }}>Reg No:&nbsp; </label>
                    <input type="text"
                        name="studentreg"
                        id="studentreg"
                        placeholder="Enter registration number"
                        value={this.studentreg}
                        onChange={this.onChangestudentreg}
                        class="form-control-lg"
                        required />
                    <br /><br />

                    <label style={{ color: 'white', fontSize: '20px' }}>Email:&emsp;&nbsp; </label>
                    <input type="email"
                        name="studentmail"
                        id="studentmail"
                        placeholder="Enter email id"
                        value={this.studentmail}
                        onChange={this.onChangestudentmail}
                        class="form-control-lg"
                        required />
                    <br /> <br />

                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
                      <button type="reset" class="btn btn-primary"><FaRedo /> Reset</button>
                      <button type="submit" class="btn btn-success">Submit <FaAngleRight /></button>
                    </div>
                    </form>

                    </div>
                </center>
              </Col>

              <Col md={1}></Col>

            </Row>
          </Container>

        </div></>

    );
  }
}

export default withRouter(ViewClass);