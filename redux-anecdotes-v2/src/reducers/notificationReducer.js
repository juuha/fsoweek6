const initialState = null

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    case 'REMOVE':
      return null
    default:
      return store
  }
}

const setNotification = (message) => {
  return{
    type: 'SET',
    message
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export const notify = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  }
}

export default reducer