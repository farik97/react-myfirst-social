import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = {
    signUpForm: {
        textAlign: 'center',

    },
    signUp: {
        backgroundColor: 'white',
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
    button: {
        marginTop: 20,
        marginBottom: 10,
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    },
    textField: {
        margin: '10px auto 10px auto'
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
        event.preventDefault()
        this.setState({
            loading: true
        })
        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.username
        }
        // add axios functions
        axios.post('/signup', userData)
            .then(res => {
                console.log(res.data)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({
                    errors: err.respponse.data,
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
        const {errors, loading} = this.state
        return (
            <Grid container className={classes.signUpForm}>
                <Grid item sm />
                <Grid item className={classes.signUp} sm>
                    <img className={classes.icon} src={AppIcon} alt="icon image" />
                    <Typography className={classes.pageTitle} variant='h4' color='textPrimary'>Sign Up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' value={this.state.email} onChange={this.handleChange} 
                        helperText={errors.email} error={errors.email ? true : false} className={classes.textField} fullWidth/>
                        <TextField id='password' name='password' type='password' label='Password' value={this.state.password} onChange={this.handleChange}
                        helperText={errors.password} error={errors.password ? true : false} className={classes.textField} fullWidth/>
                        <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password' value={this.state.confirmPassword} onChange={this.handleChange}
                        helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} className={classes.textField} fullWidth/>
                        <TextField id='username' name='username' type='username' label='Username' value={this.state.username} onChange={this.handleChange}
                        helperText={errors.handle} error={errors.handle ? true : false} className={classes.textField} fullWidth/>
                        {/* Add wrong credentials */}
                        <Button disabled={loading} type='submit' variant='contained' color='primary' className={classes.button}>Sign Up {loading && (<CircularProgress size={30} className={classes.progress}/>)}</Button>
                        <br />
                        <small>Already have an account ? <Link to='/login'>Sign in here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
