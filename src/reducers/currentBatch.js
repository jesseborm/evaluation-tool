// src/reducers/currentBatch.js

import { GOT_BATCH } from '../actions/batches/get'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_BATCH :
      return payload

    default :
      return state
  }
}
