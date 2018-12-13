import React from 'react'
import Filter from '../components/Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  voteHandle = (anecdote) => () => {
    this.props.store.dispatch(voteAnecdote(anecdote.id))
    this.props.store.dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      this.props.store.dispatch(removeNotification())
    }, 5000)
  }

  render() {
    const filter = this.props.store.getState().filter
    const anecdotes = this.props.store.getState().anecdotes.filter(anec => anec.content.includes(filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteHandle(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList