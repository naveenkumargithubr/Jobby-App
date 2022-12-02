import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  // when submit is success then jwtToken is genarated 
  onSubmitSuccess = jwTtoken => {
    Cookies.set('jwt_token', jwTtoken, {expires: 30}) // here we set the jwtToken expiration
    const {history} = this.props
    history.replace('/') // if its token is genarated successfully then navigated to home page
  } 

  
  // when unAuthorized user is trying to access then showing error message
  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  // here we make the post api call
  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    // recieving the response 
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  
  // updating the usernamefield
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  //updating the password feild
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="USERNAME"
          onChange={this.onChangeUsername}
          className="user-input-field"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="PASSWORD"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          className="user-input-field"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')

    // if the user is defined the navigate to home page (jwtToke is have)
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="logo-head-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="submit-form" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">* {errorMsg}</p>} // showing the error field
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
