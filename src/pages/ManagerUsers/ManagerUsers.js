import { useEffect, useContext, memo } from 'react'
import ManagerUsers from '../../Components/ManagerUsers/ManagerUsers'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { themeProvider } from '../../context/ProviderTheme/ProviderTheme'
import { THEME_DARK } from '../../reducers/actions'

const ManagerUsersPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Người dùng'
    }, [])


    const themePage = useContext(themeProvider)
    const [state, dispatch] = themePage
    const { currentTheme } = state

    return (
        <>
            <Topbar currentTheme={currentTheme} dispatch={dispatch} />
            <div className={`container-admin ${currentTheme === THEME_DARK ? 'active' : ''}`}>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <ManagerUsers />
                </div>
            </div>
        </>
    )
}

export default memo(ManagerUsersPage)