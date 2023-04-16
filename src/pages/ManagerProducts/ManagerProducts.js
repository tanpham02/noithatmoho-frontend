import { useEffect, useContext } from 'react'
import ManagerProducts from '../../Components/ManagerProducts/ManagerProducts'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { THEME_DARK } from '../../reducers/actions'
import { themeProvider } from '../../context/ProviderTheme/ProviderTheme'

const ManagerProductsPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Sản phẩm'
    }, [])

    const themPage = useContext(themeProvider)
    const [state, dispatch] = themPage

    const { currentTheme } = state

    return (
        <>
            <Topbar currentTheme={currentTheme} dispatch={dispatch} />
            <div className={`container-admin ${currentTheme === THEME_DARK && 'active'}`}>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <ManagerProducts />
                </div>
            </div>
        </>
    )
}

export default ManagerProductsPage