import ManagerUsers from '../../Components/ManagerUsers/ManagerUsers'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'

const ManagerUsersPage = () => {
    return (
        <>
            <Topbar />
            <div className='container-admin'>
                <SideBarAdmin />
                <div className='home-addmin'>
                    <ManagerUsers />
                </div>
            </div>
        </>
    )
}

export default ManagerUsersPage