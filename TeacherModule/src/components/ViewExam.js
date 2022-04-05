import React, { useState } from 'react'
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import './Results.css';
import logo from './../logo.png';
import styles from './../styles.module.css';
import background from './../bg_images/bg1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { IoRadioButtonOffOutline, IoRadioButtonOnOutline } from "react-icons/io5";
import { MdDeleteOutline, MdSend, MdLogout, MdOutlineFileUpload } from 'react-icons/md';
import { FaAngleLeft } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';
require('dotenv').config();

var questionlist, classlist;
var details;

class ViewExam extends React.Component {

    constructor(props) {
        super(props);
        this.handleClicksub = this.handleClicksub.bind(this);
        this.state = {
            examId: this.props.match.params.id,
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
            marks: 0,
            questionlist: [],
            flag:false,
            imagePreviewUrl: ''
        }
    }

    componentDidMount() {
        var childnode = this.state.examId;
        sessionStorage.setItem("examid", childnode);
        firebase.database().ref(`exam_records/${childnode}`).on("value", snapshot => {
            details = snapshot.val();
            if(details) {
                this.setState({ flag: true });
                sessionStorage.setItem("starttime", details.starttime);
                sessionStorage.setItem("endtime", details.endtime);
                sessionStorage.setItem("totalmarks", details.totalmarks);
            }
        });
        firebase.database().ref("exam_records").child(childnode).child("questions").on("value", snapshot => {
            questionlist = [];
            snapshot.forEach(snap => {
                // snap.val() is the dictionary with all your keys/values from the 'exam_records' path
                questionlist.push(snap.val());
            });
            this.setState({ questionlist: questionlist });
        });
        firebase.database().ref("exam_records").child(childnode).child("classes").on("value", snapshot => {
            classlist = [];
            snapshot.forEach(snap => {
                classlist.push(snap.val());
            });
        });
    }

    onChangequestion = (e) => {
        this.setState({ question: e.target.value });
    };
    onChangeoption1 = (e) => {
        this.setState({ option1: e.target.value });
    };
    onChangeoption2 = (e) => {
        this.setState({ option2: e.target.value });
    };
    onChangeoption3 = (e) => {
        this.setState({ option3: e.target.value });
    };
    onChangeoption4 = (e) => {
        this.setState({ option4: e.target.value });
    };
    onChangeanswer = (e) => {
        this.setState({ answer: e.target.value });
    };
    onChangemarks = (e) => {
        this.setState({ marks: e.target.value });
        sessionStorage.setItem("marks", e.target.value);
    };
    onChangeImage = (e) => {
        if(e.target && e.target.files && e.target.files[0])
        {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                this.setState({ imagePreviewUrl: reader.result });
                //sessionStorage.setItem("imageQuestion",reader.result);
                //console.log("this.state.image: ",this.state.imagePreviewUrl);
                swal("Image uploaded!","You can reupload an image if you wish to change the image","success");
            }
        }
    };

    handleClicksub() {
        //var imagequestion = sessionStorage.getItem("imageQuestion");
        //sessionStorage.setItem("imageQuestion",'');
        var childnode = sessionStorage.getItem("examid");
        if (this.state.answer != this.state.option1 && this.state.answer != this.state.option2 && this.state.answer != this.state.option3 && this.state.answer != this.state.option4)
            alert("Answer is not matching with any of the options", "error");
        else {
            let temp = parseInt(sessionStorage.getItem("totalmarks")) + parseInt(sessionStorage.getItem("marks"));
            sessionStorage.setItem("totalmarks", temp);
            const con_d = firebase.database().ref("exam_records");
            con_d.child(childnode).update({
                questionscount: questionlist.length,
                totalmarks: temp
            })
            const con_db = firebase.database().ref("exam_records").child(childnode).child("questions");
            con_db.on('value', (snapshot) => {
                var s = snapshot.val()
                console.log(s)
                con_db.child(this.state.question).set({
                    question: this.state.question,
                    option1: this.state.option1,
                    option2: this.state.option2,
                    option3: this.state.option3,
                    option4: this.state.option4,
                    answer: this.state.answer,
                    marks: this.state.marks,
                    imagequest: this.state.imagePreviewUrl
                });
            })
            
            //firebase.database().ref(`exam_records/${childnode}/questionscount`).set(questionlist.length);
            //firebase.database().ref(`exam_records/${childnode}/totalmarks`).set(temp);
        }
    }

    delete_question(quest) {
        let temp = parseInt(sessionStorage.getItem("totalmarks")) - parseInt(quest.marks);
        sessionStorage.setItem("totalmarks", temp);
        let childnode = sessionStorage.getItem("examid");
        const con_d = firebase.database().ref("exam_records");
        con_d.child(childnode).update({
            totalmarks: temp
        })
        //firebase.database().ref(`exam_records/${childnode}/totalmarks`).set(temp);
        firebase.database().ref("exam_records").child(childnode).child("questions").child(quest.question).remove();
    }

    back() {
        //firebase.database().ref(`class_records/${sessionStorage.getItem("classid")}/studentcount`).set(studentlist.length);
        window.location.href = '/dashboard';
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    };

    send_email_notification() {
        let studentList = [];
        firebase.database().ref("class_records").on("value", snapshot => {
            snapshot.forEach(snap => {
                let current_class = snap.val().classname;
                if (classlist.includes(current_class))
                    firebase.database().ref("class_records").child(current_class).on("value", snapshot => {
                        snapshot.forEach(snap => {
                            if (snap.key != 'classname' && snap.key != 'studentcount')
                                studentList.push(snap.val());
                        });
                    });
            });
        });
        console.log("studentList: ",studentList);
        swal("Sending email notifications...","","success");
        for (let i = 0; i < studentList.length; i++) {
            console.log("Hello");
            try {
            emailjs.send(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, {
                to_name: studentList[i].studentname,
                start_time: sessionStorage.getItem("starttime"),
                end_time: sessionStorage.getItem("endtime"),
                exam_code: sessionStorage.getItem("examid"),
                to_email: studentList[i].studentmail,
            }, process.env.REACT_APP_EMAIL_USER_ID)
                .then(function (response) {
                    console.log('SUCCESS! ', i, ' ', response.status);
                }, function (error) {
                    console.log('FAILED...', i, ' ', error);
                });
            } catch(e) {
                console.log("Exception error: ", e);
            }
            console.log("Student ",i);
            setTimeout(() => {  swal("Email Notifications sent!", "Done", "success"); }, 1000);
        }
    };

    renderElement(option, ans) {
        if (option == ans)
            return <IoRadioButtonOnOutline />;
        else
            return <IoRadioButtonOffOutline />;
    }

    render() {
        return (
            <><div style={{ backgroundImage: "url(" + background + ")", marginTop: '80px' }} className={styles.bg}></div>
                <header className={styles.teacherheader}>
                    <div className={styles.menu} style={{ float: 'left', padding: '5px 0 5px 5%' }} >
                        <img src={logo} alt="logo" height="70" className={styles.navcircle} />
                        <h2 className={styles.navtitle}><i>Intelliproc</i></h2>
                    </div>
                    <nav id="nav-bar" className={styles.navbar}>
                        <div className={styles.menu}>
                            <a onClick={this.logout}>LogOut <MdLogout /></a>
                        </div>
                    </nav>
                </header>
                <Container >
                    <Row>

                        <Col lg={3} md={1}></Col>

                        <Col lg={7} md={10} sm={12}>
                            <center>
                                <div className={styles.createClassHeader} style={{ marginTop: '95px' }}>
                                    <img src={logo} alt="logo" height="180" margin="0" style={{ marginTop: '10px' }} className={styles.circle} /><br />
                                    <h2 style={{ color: 'white' }}>
                                        <i>{this.state.examId}</i>
                                    </h2><br />

                                    <div style={{ width: '95%', border: '2px solid #008fb3' }}>
                                        <Card>
                                            <Card.Text as="h4" style={{ backgroundColor: '#ccf5ff', color: 'black' }}>
                                                <div style={{ display: 'flex', fontSize: '19px', justifyContent: 'space-between', margin: '0 20px', marginTop: '10px' }}>
                                                    <p>No of questions: <i>{this.state.questionlist.length}</i></p>
                                                    <p>Total marks: <i>{sessionStorage.getItem("totalmarks")}</i></p>
                                                </div>
                                            </Card.Text>
                                        </Card>
                                    </div><br />

                                    <div style={{ margin: '0 15px', width: "90%" }}>
                                        {this.state.questionlist.map(data => {
                                            return (
                                                <div><Card>
                                                    <Card.Header as="h5" style={{ backgroundColor: '#545b62' }}>
                                                        <Row>
                                                            <Col xs={2} style={{ fontSize: '14px' }}>{data.marks} Mark(s)</Col>
                                                            <Col xs={9}>
                                                                {data.question}
                                                            </Col>
                                                            <Col xs={1} style={{ color: '#ff4d4d' }}><a onClick={() => this.delete_question(data)}><MdDeleteOutline /></a></Col>
                                                        </Row>
                                                    </Card.Header>
                                                    {data.imagequest && <Card.Body style={{ backgroundColor: '#373b40' }}>
                                                         <img style={{ width:'100%',borderRadius: '5px' }} src={data.imagequest}/>
                                                    </Card.Body>}
                                                    <Card.Body style={{ backgroundColor: '#d7dcdf' }}>
                                                        <div style={{ textAlign: 'left' }}>
                                                            <Card.Text style={{ color: 'black' }}>
                                                                {this.renderElement(data.option1, data.answer)} &ensp;{data.option1}<br />
                                                                {this.renderElement(data.option2, data.answer)} &ensp;{data.option2}<br />
                                                                {this.renderElement(data.option3, data.answer)} &ensp;{data.option3}<br />
                                                                {this.renderElement(data.option4, data.answer)} &ensp;{data.option4}<br />
                                                            </Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </Card><br /></div>
                                            );
                                        })}
                                    </div>

                                    <div style={{ borderTop: '2px solid antiquewhite', width: '90%', marginBottom: '20px' }}></div>

                                    <h2 style={{ color: 'white' }}>
                                        <i>Add Questions!</i>
                                    </h2><br />

                                    <div style={{ padding: '0 63px', paddingBottom: '10px' }}>
                                        <form style={{ textAlign: 'left', width: '400px' }}>

                                            <div>
                                                <label style={{ color: 'white', fontSize: '20px' }}>Question: &ensp;</label>
                                                <textarea
                                                    name="question"
                                                    id="question"
                                                    placeholder="Type question ..."
                                                    value={this.question}
                                                    onChange={this.onChangequestion}
                                                    className="form-control"
                                                    rows="2" ></textarea>
                                                <br />

                                                <label style={{ color: 'white', fontSize: '20px' }}>Add image: <span style={{ fontSize: '12px' }}>(optional)</span> &ensp;</label>
                                                <input type="file"
                                                    name="imgQuest"
                                                    id="imgQuest"
                                                    accept="image/*"
                                                    onChange={this.onChangeImage}
                                                    className="form-control-sm"
                                                    style={{ display: 'none' }} />
                                                <label htmlFor="imgQuest">
                                                    <Button variant="contained" color="primary" size="small" component="span" style={{ textTransform: 'none' }}><MdOutlineFileUpload />&ensp;Upload</Button>
                                                </label>
                                                <br /><br />

                                                <IoRadioButtonOffOutline /><input type="text"
                                                    name="option1"
                                                    id="option1"
                                                    placeholder="Option 1"
                                                    value={this.option1}
                                                    onChange={this.onChangeoption1}
                                                    className="form-control-sm" /><br />
                                                <IoRadioButtonOffOutline /><input type="text"
                                                    name="option2"
                                                    id="option2"
                                                    placeholder="Option 2"
                                                    value={this.option2}
                                                    onChange={this.onChangeoption2}
                                                    className="form-control-sm" /><br />
                                                <IoRadioButtonOffOutline /><input type="text"
                                                    name="option3"
                                                    id="option3"
                                                    placeholder="Option 3"
                                                    value={this.option3}
                                                    onChange={this.onChangeoption3}
                                                    className="form-control-sm" /><br />
                                                <IoRadioButtonOffOutline /><input type="text"
                                                    name="option4"
                                                    id="option4"
                                                    placeholder="Option 4"
                                                    value={this.option4}
                                                    onChange={this.onChangeoption4}
                                                    className="form-control-sm" /> <br /><br />

                                                <IoRadioButtonOnOutline /><input type="text"
                                                    name="answer"
                                                    id="answer"
                                                    placeholder="Enter correct option"
                                                    value={this.answer}
                                                    onChange={this.onChangeanswer}
                                                    className="form-control-sm" /><br /><br />

                                                <label style={{ color: 'white', fontSize: '20px' }}>Marks: &ensp;</label>
                                                <input type="number"
                                                    name="marks"
                                                    id="marks"
                                                    placeholder="Enter marks"
                                                    min="1"
                                                    value={this.marks}
                                                    onChange={this.onChangemarks}
                                                    className="form-control" />

                                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '30px 0' }}>
                                                    <button onClick={this.handleClicksub} class="btn btn-outline-primary" style={{ width: '100%' }}>Add this question</button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                    <div style={{ display: 'flex', width: '90%', borderTop: '2px solid antiquewhite', justifyContent: 'space-between', padding: '20px 0' }}>
                                        <button class="btn btn-primary" onClick={this.back}><FaAngleLeft /> Back</button>
                                        <button class="btn btn-success" onClick={this.send_email_notification}>Send Email Notification <MdSend /></button>
                                    </div>
                                </div>
                            </center>
                        </Col>

                        <Col lg={2} md={1}></Col>

                    </Row>
                </Container>

            </>

        );
    }
}

export default withRouter(ViewExam);