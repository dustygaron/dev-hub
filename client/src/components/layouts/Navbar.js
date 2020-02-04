import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-laptop-code"></i> DevHub
          </Link>
        </h1>
        <ul>
          <li><Link to="#">Developers</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    )
  }
}