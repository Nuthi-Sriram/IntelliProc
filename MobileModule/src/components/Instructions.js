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
           
            <br />
            <Button variant="contained" onClick={onAccept} class="btn btn-primary" >Start proctoring</Button>
            <br/>


        </div>
    )
}

export default Instructions;