// src/students/EvaluationEditor.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import Editor from 'react-medium-editor'
import DatePicker from 'material-ui/DatePicker'
// import toMarkdown from 'to-markdown'
import addEvaluation from '../actions/batches/add-evaluation'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import '../batches/BatchEditor.css'

class EvaluationEditor extends PureComponent {
  constructor(props) {
    super()

    // #FIXME // first and lastName entry, combine in before hook
    // add color to set optional initial value
    const { date, color, remark } = props

    this.state = {
      date,
      color,
      remark,
      errors: {},
    }
  }

  componentWillReceiveProps(newProps) {
    const { replace, signedIn, showError } = newProps
    if (!signedIn) {
      showError('You need to be signed up to create evaluations!')
      replace('/sign-in')
    }
  }

  //# FIXME // change in model
  // makeFullName(firstName, lastName) {
  //   return const fullName = firstName + ' ' + lastName
  // }

  updateEvalDate(event, date) {
    // event.preventDefault()
    this.setState({
      date: date
    })
  }

  updateColor(event) {
    // event.preventDefault()
    // this.makeFullName(f, l)
    this.setState({
      color: this.refs.color.value
    })
  }

  updateRemark(event) {
    // event.preventDefault()
    this.setState({
      remark: this.refs.remark.value
    })
  }


  // validate(student) {
  //   const { fullName, picture } = student
  //
  //   let errors = {}
  //
  //   if (!fullName || fullName === '') errors.fullName = 'We need a fullName!'
  //   if (!picture || picture === '') errors.picture = 'In need of a picture!'
  //
  //   this.setState({
  //     errors,
  //   })
  //
  //   return Object.keys(errors).length === 0
  // }

  saveEvaluation() {
    const {
      date, color, remark
    } = this.state


    const evaluation = {
      date, color, remark
    }

    const { studentId } = this.props.params
    // const student = currentBatch.students.find(stud => stud._id.toString() === studentId.toString())
    const { currentBatch } = this.props

    // if (this.validate(student)) {
      // debugger
      const { _id } = currentBatch
      console.log(_id + "***" + studentId + "***" + evaluation);
      this.props.addEvaluation(_id, studentId, evaluation)
      // this.props.push(`/batches/${batchId}`)

  }

  render() {
    // const { errors } = this.state
    // const { currentBatch } = this.props

    return (
      <div className="editor">
        {/* <p>{currentBatch._id}</p> */}
        <input
          type="text"
          ref="color"
          className="color"
          placeholder="Color"
          defaultValue={this.state.color}
          onChange={this.updateColor.bind(this)}
          onKeyDown={this.updateColor.bind(this)} />

        {/* { errors.color && <p className="error">{ errors.color }</p> } */}

        <input
          type="text"
          ref="remark"
          className="remark"
          placeholder="Remark"
          defaultValue={this.state.remark}
          onChange={this.updateRemark.bind(this)}
          onKeyDown={this.updateRemark.bind(this)} />

        {/* { errors.remark && <p className="error">{ errors.remark }</p> } */}

        <DatePicker
          hintText="Click to select date"
          onChange={this.updateEvalDate.bind(this)}
        />

        {/* Possible use for initial color */}
        {/* {TYPES.map((type) => {
          return <label key={color} htmlFor={color}>
          <input id={color} type="radio" name="color" value={color} onChange={this.setColor.bind(this)} />
          {color}
          </label>
        })} */}

        <div className="actions">
          <button className="primary" onClick={this.saveEvaluation.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentBatch }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentBatch,
})
export default connect(mapStateToProps, { addEvaluation, replace, showError })(EvaluationEditor)
//
