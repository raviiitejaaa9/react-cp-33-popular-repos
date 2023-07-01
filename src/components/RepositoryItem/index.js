// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachRepo

  return (
    <li className="each-repo-item">
      <img alt={name} src={avatarUrl} className="repo-item-img" />
      <h1 className="repo-name "> {name} </h1>
      <div className="stars-container">
        <img
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star-logo"
        />
        <p> {starsCount} stars </p>
      </div>
      <div className="stars-container">
        <img
          alt="forks"
          className="star-logo"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
        />
        <p> {forksCount} forks </p>
      </div>
      <div className="stars-container">
        <img
          alt="open issues"
          className="star-logo"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        <p> {issuesCount} open issues </p>
      </div>
    </li>
  )
}

export default RepositoryItem
