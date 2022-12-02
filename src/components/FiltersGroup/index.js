import {BsSearch} from 'react-icons/bs'

import ProfileDetailsItem from '../ProfileDetailsItem'
import './index.css'

const FiltersGroup = props => {
  
  // here we update the searchInput
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  // here user is click on the enter button corresponding details is displayed
  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input-bar"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          //  testid="searchButton"
          className="button-container"
          onClick={getJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

// when user search the jobs the corresponding details will be displayed
  const onSelectEmployeeType = event => {
    const {changeEmployeeList} = props
    changeEmployeeList(event.target.value)
  }

  // list the type of employees
  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="employment-container">
        <h1 className="employment-heading"> Type of Employment</h1>
        <ul className="employee-list-container">
          {employmentTypesList.map(eachEmployeeType => (
            <li
              className="employee-list-item"
              key={eachEmployeeType.employmentTypeId}
            >
              <input
                type="checkbox"
                id={eachEmployeeType.employmentTypeId}
                className="checkbox-input"
                value={eachEmployeeType.employmentTypeId}
                onChange={onSelectEmployeeType}
                //  name={eachEmployeeType.employmentTypeId}
              />
              <label
                htmlFor={eachEmployeeType.employmentTypeId}
                className="checkbox-label"
              >
                {eachEmployeeType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // list the type salary range
  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="salary-list-container">
          {salaryRangesList.map(eachSalary => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachSalary.salaryRangeId)
            }
            return (
              <li
                className="salary-list-item"
                key={eachSalary.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  name="salary"
                  className="check-radio-input"
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="check-radio-label"
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetailsItem />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}
export default FiltersGroup
