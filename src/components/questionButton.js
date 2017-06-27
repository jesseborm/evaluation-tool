import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import './QuestionButton.css'

class QuestionButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

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

  askQuestionTo() {
    console.log(selectColor());
    // filter over students then random
    const luckyOne = students.filter(() => (students.evaluation[0].color === selectColor()))[Math.floor(Math.random() * students.length)]

    // write in one select
    // students.evaluation[0].color  selectColor()
    //
    // students.evaluation[0][Math.floor(Math.random() * students.length)]
    //

    window.alert('One')
  }



  render() {
    if (!this.props.signedIn) return null

    return (
      <div>
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

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(QuestionButton)
