// src/batches/showBatch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import RaisedButton from 'material-ui/RaisedButton'

import fetchBatches from '../actions/batches/fetch'
import getCurrentBatch from '../actions/batches/get'
import Title from '../components/Title'
import QuestionButton from '../components/QuestionButton'
import AddStudentButton from '../students/AddStudentButton'
import './ShowBatch.css'

export class ShowBatch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    starts: PropTypes.instanceOf(Date),
    ends: PropTypes.instanceOf(Date),
    students: PropTypes.Array
  }

  componentWillMount() {
    const { batch, fetchBatches, getCurrentBatch
      //, subscribeToBatches, subscribed
    } = this.props
    const { batchId } = this.props.params

    if (!batch) fetchBatches()
    getCurrentBatch(batchId)
    // if (!subscribed) subscribeToBatches()

    // this.props.fetchBatches()
    // const { _id } = this.props
    // const { getBatch } = this.props
    // this.props.getBatch(_id)
    // debugger
  }


  changeDate(date) {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }

  renderStudentColor(student) {
    this.lastEvaluation(student).color
  }

  lastEvaluation(student) {
    // if (student.evaluation.length === 0) return null
    // if (student.evaluation.length == [])
    return student.evaluation[student.evaluation.length - 1]
  }

  renderStudents(student, index) {
    return (
      <div key={index} className="studentnumber">
        <Link to={`/batches/${this.props._id}/students/${student._id}`}>
          <h3>{student.fullName}</h3>
        </Link>
        <img src={student.picture} alt="student-picture"/>
        {/* <p>Color: {this.lastEvaluation(student).color}</p> */}
      </div>
    )
  }

  showColorPercentage(students) {

    let green = students.filter((student) => {
      if (this.lastEvaluation(student).color === "green")
      return student
    })
    let red = students.filter((student) => {
      if (this.lastEvaluation(student).color === "red")
      return student
    })
    let yellow = students.filter((student) => {
      if (this.lastEvaluation(student).color === "yellow")
      return student
    })
      const total = green.length + red.length + yellow.length
      const greenPercentage = (green.length / total * 100).toFixed(2)
      const yellowPercentage = (yellow.length / total * 100).toFixed(2)
      const redPercentage = (red.length / total * 100).toFixed(2)

    return (
      <div className="batchColors">
        Colors of this batch:
        <ul>
          <li className="green">Green: {greenPercentage}%</li>
          <li className="yellow">Yellow: {yellowPercentage}%</li>
          <li className="red">Red: {redPercentage}%</li>
        </ul>
      </div>
    )
  }


  render() {
    const {
      _id,
      batchNumber,
      starts,
      ends,
      students,
    } = this.props

    if (!_id) return null

    return(
      <article className="batch-student">
        <header>
          <Title content={`Batch number: ${batchNumber} `} />
        </header>
        {/* {this.showColorPercentage(students) */}
        <div>
          {this.showColorPercentage(students)}
          <QuestionButton students={students}
            // label="Who is the lucky one?"
            // onClick={ this.askQuestionTo(students).bind(this) }
          />
          <AddStudentButton batchId={_id} />
        </div>
        <main>
          <div className="cover">{students.map(this.renderStudents.bind(this))}</div>
        </main>
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
  // const batch = batches.filter((b) => (b._id === currentBatch))[0]
  //   return {
  //     batch,

  return {
    ...batch,

  }
}

export default connect(mapStateToProps, { fetchBatches, getCurrentBatch })(ShowBatch)
