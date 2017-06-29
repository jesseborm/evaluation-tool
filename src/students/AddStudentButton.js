import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import StudentEditor from './StudentEditor'
// import StarIcon from 'material-ui/svg-icons/action/favorite'
import './AddStudentButton.css'

class AddStudentButton extends PureComponent {
  // constructor(props) {
  //   super()
  //
  //   const { batchNumber } = props
  //
  //   this.state = {
  //     batchNumber
  //   }
  //
  // }

  static propTypes = {
    // batch: PropTypes.object,
    signedIn: PropTypes.bool,
  }

  // renderLink() {
  //   const { batchId } = this.props.params
  //   console.log(batchId);
  //   debugger
  //   return `/batches/${batchId.toString()}`
  // }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="AddStudentButton">
        {/* <Link to={this.renderLink}> */}
        <Link to='/add-student'>
          <RaisedButton
            label="Add student"
            primary={true}
          />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(AddStudentButton)