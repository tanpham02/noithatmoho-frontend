import ManagerProducts from '../../Components/ManagerProducts/ManagerProducts'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'

const ManagerProductsPage = () => {
    return (
        <>
            <Topbar />
            <div className='container-admin'>
                <SideBarAdmin />
                <div className='home-addmin'>
                    <ManagerProducts />
                </div>
            </div>
        </>
    )
}

export default ManagerProductsPage