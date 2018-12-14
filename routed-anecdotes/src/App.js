import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Container, Table, Grid, Image, Form, Button, Menu, Message, Divider, Header } from 'semantic-ui-react'

class MenuComp extends React.Component {
  state = { activeItem: 'Anecdotes', path: '/' }

  handleItemClick = (e, { name, path }) => {
    this.setState({ 
      activeItem: name,
      path: path
    })
  }

  render() {
    const { activeItem } = this.state.activeItem
    return (
      <div>
        {this.state.activeItem && <Redirect to={this.state.path}/>}
        <Menu tabular>
          <Menu.Item
            name='Anecdote'
            path='/'
            active={activeItem === 'Anecdote'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Create New'
            path='/create'
            active={activeItem === 'Create New'} 
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='About'
            path='/about'
            active={activeItem === 'About'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    )
  }
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      {anecdotes.map(anec =>
        <Table.Row key={anec.id}>
          <Table.Cell>
            <Link to={`/anecdotes/${anec.id}`}>{anec.content}</Link>
          </Table.Cell>
        </Table.Row>
      )}
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <Grid padded>
    <Grid.Row>
      <h2>About anecdote app</h2>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={12}>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src='https://www.bestcomputersciencedegrees.com/wp-content/uploads/2013/07/Brian-Kernighan-813x1024.jpg'/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const Notification = ({ notification }) => (
  <div>
    {notification && 
      <Message success>
        {notification}
      </Message>
    }
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/juuha/fsoweek6/tree/master/routed-anecdotes'>https://github.com/juuha/fsoweek6/tree/master/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: e.target.content.value,
      author: e.target.author.value,
      info: e.target.info.value,
      votes: 0
    })
    this.setState({ redirect: true })
  }

  render() {
    return(
      <div>
        {this.state.redirect && <Redirect to="/"/>}
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <label>content</label> 
            <input name='content' />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' />
          </Form.Field> 
          <Button type='submit'>create</Button>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null,
      createdNew: false
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new andecdote '${anecdote.content}' created!`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000);
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <Header as='h1'>Software anecdotes</Header>
            <MenuComp />
            <Notification notification={this.state.notification}/>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes/:id" render={({match}) => 
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />
            } />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create" render={() => <CreateNew addNew={this.addNew}/>} />
            <Divider />
            <Footer />
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
