import SideBarAdmin from '../SideBarAdmin/SideBarAdmin'
import Chart from '../Chart/Chart'
import FeaturedInfo from '../FeaturedInfo/FeaturedInfo'
import Topbar from '../Topbar/Topbar'
import WidgetSm from '../WidgetSm/WidgetSm'
import WidgetLg from '../WidgetLg/WidgetLg'
import './Admin.scss'


const Admin = ({listPage}) => {
    return (
        <>
        <Topbar />
        <div className='container-admin'>
            <SideBarAdmin listPage={listPage} />
            <div className='home-admin'>
                <FeaturedInfo />
                <Chart />
                <div className='home-widgets'>
                    <WidgetSm />
                    <WidgetLg />
                </div>
            </div>
        </div>
        </>
    )
}

export default Admin