import { useEffect, useState, memo } from 'react'
import axios from 'axios'
import SideBarAdmin from '../SideBarAdmin/SideBarAdmin'
import Chart from '../Chart/Chart'
import FeaturedInfo from '../FeaturedInfo/FeaturedInfo'
import Topbar from '../Topbar/Topbar'
import WidgetSm from '../WidgetSm/WidgetSm'
import WidgetLg from '../WidgetLg/WidgetLg'
import './Admin.scss'


const Admin = ({ listPage }) => {

    const [userDatas, setUserData] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:9080/api/users')
            const data = await res.data
            setUserData(data)
        }
        getData()
    }, [])

    
    


    return (
        <>
            <Topbar />
            <div className='container-admin'>
                <SideBarAdmin listPage={listPage} />
                <div className='home-admin'>
                    <FeaturedInfo userDatas={userDatas}/>
                    <Chart />
                    <div className='home-widgets'>
                        <WidgetSm />
                        <WidgetLg/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Admin)