# IntelliProc

IntelliProc is a dual proctoring system which uses the laptop webcam and mobile camera to proctor students. It consists of 3 modules - 
Teacher Module which is used for creating the test and checking the students cheat results.
Laptop Module which proctors the students using the laptops webcam and microphone.
Mobile Module which proctors the students using the mobile camera.

The application successfully detects all types of malpractices like book, paper,
phone, face, laptop detection along with face recognition, and head pose detection.
It records the audio throughout the exam duration and also detects tab switching and
exiting full screen operation. The mobile proctoring system keeps track of the field
of view, which isn't reachable by the laptop webcam. The laptop webcam and mobile
camera work, complementing one another. Thus, this dual-camera approach
minimizes the chances of a student committing a fraudulent activity by active visual
and auditory monitoring.

---
## Requirements

For development, you will only need Node.js installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.21.0

    $ npm --version
    8.0.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/Nuthi-Sriram/IntelliProc.git
    $ cd IntelliProc
    $ npm install
    $ cd MobileModule
    $ npm install
    $ cd ..
    $ cd TeacherModule
    $ npm install


## Running the Laptop Module

    $ nodemon app.js
    
## Running the Mobile Module

    $ cd MobileModule
    $ nodemon app.js

## Running the Teacher Module

    $ cd TeacherModule
    $ nodemon app.js
 
## Hosting URLs to view a Demo

Click on the below links to have a quick demo of out project:
  Student PC/Laptop Web application: https://intelliproc-6c838.web.app
  Student Mobile Web application: https://mobile-intelliproc.web.app
  Teacher Web Application: https://teacher-intelliproc.web.app/
