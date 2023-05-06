import { useState, useEffect, useCallback, memo } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import './Login.scss'

const Login = ({ onGetDataAuthor, fixedHeader }) => {
    const [emailOrPhonenumber, setEmailOrPhonenumber] = useState('')
    const [password, setPassWord] = useState('')
    const [datas, setDatas] = useState([])
    const [errorMes, setErrorMes] = useState(false)
    const [dataLogins, setDataLogins] = useState([])
    const [isLogin, setisLogin] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
            const data = await res.data
            setDatas([...data])
        }
        fetchData()
    }, [emailOrPhonenumber])


    useEffect(() => {
        if (dataLogins.length) {
            dataLogins.forEach(dataLogin => {
                const output = datas.filter(data => {
                    if (dataLogin.email) {
                        if (data.email === dataLogin.email) {
                            return data
                        } else {
                            return 0
                        }
                    }

                    if (data.phone_number) {
                        const x = String(data.phone_number)
                        // const stringPhone = `0${x.slice(3)}`
                        if (x.trim() === (dataLogin.phone_number).trim()) {
                            return dataLogin
                        } else {
                            return 0
                        }
                    }

                })


                if (output.length) {
                    onGetDataAuthor(output)
                    output.forEach(data => localStorage.setItem('fullNameAccount', JSON.stringify(data.full_name || data.phone_number)))
                    output.forEach(data => localStorage.setItem('idUser', JSON.stringify(data.id)))
                }
            })
        }
    }, [dataLogins, datas])


    const handleSubmit = useCallback((e) => {
        setisLogin(false)
        if (emailOrPhonenumber !== '' && password !== '') {
            e.preventDefault()
            if (datas.length) {
                const output = datas.filter(data => {
                    let flag = false;
                    // const x = String(data.phone_number)
                    // const stringPhone = `0${x.slice(3)}`
                    if (((emailOrPhonenumber.trim() === data.email && password.trim() === data.password) || (emailOrPhonenumber.trim() === String(data.phone_number).trim() && password.trim() === data.password)) && !flag) {
                        setErrorMes(false)
                        const regexPhone = /^[0-9]+$/
                        const check = regexPhone.test(emailOrPhonenumber) ? 'phone_number' : 'email'

                        const dataLogin = {
                            [check]: emailOrPhonenumber,
                            password: password
                        }

                        setDataLogins([dataLogin])
                        setisLogin(true)

                        setIsLoading(true)
                        async function LoginData() {
                            await axios.post('https://noithatmoho-backend.up.railway.app/api/login', dataLogin)
                            datas.filter(user => {
                                if (user.email === emailOrPhonenumber || user.phone_number === emailOrPhonenumber) {
                                    if (user) {
                                        if (user.is_admin === 1) {
                                            window.location.replace('/admin')
                                            return user
                                        }
                                        window.location.replace('/')
                                        return user
                                    }
                                }
                            })
                            setIsLoading(false)
                        }
                        LoginData()
                        return data
                    }
                    return flag
                })

                if (output.length <= 0) {
                    setErrorMes(true)
                    e.preventDefault()
                }
            }

        }
    }, [datas, emailOrPhonenumber, password])

    useEffect(() => {
        localStorage.setItem('isLogin', JSON.stringify(isLogin))
    }, [isLogin])


    return (
        <div
            className={`form-login ${fixedHeader && 'active'}`}
            onClick={(e) => e.stopPropagation()}
        >
            <form id="form-login">
                <div className="form-login__heading">
                    <h2>Đăng nhập tài khoản</h2>
                    <p>Nhập email và mật khẩu của bạn</p>
                </div>

                {errorMes && (
                    <span className="errorMsg login">Email hoặc mật khẩu không đúng</span>
                )}
                <div className="form-group login ">
                    <label htmlFor='email-or-phone-number'>
                    </label>
                    <input
                        type='text'
                        name='email-or-phone-number'
                        id='email-or-phone-number'
                        placeholder='Nhập email hoặc số điện thoại'
                        value={emailOrPhonenumber}
                        required
                        onChange={(e) => setEmailOrPhonenumber(e.target.value)}
                        onInput={() => setErrorMes(false)}
                    />
                </div>

                <div className="form-group login">
                    <label htmlFor='password'>
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Nhập mật khẩu'
                        value={password}
                        required
                        onChange={(e) => setPassWord(e.target.value)}
                        onInput={() => setErrorMes(false)}
                    />

                </div>

                <div className="policy policy--alignment">
                    Website được bảo vệ bởi reCAPTCHA và
                    <Link to="https://policies.google.com/privacy"> Chính sách bảo mật </Link>
                    và <Link to="https://policies.google.com/terms">Điều khoản dịch vụ</Link> của Google.
                </div>
                <button
                    className="btn btn-login"
                    type='submit'
                    onClick={handleSubmit}
                >
                    {isLoading ?
                        <span class="loader-login">Loading</span> :
                        'Đăng nhập'
                    }
                </button>
            </form>

            <div className="orther-option">
                <p className="mb--6">
                    Khách hàng mới?
                    <Link to="/account/register"> Tạo tài khoản</Link>
                </p>
                <p>
                    Quên mật khẩu?
                    <Link to="/account/restore-account"> Khôi phục tài khoản</Link>
                </p>
            </div>
        </div>
    )
}

export default memo(Login)