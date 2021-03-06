import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
    form: {
        textAlign: 'center'
      },
      login: {
          backgroundColor: '#FFFFFF',
          padding: '10px 10px 10px 10px',
          borderRadius: '8px'
      },
      icon: {
          maxHeight: 100,
          border: '0px',
          margin: '20px auto 20px auto'
      },
      pageTitle: {
          margin: '10px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button: {
          marginTop: 20,
          marginBottom: 10,
          position: 'relative'
      },
      customError: {
          color: '#FF0000	',
          fontSize: '0.8rem',
          marginTop: '10px'
      },
      progress: {
          position: 'absolute'
      }
}

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.username
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('AppIdToken', `Bearer ${res.data.token}`)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false 
                })
            })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {classes} = this.props
        const { errors, loading} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item className={classes.login} sm>
                    <img className={classes.icon} src={AppIcon} alt="icon image" />
                    <Typography variant="h4" color="textPrimary" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} helperText={errors.email} error={errors.email ? true : false}
                        value={this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} helperText={errors.password} error={errors.password ? true : false}
                        value={this.state.password} onChange={this.handleChange} fullWidth />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField} helperText={errors.confrimPassword} error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword} onChange={this.handleChange} fullWidth />
                        <TextField id="username" name="username" type="text" label="Username" className={classes.textField} helperText={errors.handle} error={errors.handle ? true : false}
                        value={this.state.username} onChange={this.handleChange} fullWidth />
                        {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>)}
                        <Button disabled={loading} type="submit" variant="contained" color="primary" className={classes.button}>Sign Up{loading && (<CircularProgress size={30} className={classes.progress}/>)}</Button>
                        <br />
                        <small>Already have an account? Log in <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
