// src/reducers/batchs.js
import { FETCHED_BATCHES } from '../actions/batches/fetch'
import { STUDENT_ADDED } from '../actions/batches/add-student'
import { STUDENT_REMOVED } from '../actions/batches/remove-student'
import { EVALUATION_ADDED } from '../actions/batches/add-evaluation'

export default (state = null, { type, payload } = {}) => {
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

    case EVALUATION_ADDED :
      return payload

    // case STUDENT_REMOVED :
        // return state.filter((batch) => (batch._id !== payload._id))

    default :
      return state

  }
}
