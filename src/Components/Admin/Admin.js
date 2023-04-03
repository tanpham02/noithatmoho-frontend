import SideBarAdmin from '../SideBarAdmin/SideBarAdmin'
import Chart from '../Chart/Chart'
import FeaturedInfo from '../FeaturedInfo/FeaturedInfo'
import Topbar from '../Topbar/Topbar'
import WidgetSm from '../WidgetSm/WidgetSm'
import WidgetLg from '../WidgetLg/WidgetLg'
import './Admin.css'


const Admin = () => {
    return (
        <>
        <Topbar />
        <div className='container-admin'>
            <SideBarAdmin />
            <div className='home-addmin'>
                <FeaturedInfo />
                <Chart />
                <div className='homeWidgets'>
                    <WidgetSm />
                    <WidgetLg />
                </div>
            </div>
        </div>
        </>
    )
}

export default Admin