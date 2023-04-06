import DetailProductAdmin from '../../Components/DetailProductAdmin/DetailProductAdmin'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { useEffect } from 'react'

const DetailProductAdminPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Chi tiết sản phẩm'
    }, [])
    return (
        <>
            <Topbar />
            <div className='container-admin'>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <DetailProductAdmin />
                </div>
            </div>
        </>
    )
}

export default DetailProductAdminPage

