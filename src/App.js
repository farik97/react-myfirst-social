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
import AuthRoute from './util/AuthRoute'

// Redux
import {Provider} from 'react-redux'
import store from './redux/store'

// MUI Stuff
import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// my theme
const theme = createMuiTheme(themeFile);

let authenticated

const token = localStorage.AppIdToken

if(token) {
    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
    if(new Date(decodedToken.exp * 1000) < Date.now()){
        window.location.href = '/login'
        authenticated = false
    } else {
      authenticated = true
    }
}

function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <Navbar/>
              <div className="container">
              <Switch>
                <Route exact path="/" component={home}/>
                <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
              </Switch>
              </div>
            </Router>
        </Provider>
      </MuiThemeProvider>
  );
}

export default App;
