import { useEffect } from 'react'
import ManagerUsers from '../../Components/ManagerUsers/ManagerUsers'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'

const ManagerUsersPage = ({listPage}) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Người dùng'
    }, [])
    return (
        <>
            <Topbar />
            <div className='container-admin'>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <ManagerUsers />
                </div>
            </div>
        </>
    )
}

export default ManagerUsersPage