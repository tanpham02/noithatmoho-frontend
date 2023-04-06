import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import './DetailUser.scss'

const DetailUser = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const id = window.location.pathname.split('/')[3]
        async function fetchData() {
            const res = await axios.get(`http://localhost:9080/api/users/${id}`)
            const datas = res.data
            setUser(datas)
        }
        fetchData()

    }, [window.location.pathname])

    console.log(user)

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Chỉnh sửa người dùng</h1>

            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        {user.avatar ?

                            <img
                                style={{
                                    border: '1.5px solid #ebebeb'
                                }}
                                src={user.avatar}
                                alt=""
                                className="userShowImg"
                            /> :

                            <div style={{
                                width: '32px',
                                height: '32px',
                                lineHeight: '32px',
                                borderRadius: '50%',
                                textAlign: 'center',
                                background: '#d8d8d8',
                                color: '#afafaf',
                                fontSize: '1.2rem',
                                marginRight: '-10px',
                                border: '1.5px solid #ebebeb'
                            }}
                                className="checkout__info-avata"
                            >
                                <i className="fa-regular fa-user"></i>
                            </div>}

                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.full_name}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Chi tiết tài khoản</span>

                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.birthday}</span>
                        </div>
                        <span className="userShowTitle">Chi tiết liên hệ</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.phone_number}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.address}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Chỉnh sửa</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Tên đầy đủ</label>
                                <input
                                    type="text"
                                    name='name' 
                                    placeholder={user.full_name}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={user.email}
                                    name='email'
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    placeholder={user.phone_number}
                                    name='phone'
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Ngày sinh</label>
                                <input
                                    type="text"
                                    placeholder={user.birthday}
                                    name='birthday'
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    placeholder={user.address}
                                    name='address'
                                    className="userUpdateInput"
                                />
                            </div>
                        </div>

                        <div className="userUpdateRight">
                            <div className="userUpdateUpload"
                            >
                                {user.avatar ?
                                    <img
                                        style={{
                                            border: '1.5px solid #ebebeb'
                                        }}
                                        className="userUpdateImg"
                                        src={user.avatar}
                                        alt=""
                                    /> :
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        lineHeight: '100px',
                                        borderRadius: '10px',
                                        textAlign: 'center',
                                        background: '#d8d8d8',
                                        color: '#afafaf',
                                        fontSize: '3.5rem',
                                        marginRight: '10px',
                                    }}
                                        className="checkout__info-avata"
                                    >
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                }
                            </div>
                            <button className="btn userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DetailUser