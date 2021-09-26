import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import instruction from "./instruction.jpg"
import "./Dashboard2.css"
const Instructions = () => {

    const history = useHistory();
    function onAccept() {
        history.push('/formvalid')
    }

    //Disable Right click
    if (document.addEventListener) {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    }

    // // Alert on Tab Changed within the Same browser Window
    // function handleVisibilityChange() {
    //     if (document.hidden) {
    //         swal("Tab Change Detected", "Action has been Recorded", "error");
    //         // the page is hidden
    //     } else {
    //         // the page is visible
    //     }
    // }

    // document.addEventListener("visibilitychange", handleVisibilityChange, false);

    return (
        <div className="App-header">
            <center>
                <h2 style={{ marginTop: '20px' }}>
                   <b>Instructions To Follow:</b> 
                 </h2>
            </center>
            <table align="center">
            <tbody><tr>
                <td class="text-center">
                    <div>
                        <img src={instruction} id="instructionIcon" />
                    </div>
                </td>
                <td>
                    <ul className="givesize">
                        <br/>
                        
                        <li>
                        Recommended to have no photo frames at the background.
                        </li>
                        <li>
                        Use the lastest version of Chrome or Brave or Edge for better experience throughout the exam.
                        </li>
                        
                        <li>
                        Webcam and Mobile cam will have continuous access throughout the exam.
                        </li>

                        <li>
                        Take the exam alone.
                        </li>
                        
                        <li >
                        You have to be present infront of the webcam and mobilecam throughout the exam.
                        </li>
                         <li>
                         Make sure there are no books or paper material to avoid getting flagged.
                        </li>
                        <li>
                        Do not wear hoodies, sweatshirts, jackets, neckties, headphoes/earphones or hats.
                        </li>
                        <li>
                        Do not speak to anyone during the exam.
                        </li>
                        <li>
                        Following activities during examination will be treated as unfair means / malpractice cases
                        <br/>
a. Moving away from the screen.
<br/>
b. Browsing other websites,opening multiple tabs.
<br/>
c. Running any other application on the gadget through which you are appearing for the examination
                        </li>
                        <li>
                        The system will log you out after a certain number of warnings. And you will not able to resume with the test.
                        </li>
                       <li>
                        PLEASE DO NOT LEAVE FULLSCREEN ELSE ANSWERS WILL BE CLEARED AND YOU WILL HAVE TO STARTOVER AGAIN !!!
                      </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
            <center>
                <small>
                    I have understood the rules!!
                </small>
            </center>
            <br />
            <Button variant="contained" onClick={onAccept} class="btn btn-primary" >Begin Exam</Button>
            <br/>


        </div>
    )
}

export default Instructions;