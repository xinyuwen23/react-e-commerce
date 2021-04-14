import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  render() {
    return <div>Login Page</div>;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(Login);
