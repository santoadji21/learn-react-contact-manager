import React, { Component } from 'react'
class Test extends Component {
  state = {
    title: '',
    body: '',
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((data) => this.setState({ 
          title: data.title,
          body: data.body
      }))
  }

  //   componentWillMount() {
  //     console.log('componentWillMount....')
  //   }

  //   componentDidUpdate( ) {
  //     console.log('componentDidUpdate....')

  //   }

  render() {
      const {title, body} = this.state
    return (
      <div>
        <h1>Hello World</h1>
        <h3>Title:</h3>
        <p>{title}</p>
        <h3>Body:</h3>
        <p>{body}</p>
      </div>
    )
  }
}

export default Test
