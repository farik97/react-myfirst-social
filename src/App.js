import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import './App.css';
import themeFile from './util/theme'

// pages
import home from './pages/Home'
import login from './pages/Login'
import signup from './pages/Signup'
import Navbar from './components/Navbar';

import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// my theme
const theme = createMuiTheme(themeFile);

let authenticated

const token = localStorage.AppIdToken

if(token) {
    const decodedToken = jwtDecode(token)
    if(new Date(decodedToken.exp * 1000) < Date.now()){
        window.location.href('/login')
        authenticated = false
    } else {
      authenticated = true
    }
}

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar/>
            <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <Route exact path="/login" component={login}/>
              <Route exact path="/signup" component={signup}/>
            </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
  );
}

export default App;
