import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { connect } from 'react-redux'
import { anecdoteInit } from './reducers/anecdoteReducer'

class App extends React.Component {
  componentDidMount = async () => {
    this.props.anecdoteInit()
  }

  render() {
    //const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInit }
)(App)