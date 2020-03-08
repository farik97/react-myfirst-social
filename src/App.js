import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

// pages
import home from './pages/Home'
import login from './pages/Login'
import signup from './pages/Signup'
import Navbar from './components/Navbar';

import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// my theme
const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#58a1e8',
        main: '#0c73b5',
        dark: '#004885',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffc446',
        main: '#f49300',
        dark: '#bb6500',
        contrastText: '#fff',
      },
    },
    typography: {
      useNextVariants: true
    }
  });

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
