import { memo, useEffect, useState } from 'react'
import "./WidgetLg.scss";
import axios from 'axios';

const WidgetLg = ({ currentTheme, THEME_DARK }) => {

  const [userDatas, setUserData] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
      const data = await res.data
      setUserData(data)
    }
    getData()
  }, [])

  return (
    <div className={`widget-lg ${currentTheme === THEME_DARK && 'active'}`}>
      <h3 className={`widget-lg__title ${currentTheme === THEME_DARK && 'active'}`}>Đơn hàng gần đây</h3>
      <table className="widget-lg__table">
        <tr className={`widget-lg__tr ${currentTheme === THEME_DARK && 'active'}`}>
          <th className="widget-lg__th">Tên khách hàng</th>
          <th className="widget-lg__th">Ngày</th>
          <th className="widget-lg__th">Tổng giá trị đơn hàng (VND)</th>
        </tr>

        {userDatas && userDatas.map((user, index) =>
          (user.is_admin === 0 && user?.checkout) && (
            <tr className={`widget-lg__tr ${currentTheme === THEME_DARK && 'active'}`} key={index}>
              <td className="widget-lg__user">
                <img
                  src={user.avatar}
                  alt={user.full_name}
                  className="widget-lg__img"
                />
                <span className="widget-lg__name">{user.full_name}</span>
              </td>
              <td className="widget-lg__date">{user.checkout?.split('; ')[7]}</td>
              <td className="widget-lg__amount"
                style={{
                  position: 'relative'
                }}
              >{
                  user?.checkout &&
                  parseInt(user.checkout?.split('; ')[6].split(',').join('').slice(0, -1)).toLocaleString('ev-vi')
                }
                <span className='VND'
                  style={{
                    position: 'absolute',
                    top: '12px',
                    fontSize: '1.1rem'
                  }}
                >
                  ₫</span>
              </td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default memo(WidgetLg)
