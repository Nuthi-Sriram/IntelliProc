import React from 'react'
import firebase from "firebase/app";
import { Button } from '@material-ui/core';
import './Results.css';
import logo from './../logo.png';
import styles from './../styles.module.css';
import background from './../bg_images/bg18.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaAngleRight, FaChalkboardTeacher } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classlist: [],
      examlist: []
    }
  }

  componentDidMount() {

    firebase.database().ref("class_records").on("value", snapshot => {
      let classlist = [];
      snapshot.forEach(snap => {
        // snap.val() is the dictionary with all your keys/values from the 'class_records' path
        classlist.push(snap.val());
      });
      this.setState({ classlist: classlist });
    });

    firebase.database().ref("exam_records").on("value", snapshot => {
      let examlist = [];
      snapshot.forEach(snap => {
        // snap.val() is the dictionary with all your keys/values from the 'exam_records' path
        examlist.push(snap.val());
      });
      this.setState({ examlist: examlist });
    });
  }

  create_class() {
    //this.props.history.push('/createclass')
    window.location.href = '/createclass';
  }

  visit_class(className) {
    //this.props.history.push(`/viewclass/${e}`)
    window.location.href = `/viewclass/${className}`
  }

  delete_class(className) {
    firebase.database().ref("class_records").child(className).remove();
  }

  create_exam() {
    //this.props.history.push('/createexam')
    window.location.href = '/createexam';
  }

  visit_exam(examName) {
    //this.props.history.push(`/viewclass/${e}`)
    window.location.href = `/viewexam/${examName}`
  }

  delete_exam(examName) {
    firebase.database().ref("exam_records").child(examName).remove();
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

        <div className={styles.resultsHeader} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <h2 style={{ color: 'white', marginTop: '90px' }}>
            <i><FaChalkboardTeacher/>&ensp;Teacher Dashboard!</i>
          </h2><br />

          <Container fluid style={{ color: 'white', marginTop: '20px' }}>
            <Row>

              <Col md={1}></Col>

              <Col md={4} xs={12}>
                <center>
                  <label style={{ fontSize: '30px' }} class="givecolor">CLASSES </label><br />

                  {this.state.classlist.map(data => {
                    return (
                      <div><Card>
                        <Card.Header as="h5" style={{ backgroundColor: '#545b62' }}>{data.classname}</Card.Header>
                        <Card.Body style={{ backgroundColor: '#d7dcdf' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
                            <Card.Text style={{ color: 'black' }}>
                              No of students: {data.studentcount}
                            </Card.Text>
                            <button class="btn btn-sm btn-outline-danger" onClick={() => this.delete_class(data.classname)} >Delete Class</button>
                            <button class="btn btn-sm btn-outline-info" onClick={() => this.visit_class(data.classname)} >Visit Class <FaAngleRight /></button>
                          </div>
                        </Card.Body>
                      </Card><br/></div>
                    );
                  })}

                  <br /> <button class="btn btn-primary" onClick={this.create_class} >Create Class</button><div></div>
                </center>
              </Col>

              <Col md={2}></Col>

              <Col md={4} xs={12}>
                <center>
                  <label style={{ fontSize: '30px' }} class="givecolor">EXAMS </label><br />

                  {this.state.examlist.map(data => {
                    return (
                      <div><Card>
                        <Card.Header as="h5" style={{ backgroundColor: '#545b62' }}>{data.examname}</Card.Header>
                        <Card.Body style={{ backgroundColor: '#d7dcdf' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Card.Text style={{ color: 'black' }}>
                              Start Time: {data.starttime}
                              <br />End Time:  {data.endtime}
                            </Card.Text>
                            <button class="btn btn-sm btn-outline-danger" onClick={() => this.delete_exam(data.examname)} >Delete Exam</button>
                            <button class="btn btn-sm btn-outline-info" onClick={() => this.visit_exam(data.examname)} >Visit Exam <FaAngleRight /></button>
                          </div>
                        </Card.Body>
                      </Card><br/></div>
                    );
                  })}

                  <br /> <button class="btn btn-primary" onClick={this.create_exam} >Create Exam</button><div></div>
                </center>
              </Col>

              <Col md={1}></Col>

            </Row>
          </Container>
        </div></>

    );
  }
}

export default Dashboard;