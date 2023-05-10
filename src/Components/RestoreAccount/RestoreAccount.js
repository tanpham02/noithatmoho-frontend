import { useState, memo, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login'
import jwtDecode from 'jwt-decode'
import RestoreByEmail from "./RestoreByEmail"
import RestoreByPhone from "./RestoreByPhone"
import './RestoreAccount.scss'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RestoreAccount = ({ restoreTypes }) => {
    const [checked, setChecked] = useState(0)
    const [showRestoreByEmail, setShowRestoreByEmail] = useState(true)
    const [showRestoreByPhone, setShowRestoreByPhone] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])

    const handleChecked = (index) => {
        setChecked(index)
        if (index === 1) {
            setShowRestoreByEmail(!showRestoreByEmail)
            setShowRestoreByPhone(!showRestoreByPhone)
        } else {
            setShowRestoreByEmail(true)
            setShowRestoreByPhone(false)
        }
    }

    const warningToast = useCallback((e) =>
        toast.warning(`Login with google failure with ${e}`, {
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

    const errorToast = useCallback(() =>
        toast.error(`Login with google failure with error server`, {
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
        const getUsers = async () => {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
            const datas = await res.data
            setUsers(datas)
        }
        getUsers()
    }, [])

    const onSuccess = async (response) => {
        setIsLoading(true)
        try {
            const token = await response
            if (token) {
                const decode = jwtDecode(token.credential)
                const email = decode.email
                const name = decode.name
                const picture = decode.picture

                const getUser = users?.find(user => user.email === email)
                if (getUser) {
                    window.setTimeout(() => {
                        localStorage.setItem('isLogin', JSON.stringify(true))
                        localStorage.setItem('fullNameAccount', JSON.stringify(name))
                        localStorage.setItem('isAdmin', JSON.stringify(getUser.is_admin))
                        localStorage.setItem('idUser', JSON.stringify(getUser.id))
                        setIsLoading(false)
                    }, 1500)

                    window.setTimeout(() => {
                        window.location.replace('/')
                    }, 2000)
                    return
                }
                const newUser = async () => {
                    const res = await axios.post('https://noithatmoho-backend.up.railway.app/api/users', {
                        email,
                        full_name: name,
                        avatar: picture,
                        vouchers: 'MOHO500K, MOHO300K, MOHO200K, MOHO100K, MOHO50K'
                    })
                    localStorage.setItem('isLogin', JSON.stringify(true))
                    localStorage.setItem('fullNameAccount', JSON.stringify(name))
                    localStorage.setItem('isAdmin', JSON.stringify(res.data.is_admin))
                    localStorage.setItem('idUser', JSON.stringify(res.data.id))
                    setIsLoading(false)
                    window.setTimeout(() => {
                        window.location.replace('/')
                    }, 2000)
                    return
                }
                newUser()

            } else {
                console.log('Token Invalid!')
                warningToast('Token Invalid!')
            }



        } catch (err) {
            console.log(err.message)
            errorToast()
        }
    }

    const responseFacebook = async (response) => {
        try {
            setIsLoading(true)
            const profiles = await response
            if (profiles) {
                const getUser = users?.find(user => user.email === profiles.email)
                if (getUser) {
                    window.setTimeout(() => {
                        localStorage.setItem('isLogin', JSON.stringify(true))
                        localStorage.setItem('fullNameAccount', JSON.stringify(profiles.name))
                        localStorage.setItem('isAdmin', JSON.stringify(getUser.is_admin))
                        localStorage.setItem('idUser', JSON.stringify(getUser.id))
                        setIsLoading(false)
                    }, 1500)

                    window.setTimeout(() => {
                        window.location.replace('/')
                    }, 2000)
                    return
                }
                const newUser = async () => {
                    const res = await axios.post('https://noithatmoho-backend.up.railway.app/api/users', {
                        email: profiles.email,
                        full_name: profiles.name,
                        avatar: profiles.picture.data.url,
                        vouchers: 'MOHO500K, MOHO300K, MOHO200K, MOHO100K, MOHO50K'
                    })
                    localStorage.setItem('isLogin', JSON.stringify(true))
                    localStorage.setItem('fullNameAccount', JSON.stringify(profiles.name))
                    localStorage.setItem('isAdmin', JSON.stringify(res.data.is_admin))
                    localStorage.setItem('idUser', JSON.stringify(res.data.id))
                    setIsLoading(false)
                    window.setTimeout(() => {
                        window.location.replace('/')
                    }, 2000)
                    return
                }
                newUser()
            }

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {isLoading ?
                <>
                    <div className={`overlay ${isLoading ? 'active' : ''}`}></div>
                    <span className="loader-login-google"></span>
                    <div className="restore-account">
                        <div className="grid">
                            <div className="grid__row">
                                <div className="grid__col-2">
                                    <div className="heading py--100" >
                                        <h1 className="heading-account">Đăng nhập</h1>
                                        <span className="heading-description">Đăng nhập để tích lũy điểm và nhận ưu đãi từ MOHO.</span>
                                        <span className="heading-line"></span>
                                        <div className="login-with mt--38">
                                            <GoogleLogin
                                                clientId='273310959546-ih5nf3j8me1j68112tuk6ummroecml7s.apps.googleusercontent.com'
                                                onSuccess={onSuccess}
                                            />

                                            <FacebookLogin
                                                appId="191172777186900"
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                textButton='Đăng nhập với Facebook'
                                                cssClass='login-with__facebook'
                                                icon='fa-brands fa-facebook'
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="grid__col-2">
                                    <div className="restore-account py--100" style={{ borderLeft: '1px solid #e3e5ec' }}>
                                        <div className="restore-account__container">
                                            <div className="restore_account__header">
                                                <h2 className="restore_account__title">Khôi phục mật khẩu</h2>
                                            </div>
                                            <ul className="restore-account__list-types">
                                                {restoreTypes.map((type, index) => (
                                                    <li
                                                        className={`restore-account__item-type ${type.type === 'Khôi phục bằng email' && 'create-account--mr-90'}`}
                                                        key={index}
                                                    >
                                                        <input
                                                            type={type["type-input"]}
                                                            required={type.required}
                                                            id={type["className-id-input"]}
                                                            checked={checked === index}
                                                            onChange={() => handleChecked(index)}
                                                        />
                                                        <label htmlFor={type["className-id-input"]}>{type.type}</label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {showRestoreByEmail && <RestoreByEmail />}
                                        {showRestoreByPhone && <RestoreByPhone />}

                                        <Link to="/" className="back-home" style={{ color: '#000' }}>
                                            <i className="fa fa-long-arrow-left back-home__icon"></i>
                                            Quay lại trang chủ
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> :
                <>
                    <div className="restore-account">
                        <div className="grid">
                            <div className="grid__row">
                                <div className="grid__col-2">
                                    <div className="heading py--100" >
                                        <h1 className="heading-account">Đăng nhập</h1>
                                        <span className="heading-description">Đăng nhập để tích lũy điểm và nhận ưu đãi từ MOHO.</span>
                                        <span className="heading-line"></span>
                                        <div className="login-with mt--38">
                                            <GoogleLogin
                                                clientId='273310959546-ih5nf3j8me1j68112tuk6ummroecml7s.apps.googleusercontent.com'
                                                onSuccess={onSuccess}
                                            />

                                            <FacebookLogin
                                                appId="191172777186900"
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                textButton='Đăng nhập với Facebook'
                                                cssClass='login-with__facebook'
                                                icon='fa-brands fa-facebook'
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="grid__col-2">
                                    <div className="restore-account py--100" style={{ borderLeft: '1px solid #e3e5ec' }}>
                                        <div className="restore-account__container">
                                            <div className="restore_account__header">
                                                <h2 className="restore_account__title">Khôi phục mật khẩu</h2>
                                            </div>
                                            <ul className="restore-account__list-types">
                                                {restoreTypes.map((type, index) => (
                                                    <li
                                                        className={`restore-account__item-type ${type.type === 'Khôi phục bằng email' && 'create-account--mr-90'}`}
                                                        key={index}
                                                    >
                                                        <input
                                                            type={type["type-input"]}
                                                            required={type.required}
                                                            id={type["className-id-input"]}
                                                            checked={checked === index}
                                                            onChange={() => handleChecked(index)}
                                                        />
                                                        <label htmlFor={type["className-id-input"]}>{type.type}</label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {showRestoreByEmail && <RestoreByEmail />}
                                        {showRestoreByPhone && <RestoreByPhone />}

                                        <Link to="/" className="back-home" style={{ color: '#000' }}>
                                            <i className="fa fa-long-arrow-left back-home__icon"></i>
                                            Quay lại trang chủ
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </>
            }
        </>
    )
}

export default memo(RestoreAccount)