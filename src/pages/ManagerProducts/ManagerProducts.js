import { useEffect } from 'react'
import ManagerProducts from '../../Components/ManagerProducts/ManagerProducts'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'

const ManagerProductsPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Sản phẩm'
    }, [])
    return (
        <>
            <Topbar />
            <div className='container-admin'>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <ManagerProducts />
                </div>
            </div>
        </>
    )
}

export default ManagerProductsPage