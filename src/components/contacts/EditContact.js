import React, { Component } from 'react'

import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup.js'
import axios from 'axios'

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )

    const contact = res.data

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    })
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value })
  }
  onEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }
  onPhoneChange = (e) => {
    this.setState({ phone: e.target.value })
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault()
    const { name, email, phone } = this.state

    // Check for Error

    if (name === '') {
      this.setState({
        errors: { name: 'Name is Required' },
      })
      return
    }
    if (email === '') {
      this.setState({
        errors: { email: 'Email is Required' },
      })
      return
    }
    if (phone === '') {
      this.setState({
        errors: { phone: 'Phone is Required' },
      })
      return
    }

    const UpdateContact = {
      name,
      email,
      phone,
    }

    const { id } = this.props.match.params

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      UpdateContact
    )

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data })

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
    })

    this.props.history.push('/')

    console.log(this.state)
  }

  render() {
    const { name, email, phone, errors } = this.state

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value
          return (
            <div className="card p-3 mb-4">
              <div className="card-header">
                Update Contact
              </div>
              <div className="card-body">
                <form
                  onSubmit={this.onSubmit.bind(
                    this,
                    dispatch
                  )}
                >
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name .."
                    value={name}
                    onChange={this.onNameChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onEmailChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="Phone"
                    type="text"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onPhoneChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Update Contact"
                    className="mt-3 btn btn-lg btn-primary"
                  />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default EditContact
