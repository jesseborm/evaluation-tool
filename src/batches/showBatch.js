import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import fetchBatches from '../actions/batches/fetch'
import Title from '../components/Title'
// import QuestionButton from '../components/QuestionButton'
import './ShowBatch.css'


const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class showBatch extends PureComponent {
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
  //////////////////////////////////////////////
  selectColor() {
    // debugger
    let chance = Math.random()

    if (chance <= .17) {
      return "green"
    } else if (chance > .5) {
      return "red"
    } else {
      return "yellow"
    }
  }

  getAllStudents(students) {

  }

  // checkColorValid() {
  //   // check if there is a student with the selected color who hasn't been asked yet today
  //   let color = this.selectColor()
  //   if (color)
  // }

  askQuestionTo(students) {
    const luckyOnes = students.filter((stud) => {
      if (this.lastEvaluation(stud).color === this.selectColor()) {
        return stud
      }
    })
    // if (luckyOnes == '')
    // if (luckyOnes === [])
      // askQuestionTo(students)

    const luckyOne = (luckyOnes[Math.floor(Math.random() * luckyOnes.length)]).fullName
    // const theName = luckyOne.fullName
    // debugger
    // console.log(theName);
    // window.alert(luckyOne.fullName)
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
        <RaisedButton
          label="Who is the lucky one?"
          onClick={ this.askQuestionTo(students).bind(this) }
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

export default connect(mapStateToProps, { fetchBatches })(showBatch)
