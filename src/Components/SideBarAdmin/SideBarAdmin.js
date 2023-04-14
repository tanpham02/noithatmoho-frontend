import { useState, useEffect } from 'react'
import {
    HouseOutlined

} from "@material-ui/icons";
import './SideBarAdmin.scss'
import { Link } from "react-router-dom";

const SideBarAdmin = ({ listPage }) => {
    const [active, setActive] = useState(window.location.pathname)


    const handleActive = (path) => {
        setActive(path)
    }


    return (
        <div className="sidebar">
            <div className="sidebar__wrapper">
                <div className="sidebar__menu">
                    <h3 className="sidebar__title mb--10">Dashboard</h3>
                    <ul className="sidebar__list">
                        <li className={`sidebar__list-item ${active === '/admin' && 'active'}`}>
                            <Link
                                to="/admin"
                                className="link"
                                onClick={() => handleActive('/admin')}
                            >
                                <HouseOutlined className="sidebar-icon" />
                                Trang Chủ
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebar__title">Quản Lý</h3>
                    <ul className="sidebar__list">
                        {listPage.map((itemPage, index) => (
                            <li
                                key={index}
                                className={`sidebar__list-item ${active === itemPage.path && 'active'}`}
                            >
                                <Link
                                    onClick={() => handleActive(itemPage.path)}
                                    to={itemPage.path}
                                    className="link"
                                >
                                    <itemPage.icon className="sidebar-icon" />
                                    {itemPage.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default SideBarAdmin