import React from 'react'
import { connect } from 'react-redux'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div id='footer'>Developed by Xinyu Wen. All rights reserved.</div>
      </footer>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(Footer)
