import {
      USER_LOADING,
      USER_REGISTER_SUCCESS, 
      USER_REGISTER_FAIL, 
      USER_SIGN_IN_SUCCESS, 
      USER_SIGN_IN_FAIL,
} from './../actionTypes/AuthActionTypes';
const initialState = {
      user: null,
      message: []
}
export default (state = initialState, action) => {
      const { type, payload } = action;
      switch(type){
            case USER_LOADING:
                  const localUser = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null
                  return { ...state, user: localUser }

            case USER_REGISTER_SUCCESS:
            case USER_SIGN_IN_SUCCESS:
                  localStorage.setItem('userProfile', JSON.stringify(payload))
                  return { ...state, user: payload }
            case USER_REGISTER_FAIL:
            case USER_SIGN_IN_FAIL:
                  if(localStorage.getItem('userProfile')) {
                        localStorage.removeItem("userProfile");
                  }
                  return { ...state, message: [...state.message, payload]}
            default:
                  return state;
      }

}