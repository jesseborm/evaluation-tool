import React from 'react'

const SelectStudent = () => {

function selectColor() {
  let chance = Math.random()

  if (chance <= .017) {
    return "green"
  } else if (chance > .5) {
    return "red"
  } else {
    return "yellow"
  }
}

// use color to select (and collect) students from database in afterhook and use colors[Math.floor(Math.random() * colors.length)] to select student from collected array.
  return (

  )
}

export default SelectStudent

var colors = ["green", "yellow", "yellow", "red", "red", "red"]


colors[Math.floor(Math.random() * colors.length)]
