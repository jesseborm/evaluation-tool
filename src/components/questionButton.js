import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import Dialog from 'material-ui/Dialog'
import './QuestionButton.css'

class QuestionButton extends PureComponent {
  // static propTypes = {
  //   students: PropTypes.array.isRequired
  // }

  selectColor() {
    let chance = Math.random()

    if (chance <= .017) {
      return "green"
    } else if (chance > .5) {
      return "red"
    } else {
      return "yellow"
    }
  }
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



  render() {
    if (!this.props.signedIn) return null

    return (
      <div>
        <Dialog
          title="Join Game"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          Hey there! Would you like to join this game?
        </Dialog>
        <RaisedButton
          className="QuestionButton"
          label="Ask question???"
          onClick="/ask-question"
          primary={true}
          icon={<StarIcon />} />
      </div>
    )
  }
}

export default QuestionButton
