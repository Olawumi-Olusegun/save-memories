import {
      USER_LOADING,
      USER_REGISTER_SUCCESS, 
      USER_REGISTER_FAIL, 
      USER_SIGN_IN_SUCCESS,
      USER_SIGN_IN_FAIL,
} from './../actionTypes/AuthActionTypes';

import * as api from './../api/Api';

export const userRegistration = (userData) => async (dispatch) => {
      try {
            dispatch({ type: USER_LOADING });
            const { data } = await api.userRegistration(userData);
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      } catch (error) {
            dispatch({ type: USER_REGISTER_FAIL, payload: error });
      }
}

export const userSignIn = (userdata, history) => async (dispatch) => {
      // return console.log(userdata, history)
      try {
            dispatch({ type: USER_LOADING });
            const  {data}  = await api.userSignIn(userdata);
            dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
            history.push('/creatememory')
      } catch (error) {
            dispatch({ type: USER_SIGN_IN_FAIL, payload: error });
      }
}