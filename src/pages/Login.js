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

// redux stuff
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/UserActions'

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

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {classes, UI: {loading}} = this.props
        const { errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item className={classes.login} sm>
                    <img className={classes.icon} src={AppIcon} alt="icon image" />
                    <Typography variant="h4" color="textPrimary" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} helperText={errors.email} error={errors.email ? true : false}
                        value={this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} helperText={errors.password} error={errors.password ? true : false}
                        value={this.state.password} onChange={this.handleChange} fullWidth />
                        {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>)}
                        <Button disabled={loading} type="submit" variant="contained" color="primary" className={classes.button}>Login{loading && (<CircularProgress size={30} className={classes.progress}/>)}</Button>
                        <br />
                        <small>Don't have an account? Sign Up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))
