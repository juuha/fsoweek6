const initialState = ''

const reducer = (store = initialState, action) => {
  switch (action.type){
    case 'FILTER':
      return action.word
    default:
      return store
  }
}

export const setFilter = (word) => {
  return {
    type: 'FILTER',
    word
  }
}

export default reducer