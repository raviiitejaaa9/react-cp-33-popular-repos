// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, onChangeQuery, reqLanguage} = props

  const {id, language} = languageItem

  const onClickLanguage = () => {
    onChangeQuery(id)
  }

  const reqCss =
    reqLanguage === id ? 'language-btn  highlighted-btn' : 'language-btn'

  return (
    <li>
      <button className={reqCss} type="button" onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
