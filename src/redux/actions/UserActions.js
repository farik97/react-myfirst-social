import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_USER} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios
        .post('/login', userData)
            .then(res => {
                const AppIdToken =  `Bearer ${res.data.token}`
                localStorage.setItem('AppIdToken', AppIdToken)
                axios.default.headers.common['Authorization'] = AppIdToken
                dispatch(getUserData())
                history.push('/')
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

