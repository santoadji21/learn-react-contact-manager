import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../context.js'
import { Link } from 'react-router-dom'
import {
  RiMailOpenFill,
  RiPhoneFill,
  RiArrowDownSLine,
  RiCloseFill,
  RiEdit2Fill,
} from 'react-icons/ri'
import axios from 'axios'

class Contact extends Component {
  // creat state
  state = {
    showContactInfo: false,
  }

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )
    dispatch({ type: 'DELETE_CONTACT', payload: id })
  }

  render() {
    const { name, email, phone, id } = this.props.contact
    const { showContactInfo } = this.state
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <RiArrowDownSLine
                  onClick={() => {
                    this.setState({
                      showContactInfo:
                        !this.state.showContactInfo,
                    })
                  }}
                />
                <RiCloseFill
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    color: 'red',
                    marginLeft: '1rem',
                  }}
                  onClick={this.onDeleteClick.bind(
                    this,
                    id,
                    dispatch
                  )}
                />
                <Link to={`contact/edit/${id}`}>
                  <RiEdit2Fill
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'cyan',
                    }}
                    onClick={this.onDeleteClick.bind(
                      this,
                      id,
                      dispatch
                    )}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    <RiMailOpenFill /> : {email}
                  </li>
                  <li className="list-group-item">
                    <RiPhoneFill /> : {phone}
                  </li>
                </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default Contact
