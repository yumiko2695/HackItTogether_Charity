/*------- APP/components/user-home.js -------*/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const UserHome = props => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    email: state.user.email,
  };
};

export default connect(mapStateToProps)(UserHome);

UserHome.prototype = {
  email: PropTypes.string,
};
