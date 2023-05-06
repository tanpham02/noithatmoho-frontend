import { useState, useEffect, memo, useCallback } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PhoneAndroid
} from "@material-ui/icons";
import './DetailUser.scss'

const DetailUser = () => {
    const [user, setUser] = useState({})
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const id = window.location.pathname.split('/')[3]
        async function fetchData() {
            const res = await axios.get(`https://noithatmoho-backend.up.railway.app/api/users/${id}`)
            const datas = res.data
            setUser({ ...datas })
        }
        fetchData()

    }, [window.location.pathname])

    const checkOutToast = useCallback(() =>
        toast.info('Cập nhật thành công', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        }),
        [])

    useEffect(() => {
        if (user) {
            if (user.full_name) {
                setFullName(user.full_name)
            }
            if (user.email) {
                setEmail(user.email)
            }
            if (user.phone_number) {
                setPhoneNumber(user.phone_number)
            }
            if (user.birthday) {
                setBirthday(user.birthday)
            }
            if (user.address) {
                setAddress(user.address)
            }
            if (String(user.is_admin)) {
                setIsAdmin(String(user.is_admin))
            }
        }
    }, [user])


    const handleUpdateUser = (e) => {
        e.preventDefault()

        const dataUpdate = {
            ...user,
            full_name: fullName,
            email,
            phone_number: phoneNumber,
            birthday,
            address,
            is_admin: isAdmin ? parseInt(isAdmin) : 0
        }

        setIsLoading(true)
        async function updateUser() {
            const res = await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${user.id}`, dataUpdate)
            setIsLoading(false)
            checkOutToast()
            window.setTimeout(() => {
                window.location.reload()
            }, 2800)
            return res
        }
        if (window.confirm(`Bạn có chắc chắn muốn cập nhật thông tin của ${fullName}?`) === true) {
            updateUser()
            return
        } else {
            setIsLoading(false)
            return
        }

    }

    return (
        <>
            <div className="user">
                <h1 className="userTitle">Chỉnh sửa người dùng</h1>
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
                                    <i style={{ color: '#fff' }} className="fa-regular fa-user"></i>
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
                        <form className="userUpdateForm" onSubmit={handleUpdateUser}>
                            <div className="userUpdateLeft">
                                <div className="userUpdateItem">
                                    <label>Tên đầy đủ</label>
                                    <input
                                        type="text"
                                        name='name'
                                        required
                                        placeholder={user.full_name}
                                        className="userUpdateInput"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={user.email}
                                        name='email'
                                        className="userUpdateInput"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={user.phone_number}
                                        name='phone'
                                        className="userUpdateInput"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Ngày sinh</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={user.birthday}
                                        name='birthday'
                                        className="userUpdateInput"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={user.address}
                                        name='address'
                                        className="userUpdateInput"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Vai trò</label>
                                    <input
                                        type="text"
                                        placeholder={String(user.is_admin)}
                                        name='role'
                                        className="userUpdateInput"
                                        value={String(isAdmin)}
                                        onChange={e => setIsAdmin(e.target.value)}
                                    />
                                    <span className='isZero'>Có thể bỏ trống nếu là 0</span>
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
                                            <i style={{ color: '#fff' }} className="fa-regular fa-user"></i>
                                        </div>
                                    }
                                </div>
                                <button
                                    type='submit'
                                    className="btn userUpdateButton"
                                >
                                    {isLoading ?
                                        <div class="admin-product-lds-dual-ring"></div> :
                                        'Update'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default memo(DetailUser)