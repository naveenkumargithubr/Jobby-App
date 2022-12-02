import {Link, withRouter} from 'react-router-dom' // here withRouter is used cause of here we used history prop

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

// when user click on the logout button then its navigate to the login route
const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header-container">
      <div className="nav-details-container">
        <div className="nav-mobile-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-nav-logo"
            />
          </Link>
    
    // this mobile container is designed for small devices this container is hides on large devices
          <ul className="nav-mobile-icons-container">
            <li className="home-icon">
              <Link to="/">
                <AiFillHome size="25" />
              </Link>
            </li>
            <li className="home-icon">
              <Link to="/jobs">
                <BsFillBriefcaseFill size="25" />
              </Link>
            </li>
          </ul>
          <button type="button" className="logout-logo" onClick={onClickLogout}>
            <FiLogOut size="20" />
          </button>
        </div>

  // this nav container is created for large devices this container is hide in small devies
        <div className="nav-large-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=" website logo"
            className="website-logo-large"
          />
          <ul className="unorder-large-list">
            <li className="header-title">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="header-title">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            className="nav-large-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
