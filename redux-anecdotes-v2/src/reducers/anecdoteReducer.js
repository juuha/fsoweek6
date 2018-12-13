import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }

  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecToBeUpdated = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes +1
    }
    const updatedAnecdote = await anecdoteService.update(anecToBeUpdated)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer