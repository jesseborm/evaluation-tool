// src/batches/StudentEditor.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
// import Editor from 'react-medium-editor'
// import toMarkdown from 'to-markdown'
import addStudent from '../actions/batches/add-student'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import '../batches/BatchEditor.css'

// const COLORS = [
//   'yellow',
//   'green',
//   'red'
// ]

class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    // #FIXME // first and lastName entry, combine in before hook
    // add color to set optional initial value
    const { fullName, picture } = props

    this.state = {
      fullName,
      picture,
      errors: {},
    }
  }

  componentWillReceiveProps(newProps) {
    const { replace, signedIn, showError } = newProps
    if (!signedIn) {
      showError('You need to be signed up to create batches!')
      replace('/sign-in')
    }
  }

  //# FIXME // change in model
  // makeFullName(firstName, lastName) {
  //   return const fullName = firstName + ' ' + lastName
  // }

  updateFullName(event) {
    // this.makeFullName(f, l)
    this.setState({
      fullName: this.refs.fullName.value
    })
  }

  updatePicture(event) {
    this.setState({
      picture: this.refs.picture.value
    })
  }

  // setInitialColor(event) {
  //   this.setState({
  //     green: event.target.value === 'green',
  //     yellow: event.target.value === 'yellow',
  //     red: event.target.value === 'red'
  //   })
  // }

  validate(student) {
    const { fullName, picture } = student

    let errors = {}

    if (!fullName || fullName === '') errors.fullName = 'We need a fullName!'
    if (!picture || picture === '') errors.picture = 'In need of a picture!'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveStudent() {
    const {
      fullName,
      picture,
    } = this.state

    const student = {
      fullName,
      picture,
    }

    const { currentBatch } = this.props

    if (this.validate(student)) {
      console.log(student)
      const { _id } = currentBatch
      // const { batchId } = this.props
      // debugger
      this.props.addStudent(currentBatch._id, student)
      // this.props.push(`/batches/${batchId}`)
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="text"
          ref="fullName"
          className="fullName"
          placeholder="Full Name"
          defaultValue={this.state.fullName}
          onChange={this.updateFullName.bind(this)}
          onKeyDown={this.updateFullName.bind(this)} />

        { errors.fullName && <p className="error">{ errors.fullName }</p> }

        <input
          type="text"
          ref="picture"
          className="picture"
          placeholder="Picture URL"
          defaultValue={this.state.picture}
          onChange={this.updatePicture.bind(this)}
          onKeyDown={this.updatePicture.bind(this)} />

        { errors.picture && <p className="error">{ errors.picture }</p> }

        {/* Possible use for initial color */}
        {/* {TYPES.map((type) => {
          return <label key={color} htmlFor={color}>
          <input id={color} type="radio" name="color" value={color} onChange={this.setColor.bind(this)} />
          {color}
          </label>
        })} */}

        <div className="actions">
          <button className="primary" onClick={this.saveStudent.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentBatch }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentBatch
})
export default connect(mapStateToProps, { addStudent, replace, showError })(BatchEditor)
