import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-desc">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
