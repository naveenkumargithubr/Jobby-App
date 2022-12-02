import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employeeType: [],
    minimumSalary: 0,
    searchInput: '',
  }

  
  //make the api request 
  componentDidMount() {
    this.getJobs()
  }

  //implementing the api request
  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {employeeType, minimumSalary, searchInput} = this.state
    // here we pass the query parameters to the apiUrl 
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimumSalary}&search=${searchInput}`

    // get the jwtToken 
    const jwtToken = Cookies.get('jwt_token')

    // sending the authorization key 
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
  
      // here we convert the snakecase to camelCase and updating the data
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        apiStatus: apiStatusConstants.success, // if its success jobsList is displayed
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure, // if its failure failure img is displayed
      })
    }
  }

  renderJobsSuccessList = () => {
    const {jobsList} = this.state
    const renderJobsList = jobsList.length > 0 // if length is greater than the 0 jobs list is displayed else no jobs img is dispalyed

    return renderJobsList ? (
      <div className="all-jobs-container">
        <ul className="unorder-jobs-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        testid="searchButton"
        className="jobs-failure-button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  
  // whenever user enters the letters from the keyboard its will be updated 
  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  // if user serach the letters and enter key is pressed corresponding details will be displayed
  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  
  // when user select the radio button corresponding salary packages and jobs will be displayed
  changeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobs)
  }

  //here also same when the user click on the checkbox label corresponding job detals are displayed
  changeEmployeeList = type => {
    this.setState(
      prevState => ({employeeType: [...prevState.employeeType, type]}),
      this.getJobs,
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-container">
         <div className="jobs-card-content">
      
         // display the filter details
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.changeSearchInput}
              searchInput={searchInput}
              getJobs={this.getJobs}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
            />
          
             // this user input container is for small devices
              <div className="input-jobs-search-list-container">
              <div className="search-input-large-container">
                <input
                  type="search"
                  className="search-input-bar-container"
                  placeholder="Search"
                  onChange={this.changeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="large-search-button-container"
                  onClick={this.getJobs}
                >
                  <BsSearch className="large-search-icon" />
                </button>
              </div>
              {this.renderAllJobsList()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
