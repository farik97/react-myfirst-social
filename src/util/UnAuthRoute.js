import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'

const UnAuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route {...rest}
    render = {(props) => authenticated === false ? <Redirect to='/login' /> : <Component {...props}/>}
    />
)

export default UnAuthRoute