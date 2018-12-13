import React from 'react'
import Filter from '../components/Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  voteHandle = (anecdote) => () => {
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: state.anecdotes.filter(anec => anec.content.includes(state.filter)).sort((a, b) => b.votes - a.votes)
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, setNotification, removeNotification }
)(AnecdoteList)