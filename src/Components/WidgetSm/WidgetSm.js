import { memo, useEffect, useState } from 'react'
import "./WidgetSm.scss";
import { Visibility } from "@material-ui/icons";
import axios from 'axios';

const WidgetSm = ({ currentTheme, THEME_DARK }) => {
  const [userDatas, setUserData] = useState([])
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    async function getData() {
      const res = await axios.get('http://localhost:9080/api/users')
      const data = await res.data
      setUserData(data)
    }
    getData()
  }, [])

  const handleDisplay = () => {
    setDisplay(!display)
  }


  return (
    <div className={`widget-sm ${currentTheme === THEME_DARK && 'active'}`}>
      <span className={`widget-sm__title ${currentTheme === THEME_DARK && 'active'}`}>Thành viên</span>
      <ul className={`widget-sm__list`}>
        {userDatas.map((user, index) => (
          user.is_admin === 1 && (<li key={index} className="widget-sm__list-item">
            <img
              src={user.avatar}
              alt={user.full_name}
              className="widget-sm__img"
            />
            <div className={`widget-sm__user ${currentTheme === THEME_DARK && 'active'}`}>
              <span
                className="widget-sm__user-name"
              >
                {display ?
                  user.full_name :
                  user.full_name.replace(user.full_name, `${'*'.repeat(user.full_name.length)}`)
                }
              </span>
              <span className="widget-sm__user-title">Thành viên</span>
            </div>
            <button
              className={`widget-sm__button ${display && 'active'}`}
              onClick={handleDisplay}
            >
              <Visibility className="widget-sm__icon" />
              Display
            </button>
          </li>)
        ))}

      </ul>
    </div>
  )
}

export default memo(WidgetSm)
