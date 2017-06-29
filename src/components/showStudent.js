import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './BatchItem.css'
import fetchBatches from '../actions/batches/fetch'
import Title from '../components/Title'

export class ShowStudent extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    students: PropTypes.Array,
    // evaluation: PropTypes.Array
  }

  componentWillMount() {
    const { batch, student } = this.props
    const { studentId } = this.props.params
    this.props.fetchBatches()
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
        <img src={student.picture} />
      </div>
    )
  }

  renderEvaluation(evaluation, index) {
    return (
      <div key={index} className="studentevaluation">
        {/* {evaluations[0].} */}
        <h3>{evaluation[0].color}</h3>

      </div>
    )
  }

  render() {
    const {batch} = this.props
    const {studentId, batchId } = this.props.params
    if(!!!batch) return null
    const student = batch.students.find(stud => stud._id.toString() === studentId.toString())
    const {
    //
    //   // _id,
      batchNumber,
    //   student,
    //   // evaluation,
    //   // fullName,
    //   // params,
    } = this.props

    // const { studentId } = this.props.params
debugger
    return(
      <article className="Batch page">
        <header>
          <Title content={`Student: ${student.fullName} `} />
        </header>
        <div>Batchnumberrr: {batchNumber}</div>
        {/* <div>{students.map((s) => s.fullName)}</div> */}
        {/* <div>
          {students.map(
            this
            .renderStudents
            .bind(this))}
        </div> */}
      </article>
    )
  }
}

const mapStateToProps = ({ batches }, { params }) => {

    const batch = batches.reduce((prev, next) => {
      if (next._id === params.batchId) {
        return next
      }
      return prev
    }, {})
    return {
      ...batch
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
