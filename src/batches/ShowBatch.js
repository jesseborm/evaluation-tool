// src/batches/showBatch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import fetchBatches from '../actions/batches/fetch'
import getCurrentBatch from '../actions/batches/get'
import Title from '../components/Title'
import QuestionButton from '../components/QuestionButton'
import AddStudentButton from '../students/AddStudentButton'
import removeStudent from '../actions/batches/remove-student'
import './ShowBatch.css'

export class ShowBatch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    // starts: PropTypes.instanceOf(Date),
    // ends: PropTypes.instanceOf(Date),
    students: PropTypes.Array
  }

  componentWillMount() {
    const { batch, fetchBatches, getCurrentBatch  } = this.props
    // const { students } = batch
    // console.log("1" + batch);
    // console.log("2" + this.props);
    const { batchId } = this.props.params
    // const { _id } = batch
    // console.log("3" + _id);
    // debugger
    if (!batch) fetchBatches()
    getCurrentBatch(batchId)
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  selectColor() {
    let chance = Math.random()

    if (chance <= .17) {
      return "green"
    } else if (chance > .5) {
      return "red"
    } else {
      return "yellow"
    }
  }

  lastEvaluation(student) {
    return student.evaluation[student.evaluation.length - 1]
  }

  // checkColorValid() {
  //   // check if there is a student with the selected color who hasn't been asked yet today
  //   let color = this.selectColor()
  //   if (color)
  // }

  askQuestionTo() {
    debugger
    const { students } = this.props
    // if (!this.props.students) return null
    let luckyOnes = students.filter((stud) => {
      if (this.lastEvaluation(stud).color === this.selectColor()) {
        return stud
      }
    })
    if (luckyOnes.length === 0) return this.askQuestionTo()
    let luckyOne = (luckyOnes[Math.floor(Math.random() * luckyOnes.length)]).fullName
    // const theName = luckyOne.fullName
    // console.log(theName);
    // window.alert(luckyOne.fullName)
    return window.alert("And the lucky one is " + luckyOne)
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
    // if (student.color === "grey") return
    const { batchId } = this.props.params
    // console.log("Hello::: " + currentBatch._id);
    const { studentId } = this.props.params
    console.log("bla " + studentId);
    // debugger
    return (
      <div key={index} className="studentnumber">
        <Link to={`/batches/${this.props._id}/students/${student._id}`}>
          <h3>{student.fullName}</h3>
        </Link>
        <img src={student.picture} alt="student-picture"/>
        <p>Color: {this.lastEvaluation(student).color}</p>
        <FlatButton className="delete"
          label="Delete student"
          onClick={this.deleteStudent(batchId, student._id)}
          primary={true}
        />
      </div>
    )
  }

  deleteStudent = (batchId, studentId) => {
    removeStudent(batchId, studentId)
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

    const { batchId } = this.props.params


    const actions = [
      <Link to={`/batches/${batchId}`} >
        <FlatButton
          label="Go to student page"
          primary={true} />
      </Link>,
      <FlatButton
        label="next "
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ]

    if (!_id) return null

    return(
      <div className="students wrapper">
        <header>
          <Title content={`Batch number: ${batchNumber} `} />
        </header>
        {/* {this.showColorPercentage(students) */}
        <div>
          {this.showColorPercentage(students)}
          {/* <RaisedButton
            label="Who is the lucky one?"
          onClick={this.askQuestionTo}  /> */}
          <QuestionButton  students={students}/>
          {/* <RaisedButton
            label="Who is the lucky one?"
            onClick={this.handleOpen}
            // onTouchTap={this.handleOpen}
            />
            <Dialog
            title="Ask questionn dialog"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            This is the lucky name:
            {this.askQuestionTo}
          </Dialog> */}
          <AddStudentButton batchId={_id} />
        </div>
        <main>
          <div className="cover">
            {students.map(
              this.renderStudents.bind(this)

            )
            }
          </div>
        </main>
      </div>

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
    currentBatch,

  }
}

export default connect(mapStateToProps, { removeStudent, fetchBatches, getCurrentBatch })(ShowBatch)
