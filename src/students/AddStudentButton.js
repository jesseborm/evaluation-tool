import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
// import StarIcon from 'material-ui/svg-icons/action/favorite'
import './AddStudentButton.css'

class AddStudentButton extends PureComponent {
  // static propTypes = {
  //   signedIn: PropTypes.bool,
  // }

  render() {
    // if (!this.props.signedIn) return null

    return (
      <div className="AddStudentButton">
        <Link to="/create-batch">
          <RaisedButton
            label="Add student"
            primary={true}
          />
        </Link>
      </div>
    )
  }
}

// const mapStateToProps = ({ currentUser }) => ({
//   signedIn: !!currentUser && !!currentUser._id,
// })

export default AddStudentButton
// connect(mapStateToProps)(AddStudentButton)
