import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner container'>
          <h1>Developer Hub</h1>
          <p>
            The Social Network for Web Developers.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-round'><span>Get Started</span></Link>
            {/* <Link to='/login' className='btn btn-light'>Login</Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)