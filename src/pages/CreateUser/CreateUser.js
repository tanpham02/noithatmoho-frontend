import CreateUser from '../../Components/CreateUser/CreateUser'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { useEffect } from 'react'

const CreateUserPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Thêm mới người dùng'
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

export default CreateUserPage

