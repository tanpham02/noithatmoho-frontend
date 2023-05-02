import DetailUser from '../../Components/DetailUser/DetailUser'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { memo, useEffect } from 'react'

const DetailUserPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Chi tiết người dùng'
    }, [])
    useEffect(() => {
        window.scroll(0, 0)
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

export default memo(DetailUserPage)

