import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    reqLanguage: languageFiltersData[0].id,
    languageList: [],
    apiResponse: apiConstants.initial,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  onChangeQuery = id => {
    console.log(id)
    this.setState(
      {
        reqLanguage: id,
      },
      this.getPopularRepos,
    )
  }

  onSuccess = data => {
    this.setState({
      apiResponse: apiConstants.success,
      languageList: data,
    })
  }

  onFailure = () => {
    console.log('zev')
    this.setState({
      languageList: [],
      apiResponse: apiConstants.failure,
    })
  }

  onLoading = () => {
    this.setState({
      languageList: [],
      apiResponse: apiConstants.loading,
    })
  }

  getPopularRepos = async () => {
    const {reqLanguage} = this.state
    this.onLoading()

    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${reqLanguage}`

    const response = await fetch(githubReposApiUrl)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const reqData = {
        popularRepos: data.popular_repos,
      }

      const modifiedData = reqData.popularRepos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      // console.log(modifiedData)
      this.onSuccess(modifiedData)
    } else {
      this.onFailure()
    }
  }

  displayRepoItems = () => {
    const {languageList} = this.state

    return (
      <ul className="popular-repos-container">
        {languageList.map(eachItem => (
          <RepositoryItem eachRepo={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  displayFailureView = () => (
    <div>
      <img
        className="api-call-fail-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="something-wrong"> Something Went Wrong </h1>
    </div>
  )

  displayLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height={80} width={80} color="#0284c7" />
    </div>
  )

  displayView = () => {
    const {apiResponse} = this.state

    switch (apiResponse) {
      case apiConstants.success:
        return this.displayRepoItems()
      case apiConstants.failure:
        return this.displayFailureView()
      case apiConstants.loading:
        return this.displayLoadingView()
      default:
        return null
    }
  }

  render() {
    const {reqLanguage} = this.state
    // console.log(languageList)
    return (
      <div className="app-container">
        <h1 className="app-head"> Popular </h1>
        <ul className="btn-list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageItem={eachItem}
              key={eachItem.id}
              onChangeQuery={this.onChangeQuery}
              reqLanguage={reqLanguage}
            />
          ))}
        </ul>
        {this.displayView()}
      </div>
    )
  }
}

export default GithubPopularRepos
