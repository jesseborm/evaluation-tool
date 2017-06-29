import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import fetchBatches from '../actions/batches/fetch'
import Title from '../components/Title'
<<<<<<< HEAD:src/batches/showBatch.js
// import QuestionButton from '../components/QuestionButton'
=======
import QuestionButton from './QuestionButton'
// import QuestionButton from './QuestionButton'
>>>>>>> question-button:src/components/showBatch.js
import './ShowBatch.css'


const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class ShowBatch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    starts: PropTypes.instanceOf(Date),
    ends: PropTypes.instanceOf(Date),
    students: PropTypes.Array
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  renderStudentColor(student) {
    this.lastEvaluation(student).color
  }

  lastEvaluation(student) {
    return student.evaluation[student.evaluation.length - 1]
  }

  renderStudents(student, index) {
    return (
      <div key={index} className="studentnumber">
        <Link to={`/batches/${this.props._id}/students/${student._id}`}>
          <h3>{student.fullName}</h3>
        </Link>
        <img src={student.picture} />
        <p>Last color in array: {this.lastEvaluation(student).color}</p>
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
    const greenPercentage = (green.length / total) * 100
    const yellowPercentage = (yellow.length / total) * 100
    const redPercentage = (red.length / total) * 100

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

          {/* <div
            className="cover"
          style={{ backgroundImage: `url(${batches.student.picture})` }} /> */}
          <Title content={`Batch number: ${batchNumber} `} />
        </header>
        {/* <div className="color-bar">{this.showColorPercentage(students).bind(this)}</div> */}
        <QuestionButton
          // label="Who is the lucky one?"
          // onClick={ this.askQuestionTo(students).bind(this) }
        />
        <div className="cover">{students.map(this.renderStudents.bind(this))}</div>
        <main>
        </main>
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
}

export default connect(mapStateToProps, { fetchBatches })(ShowBatch)
