import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const notification = this.props.store.getState().notification
    const styleToUse = notification ? style : { display : 'none' }
    return (
      <div style={styleToUse}>
        {notification}
      </div>
    )
  }
}

export default Notification