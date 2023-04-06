import DetailUser from '../../Components/DetailUser/DetailUser'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { useEffect } from 'react'

const DetailUserPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Chi tiết người dùng'
    }, [])
    return (
        <>
            <Topbar />
            <div className='container-admin'>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <DetailUser />
                </div>
            </div>
        </>
    )
}

export default DetailUserPage

