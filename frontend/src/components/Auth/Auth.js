import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux'
import {  Redirect, useHistory } from 'react-router-dom';
// import ReactFormInputValidation from "react-form-input-validation";
import { userSignIn, userRegistration } from './../../actions/authAction';
const  Auth = () => {
      const dispatch = useDispatch();
      const history = useHistory();
      const userprofile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : ""; 
//       let formRef = React.createRef();
//       formRef = new ReactFormInputValidation();
// console.log("Console form::::", formRef)
      const [formState, setFormState] = useState({
            email: "",
            password: "",
            confirmPassword: "",
            loadLogin: true,
            reload: false,
            userProfile: userprofile
      });

      const { email, password, confirmPassword, loadLogin, reload, userProfile } = formState;

      
const handleChange = e => {
      let { name, value } = e.target;
      setFormState((prevState) => ({ ...prevState, [name]:value }));
      
};

const handleSubmit = e => {
      e.preventDefault();
      if(loadLogin){
            dispatch(userSignIn({email, password}, history ));
      }else {
            dispatch(userRegistration({email, password, confirmPassword}));
      }
      setFormState((prevState) => ({ ...prevState,  email:'', password:'', confirmPassword:'', reload:!reload}));

}

let SignInForm =  (<Fragment>
            <div className="auth__form">
                  <h2> { loadLogin ? "SIGN IN" : " PLEASE REGISTER" } </h2>
            <form className="form__class" onSubmit={handleSubmit}>
                  <div className="form__group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" value={email} name="email" onChange={handleChange} placeholder="Email" required autoComplete="false" />
                  </div>
                  <div className="form__group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" value={password} name="password" onChange={handleChange} placeholder="Password" autoComplete="false" />
                  </div>
                  {
                        !loadLogin && (<div className="form__group">
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleChange} name="confirmPassword" placeholder="Confirm Password" autoComplete="false" />
                        </div>)
                  }
                  
                  <div className="form__group btn">
                        <button type="submit" > { loadLogin ? "Sign In" : "Register"} </button>
                  </div>
                  { (
                              <div className="form__group btn">
                                    <button onClick={() => setFormState((prevState) => ({ ...prevState, loadLogin: !loadLogin })) } > { !loadLogin ? "Already have an Account ? Sign In" : "Don't have an account ? Register" } </button>
                              </div>
                        )
                  }

            </form>
            </div>
            </Fragment>)   

            return ( 
                  <Fragment>
                        { userProfile ?  (<Redirect to="/creatememory" />) : SignInForm  }
                  </Fragment>
            )
}

export default Auth
