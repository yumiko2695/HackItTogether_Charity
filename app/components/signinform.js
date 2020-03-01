/*------- APP/components/auth-form.js -------*/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { auth } from '../store/userReducer';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  );
};

/* Note that we have two different sets of 'mapStateToProps' functions -
one for Login, and one for Signup. However, they share the same 'mapDispatchToProps' function & Component. 
This is a good example of how we can stay DRY with interfaces that are very similar to each other! */

const mapLoginToProps = state => {
  return {
    name: 'login', //you don't always need to pull from redux store
    displayName: 'Login', //both logins are hardcoded to be part of our state in this component
    error: state.user.error,
  };
};

const mapSignupToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLoginToProps, mapDispatchToProps)(AuthForm);
export const Signup = connect(mapSignupToProps, mapDispatchToProps)(AuthForm);

//checking the props in this component:
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
