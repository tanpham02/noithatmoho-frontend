import { Link } from "react-router-dom";
import { themeDark, themeLight } from '../../reducers/actions'
import "./Topbar.scss";
import { memo } from "react";
export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'

const Topbar = ({ currentTheme, dispatch }) => {

  const handleChangeThemeLight = () => {
    dispatch(themeLight(THEME_LIGHT))
    sessionStorage.setItem('currentTheme', THEME_LIGHT)

  }

  const handleChangeThemeDark = () => {
    sessionStorage.setItem('currentTheme', THEME_DARK)
    dispatch(themeDark(THEME_DARK))
  }


  return (
    <div className={`top-bar ${currentTheme === THEME_DARK && 'active'}`}>
      <div className="top-bar__wrapper">
        <div className="top-left">
          <Link to='/admin' className="logo">MOHO Administrator</Link>
          <div className={`theme-dark-light ${currentTheme === THEME_DARK && 'active'}`}>
            <i
              className={`fa-solid fa-sun ${currentTheme === THEME_LIGHT && 'active'} `}
              onClick={handleChangeThemeLight}
            ></i>
            <i
              className={`fa-solid fa-moon ${currentTheme === THEME_DARK && 'active'}`}
              onClick={handleChangeThemeDark}
            ></i>
          </div>
        </div>
      </div >
    </div >
  )
}

export default memo(Topbar)
