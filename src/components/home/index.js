import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return <div>Home Page</div>;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(Home);
