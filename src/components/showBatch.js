import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import './BatchItem.css'
import fetchBatches from '../actions/batches/fetch'
import Title from '../components/Title'
// import QuestionButton from './QuestionButton'
import RaisedButton from 'material-ui/RaisedButton'



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
    // const { _id } = this.props
    this.props.fetchBatches()
  }

  renderStudents(student, index) {
    console.log(student);
    // debugger
    return (
      // <div key={index} { ...student } />
      <div key={index} className="studentnumber">
        <Link to={`/batches/${this.props._id}/students/${student._id}`}>
          <h3>{student.fullName}</h3>
        </Link>
        <img src={student.picture} />
        {/* <div

          className="cover"
        style={{ backgroundImage: `url(${student.picture || PLACEHOLDER })` }} /> */}

        {/* #FIXME //get last color out array:
          student.evaluation[students.length - 1].color
          vs. student.evaluation.slice(-1)
          -> arr[(arr.slice(-2, -1))[0]]
        */}
        <p>First color in array: {student.evaluation[0].color}</p>
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

  receiveStudentArray() {

  }

  askQuestionTo(students) {
    console.log(this.selectColor());
    // debugger
    // filter over students then random
    // console.log("students: " + students);
    const fullNames = students.map((s) => s.fullName)
    let color = this.selectColor()
    const luckyOnes =
    students.filter((stud) => {
      if (stud.evaluation[stud.length - 1].color === color) //can only test this when I have seeds for all colors
        return stud
        debugger
    })

    // debugger
    const luckyOne = luckyOnes[Math.floor(Math.random() * luckyOnes.length)]

    // write in one select
    // students.evaluation[0].color  selectColor()
    //
    // students.evaluation[0][Math.floor(Math.random() * students.length)]
    //
    console.log(luckyOne);
    window.alert(luckyOne)
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
      <article className="Batch page">
        <header>
          {/* <div
            className="cover"
          style={{ backgroundImage: `url(${batches.student.picture})` }} /> */}
          <Title content={`Batch number: ${batchNumber} `} />
        </header>
        <div>{students.map(this.renderStudents.bind(this))}</div>
        <main>
          <RaisedButton
            label="Who is the lucky one?"
            onClick={ this.askQuestionTo(students).bind(this) }
          />
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
