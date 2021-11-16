import React, { Component } from 'react'
import Contact from './Contact.js'
import { Consumer } from '../../context'

class Contacts extends Component {


  
  render() {
    return (
      <>
      <h1 className="display-4 mb-5">Contact List </h1>
      <div className="container">
        <Consumer>
          {(value) => {
            return (
              <>
                {value.contacts.map((contact) => (
                  <Contact
                    key={contact.id}
                    contact={contact}
                  />
                ))}
              </>
            )
          }}
        </Consumer>
      </div>
      </>
    )
  }
}

export default Contacts
