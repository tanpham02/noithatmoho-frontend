import {
    PermIdentity,
    Storefront,
    HouseOutlined,
    StoreRounded

} from "@material-ui/icons";
import './SideBarAdmin.css'
import { Link } from "react-router-dom";

const SideBarAdmin = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/admin" className="link">
                            <li className="sidebarListItem active">
                                <HouseOutlined className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Managers</h3>
                    <ul className="sidebarList">
                        <Link to="/manager-users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/manager-products" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Products
                            </li>
                        </Link>
                        <Link to="/" className="link">
                            <li className="sidebarListItem">
                                <StoreRounded className="sidebarIcon" />
                                View Store
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default SideBarAdmin