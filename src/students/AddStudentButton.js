// src/students/AddStudentButton.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import StudentEditor from './StudentEditor'
// import StarIcon from 'material-ui/svg-icons/action/favorite'
import './AddStudentButton.css'

class AddStudentButton extends PureComponent {
  static propTypes = {
    // _id: PropTypes.string,
    signedIn: PropTypes.bool,
  }

  // renderLink() {
  //   debugger
  //   const { _id } = this.props
  //   console.log(_id);
  //   debugger
  //   return `/batches/${_id}/add-student`
  // }



  render() {
    if (!this.props.signedIn) return null

    // const { _id } = this.props
    // console.log(_id);
    return (
      <div className="AddStudentButton">
        {/* <Link to={this.renderLink}> */}
        <Link to={`/add-student`}>
          <RaisedButton
            label="Add student"
            primary={true}
          />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentBatch }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentBatch
})

export default connect(mapStateToProps)(AddStudentButton)
