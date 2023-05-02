import CreateUser from '../../Components/CreateUser/CreateUser'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { memo, useEffect } from 'react'

const CreateUserPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Thêm mới người dùng'
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
                    <CreateUser />
                </div>
            </div>
        </>
    )
}

export default memo(CreateUserPage)

