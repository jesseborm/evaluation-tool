import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import Dialog from 'material-ui/Dialog'
import './QuestionButton.css'

class QuestionButton extends PureComponent {
  // static propTypes = {
  //   students: PropTypes.array.isRequired
  // }
  // static propTypes = {
  //   open: PropTypes.bool,
  // }

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
    // return luckOne
  }



  render() {
    // link to go to studentpage
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
        <RaisedButton label="Ask away" onTouchTap={this.handleOpen} />
        <Dialog
          title="Ask questionn dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          This is the lucky name:
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

export default QuestionButton
