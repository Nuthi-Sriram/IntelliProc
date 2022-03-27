import React, { useState } from 'react';
import firebase from "firebase/app";
import './Results.css';
import styles from './../styles.module.css';
import logo from './../logo.png';
import background from './../bg_images/bg17.jpg';
import swal from 'sweetalert';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const CreateExam = () => {
    const history = useHistory();
    const [examname, setExamname] = useState('')
    const [starttime, setStarttime] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endtime, setEndtime] = useState('')
    const [endTime, setEndTime] = useState('')
    var classlist = [];
    firebase.database().ref("class_records").on("value", snapshot => {
        snapshot.forEach(snap => {
          classlist.push(snap.val().classname);
        });
    });
    var classarray = [];
    for(let i=0;i<classlist.length;i++) {
        classarray.push(false);
    }

    const onChangeExamname = (e) => {
        setExamname(e.target.value);
    };

    const onChangeStarttime = (e) => {
        setStarttime(e.target.value);
        let date = new Date(e.target.value);
        date = date.toLocaleDateString() + ", " + date.toLocaleTimeString();
        setStartTime(date);
    };

    const onChangeEndtime = (e) => {
        setEndtime(e.target.value);
        let date = new Date(e.target.value);
        date = date.toLocaleDateString() + ", " + date.toLocaleTimeString();
        setEndTime(date);
    };

    const onChangecheckbox = (val) => {
        classarray[classlist.indexOf(val)] = !classarray[classlist.indexOf(val)];
    }

    function create() {
        const con_db = firebase.database().ref("exam_records");
        con_db.child(examname).set({
            examname: examname,
            starttime: startTime,
            endtime: endTime,
            totalmarks: 0
        });
        for(let i=0,j=0;i<classlist.length;i++){
            if(classarray[i]) {
                con_db.child(examname).child("classes").update({
                    [j]: classlist[i]
                });
                //firebase.database().ref(`exam_records/${examname}`).child("classes").push().set({class_name: classlist[i]});
                //firebase.database().ref(`exam_records/${examname}/classes/${j}`).set(classlist[i]);
                j += 1;
            }
        }
        history.push(`/viewexam/${examname}`)
    }

    function back() {
        history.push('/dashboard');
    }

    return (
        <><div style={{ backgroundImage: "url(" + background + ")" }} className={styles.bg}> </div>
            <div className={styles.appHeader}>
                <img src={logo} alt="logo" height="200" margin="0" className={styles.circle} /><br />
                <h2 style={{ color: 'white' }}>
                    <i>Exam Creation!</i>
                </h2><br />

                <div style={{ padding: '0 63px' }}>
                    <form onSubmit={create} style={{ textAlign: 'left'}}>
                        <label style={{ color: 'white', fontSize: '20px' }}>Exam code: &ensp;</label>
                        <input type="text"
                            name="examname"
                            id="examname"
                            placeholder="Enter exam code"
                            value={examname}
                            onChange={onChangeExamname}
                            className="form-control-lg"
                            required
                            autoFocus />
                        <br /><br/>

                        <label for="starttime" style={{ color: 'white', fontSize: '20px' }}>Exam start time: </label>
                        <input type="datetime-local"
                            name="starttime"
                            id="starttime"
                            placeholder="Enter exam start time"
                            value={starttime}
                            onChange={onChangeStarttime}
                            className="form-control"
                            required />
                        <br />

                        <label for="endtime" style={{ color: 'white', fontSize: '20px' }}>Exam end time: </label>
                        <input type="datetime-local"
                            name="endtime"
                            id="endtime"
                            placeholder="Enter exam end time"
                            value={endtime}
                            min={starttime}
                            onChange={onChangeEndtime}
                            className="form-control"
                            required />
                        <br />

                        <label style={{ color: 'white', fontSize: '20px' }}>Select classes: </label>
                        {classlist.map(data => {
                            return (
                                <div class="form-check">
                                    &ensp;<input type="checkbox" value="" id="flexCheckDefault" onChange={() => onChangecheckbox(data)} />
                                    <label class="form-check-label" for="flexCheckDefault" style={{ fontSize: '18px' }}>
                                        &ensp;{data}
                                    </label>
                                </div>
                            );
                        })}

                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
                            <button class="btn btn-primary" onClick={back} ><FaAngleLeft /> Back</button>
                            <button type="submit" class="btn btn-success">Create <FaAngleRight /></button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default CreateExam;