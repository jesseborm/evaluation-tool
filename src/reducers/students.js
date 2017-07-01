// src/reducers/batchs.js
import { FETCHED_BATCHES } from '../actions/batches/fetch'
import { STUDENT_ADDED } from '../actions/batches/add-student'
import { STUDENT_REMOVED } from '../actions/batches/remove-student'
// import {
//   BATCH_CREATED,
//   BATCH_UPDATED,
//   BATCH_REMOVED
// } from '../actions/batches/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    // case FETCHED_BATCHES :
    //   return [ ...payload ]

    // case BATCH_CREATED :
    //   const newBatch = { ...payload }
    //   return [newBatch].concat(state)

    // case BATCH_UPDATED :
    //   return state.map((batch) => {
    //     if (batch._id === payload._id) {
    //       return { ...payload }
    //     }
    //     return batch
    //   })

    case STUDENT_ADDED :
      const newStudent = { ...payload }
      return [newStudent].concat(state)

    case STUDENT_REMOVED :
        return state.filter((batch) => (batch._id !== payload._id))

    default :
      return state

  }
}
