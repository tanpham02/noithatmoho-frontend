import { useEffect, useState, memo, useContext } from 'react'
import { themeProvider } from '../../context/ProviderTheme/ProviderTheme'
import axios from 'axios'
import SideBarAdmin from '../SideBarAdmin/SideBarAdmin'
import Chart from '../Chart/Chart'
import FeaturedInfo from '../FeaturedInfo/FeaturedInfo'
import Topbar from '../Topbar/Topbar'
import WidgetSm from '../WidgetSm/WidgetSm'
import WidgetLg from '../WidgetLg/WidgetLg'
import './Admin.scss'
import { THEME_DARK } from '../Topbar/Topbar'



const Admin = ({ listPage }) => {

    const [userDatas, setUserData] = useState([])
    const themePage = useContext(themeProvider)

    const [state, dispatch] = themePage
    const { currentTheme } = state

    useEffect(() => {
        async function getData() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
            const data = await res.data
            setUserData(data)
        }
        getData()
    }, [])


    return (
        <div className={`wrapper-theme ${currentTheme === THEME_DARK && 'theme-dark'}`}>
            <Topbar currentTheme={currentTheme} dispatch={dispatch} />
            <div className={`container-admin ${currentTheme === THEME_DARK && 'active'}`}>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <FeaturedInfo userDatas={userDatas} currentTheme={currentTheme} THEME_DARK={THEME_DARK} />
                    <Chart currentTheme={currentTheme} THEME_DARK={THEME_DARK} />
                    <div className='home-widgets'>
                        <WidgetSm currentTheme={currentTheme} THEME_DARK={THEME_DARK} />
                        <WidgetLg currentTheme={currentTheme} THEME_DARK={THEME_DARK} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Admin)