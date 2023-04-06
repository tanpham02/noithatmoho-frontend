import CreateProduct from '../../Components/CreateProduct/CreateProduct'
import SideBarAdmin from '../../Components/SideBarAdmin/SideBarAdmin'
import Topbar from '../../Components/Topbar/Topbar'
import { useEffect } from 'react'

const CreateProductPage = ({ listPage }) => {
    useEffect(() => {
        document.title = 'Nội thất MOHO | Thêm mới sản phẩm'
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
                    <CreateProduct />
                </div>
            </div>
        </>
    )
}

export default CreateProductPage

