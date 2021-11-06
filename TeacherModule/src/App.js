import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  

// Pages
// Here is where all the pages are connected to each other

import MainPage from './components/Home'
import PageNotFound from './components/404'
import Admin from './components/Admin'
import Results from './components/Results'
import AdminSignIn from './components/AdminSignIn'
import CodeCheck from './components/CodeCheck'
class App extends Component {
  render() {
    return (
      
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/results" component={Results} />
          <Route exact path="/adminsignin" component={AdminSignIn} />
          <Route exact path="/codecheck" component={CodeCheck} />
        


          <Route exact path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;