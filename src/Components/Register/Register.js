import { useState, useCallback, memo, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import RegisterPhone from './RegisterPhone'
import RegisterEmail from './RegisterEmail'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Register.scss'
import axios from 'axios'

const checkTypes = [
    {
        type: 'radio',
        name: 'Đăng kí bằng email',
        desc: 'create-account_by-email'
    },
    {
        type: 'radio',
        name: 'Đăng kí bằng số điện thoại',
        desc: 'create-account_by-phonenumber'
    }
]

const Register = () => {
    const [checkedType, setCheckedType] = useState(0)
    const [checkedGender, setcheckedGender] = useState(0)
    const [showRegisterPhone, setShowRegisterPhone] = useState(false)
    const [showRegisterEmail, setShowRegisterEmail] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])

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


    const handleChangeType = useCallback((index) => {
        setCheckedType(index)
        if (index === 1) {
            setShowRegisterPhone(!showRegisterPhone)
            setShowRegisterEmail(!showRegisterEmail)
            return
        }
        //return early
        setShowRegisterPhone(false)
        setShowRegisterEmail(true)
    }, [showRegisterPhone, showRegisterEmail])

    const handleChangeGender = useCallback((index) => {
        setcheckedGender(index)
    }, [])

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
                    <div className="register">
                        <div className="grid">
                            <div className="grid__row no-wrap">
                                <div className="grid__col-2">
                                    <div className="heading py--100">
                                        <h1 className="heading-account">Tạo tài khoản</h1>
                                        <span className="heading-description">Đăng ký tài khoản chỉ trong 1 phút để tích lũy điểm và nhận ưu đãi từ MOHO.</span>
                                        <span className="heading-line"></span>
                                        <div className="login-with mt--38">
                                            <GoogleLogin
                                                clientId='273310959546-ih5nf3j8me1j68112tuk6ummroecml7s.apps.googleusercontent.com'
                                                onSuccess={onSuccess}
                                            />
                                            <FacebookLogin
                                                appId="191172777186900"
                                                autoLoad={true}
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                textButton='Đăng nhập với Facebook'
                                                cssClass='login-with__facebook'
                                                icon='fa-brands fa-facebook'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-col-2">
                                    <div className="create-account py--100 border--left">
                                        <ul className="create-account__list-types">
                                            {checkTypes.map((check, index) => (
                                                <li
                                                    className={`create-account__item-type ${check.name === 'Đăng kí bằng email' && 'mr--90'}`}
                                                    key={index}
                                                >
                                                    <input
                                                        type={check.type}
                                                        id={check.desc}
                                                        name={check.desc}
                                                        checked={checkedType === index}
                                                        onChange={() => handleChangeType(index)}
                                                    />
                                                    <label htmlFor={check.desc}>{check.name}</label>
                                                </li>
                                            ))}
                                        </ul>

                                        {showRegisterEmail &&
                                            <RegisterEmail
                                                checkedGender={checkedGender}
                                                handleChangeGender={handleChangeGender}
                                            />
                                        }

                                        {showRegisterPhone && <RegisterPhone />}

                                        <Link to="/" className="back-home" style={{ color: '#000' }}>
                                            <i className="fa fa-long-arrow-left back-home__icon"></i>
                                            Quay lại trang chủ
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="register">
                        <div className="grid">
                            <div className="grid__row no-wrap">
                                <div className="grid__col-2">
                                    <div className="heading py--100">
                                        <h1 className="heading-account">Tạo tài khoản</h1>
                                        <span className="heading-description">Đăng ký tài khoản chỉ trong 1 phút để tích lũy điểm và nhận ưu đãi từ MOHO.</span>
                                        <span className="heading-line"></span>
                                        <div className="login-with mt--38">
                                            <GoogleLogin
                                                clientId='273310959546-ih5nf3j8me1j68112tuk6ummroecml7s.apps.googleusercontent.com'
                                                onSuccess={onSuccess}
                                            />

                                            <FacebookLogin
                                                appId="191172777186900"
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                textButton='Đăng nhập với Facebook'
                                                cssClass='login-with__facebook'
                                                icon='fa-brands fa-facebook'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-col-2">
                                    <div className="create-account py--100 border--left">
                                        <ul className="create-account__list-types">
                                            {checkTypes.map((check, index) => (
                                                <li
                                                    className={`create-account__item-type ${check.name === 'Đăng kí bằng email' && 'mr--90'}`}
                                                    key={index}
                                                >
                                                    <input
                                                        type={check.type}
                                                        id={check.desc}
                                                        name={check.desc}
                                                        checked={checkedType === index}
                                                        onChange={() => handleChangeType(index)}
                                                    />
                                                    <label htmlFor={check.desc}>{check.name}</label>
                                                </li>
                                            ))}
                                        </ul>

                                        {showRegisterEmail &&
                                            <RegisterEmail
                                                checkedGender={checkedGender}
                                                handleChangeGender={handleChangeGender}
                                            />
                                        }

                                        {showRegisterPhone && <RegisterPhone />}

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

export default memo(Register)