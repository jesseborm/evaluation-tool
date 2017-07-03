import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import Dialog from 'material-ui/Dialog'
import './QuestionButton.css'

class QuestionButton extends PureComponent {
  // constructor(props) {
  //   super()
  //   const { students } = props
  //
  // }

  // componentWillMount() {
  //   const { students } = this.props
  // }

debugger
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

  today() {
    let currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    return day + "/" + month + "/" + year
  }

  getPrettyDateFromDate() {

  }

  // lastEvaluationDate(student) {
  //   student.evaluation.filter((e) => {
  //     if (e.date.toLocaleDateString() === new Date().toLocaleDateString())
  //   })
  //   return student.evaluation[student.evaluation.length - 1]
  // }

  // checkDateToday(lastEval) {
  //   if (lastEval.date.toLocaleDateString() !== new Date().toLocaleDateString()) {
  //     return lastEval
  //   }
  // }

  // lastEvaluation(student) {
  //   if (!!!student.evaluation[student.evaluation.length - 1]) return null
  //   // check if date of today is lastEvaluations date, skip
  //   return this.checkDateToday(student.evaluation[student.evaluation.length - 1])
  //   // return student.evaluation[student.evaluation.length - 1]
  // }
  lastEvaluation(student) {
    return student.evaluation[student.evaluation.length - 1]
  }

  // checkColorValid() {
  //   // check if there is a student with the selected color who hasn't been asked yet today
  //   let color = this.selectColor()
  //   if (color)
  // }

  askQuestionTo(students) {
    // debugger
    // const { students } = this.props
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

  renderAnswer() {
    //render answer on question here and show in dialog box
  }



  render() {
    // debugger
    const { students } = this.props

    const actions = [
      <Link to="/">
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

    return (
      <div>
        <RaisedButton
          label="Who is the lucky one?"
          onClick={() => {this.askQuestionTo(students)}}
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
          {/* {this.askQuestionTo} */}
        </Dialog>
        {/* <RaisedButton
          className="QuestionButton"
          label="Ask question???"
          onClick="/ask-question"
          primary={true}
        icon={<StarIcon />} /> */}
      </div>
    )
  }
}

const mapStateToProps = ({ currentBatch }) => ({
  batch: currentBatch,
})

export default connect(mapStateToProps)(QuestionButton)
