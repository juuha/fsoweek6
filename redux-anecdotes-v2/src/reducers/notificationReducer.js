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

export const setNotification = (message) => {
  return {
    type: 'SET',
    message
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export default reducer