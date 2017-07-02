// src/students/ShowStudent.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import fetchBatches from '../actions/batches/fetch'
import EvaluationEditor from './EvaluationEditor'
import Title from '../components/Title'
import '../batches/ShowBatch.css'

export class ShowStudent extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    students: PropTypes.Array,
    // evaluation: PropTypes.Array
  }

  componentWillMount() {
    // const { batch, student } = this.props
    const { batchId, studentId } = this.props.params
    this.props.fetchBatches()
    // debugger
  }


  // getStudents() {
  //   // const students = batches._id.students
  //   const student = batch.students.find((student) => (student._id === this.props.params.studentId))
  //   debugger
  // }

  renderStudents(student, index) {
    return (
      <div key={index} className="studentnumber">
        <h3>{student.fullName}</h3>
        <img src={student.picture} alt=''/>
      </div>
    )
  }

  renderEvaluations(evaluation, index) {

    return (
      <div key={index} className="studentevaluation">
        <div>{evaluation.date}</div>
        <div>{evaluation.color}</div>
        <div>{evaluation.remark}</div>
      </div>
    )
  }

  render() {
    // debugger
    const { currentBatch } = this.props
    const {studentId, batchId } = this.props.params
    if(!!!currentBatch) return null
    const student = currentBatch.students.find(stud => stud._id.toString() === studentId.toString())
    const {
      _id,
      fullName,
      picture,
      evaluation,
  } = student

    return(
      <article className="Batch page">
        <header>
          <Title content={student.fullName} />
        </header>
        {/* <div>{students.map((s) => s.fullName)}</div> */}
        {/* <div>
          {students.map(
            this
            .renderStudents
            .bind(this))}
        </div> */}
        <main>
          <div>Batchnumber: {currentBatch._id}</div>
          <div>{student.evaluation[student.evaluation.length - 1].color}</div>
          <img src={student.picture} alt="student-picture"/>
          <div>{evaluation.map(this.renderEvaluations.bind(this))}</div>
        </main>
        <EvaluationEditor params={this.props.params} />
      </article>
    )
  }
}

const mapStateToProps = ({ batches, currentBatch }, { params }) => {

    const batch = batches.reduce((prev, next) => {
      if (next._id === params.batchId) {
        return next
      }
      return prev
    }, {})
    return {
      ...batch,
      currentBatch,
    }

    // const student = batch.students
    // .find((student) => (student._id === params.studentId))

    // const student = batch.students.reduce((prev, next) => {
    //   if (next._id === params.studentId) {
    //     return next
    //   }
    //   return prev
    // }, {})
    // return {
    //   ...student
    // }
}

export default connect(mapStateToProps, { fetchBatches })(ShowStudent)
