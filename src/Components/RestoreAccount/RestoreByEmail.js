import axios from "axios"
import { useState, memo, useEffect, useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom"

const RestoreByEmail = () => {

    const [datas, setDatas] = useState([])
    const [email, setEmail] = useState('')
    const [newPassWord, setNewPassWord] = useState('')
    const [isSendOtp, setIsSendOtp] = useState(true)
    const [otp, setOtp] = useState('')
    const [id, setId] = useState()
    const [user, setUser] = useState({})
    const [showInputPassW, setShowInputPassW] = useState(false)
    const [showInputOtp, setShowInputOtp] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const [notExist, setNotExist] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
            const data = await res.data
            setDatas(data)
        }
        fetchData()
    }, [otp])

    const checkOutToast = useCallback(() =>
        toast.info('Cập nhật mật khẩu thành công.', {
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


    const handleSendOtp = (e) => {

        async function fetchData() {
            await axios.post(`https://noithatmoho-backend.up.railway.app/api/sendOTPRestoreAccountByEmail`, {
                email
            })
            return
        }

        if (email) {
            e.preventDefault()
            const output = datas.filter(user => {
                setId(user.id)
                return user.email === email.trim()
            })
            if (output.length) {
                setIsSendOtp(false)
                setShowInputOtp(true)
                fetchData()
                return
            } else {
                setNotExist(true)
                setShowInputOtp(false)
                return
            }
        } else {
            setIsSendOtp(true)
            setNotExist(false)
            setShowInputOtp(false)
            return
        }
    }


    const handleOTP = (e) => {
        if (otp) {
            e.preventDefault()
            const users = datas?.filter(user => user?.otp === otp.trim())
            const user = users.find(user => user?.otp)
            setUser({ ...user })
            if (user?.otp === otp.trim()) {
                setShowInputPassW(true)
                setShowInputOtp(false)
                setErrMsg(false)
                async function fetchData() {
                    await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${user?.id}`, {
                        ...user,
                        otp: ''
                    })
                }
                fetchData()

            } else {
                setShowInputPassW(false)
                setShowInputOtp(true)
                setErrMsg(true)
            }
        }
    }

    const handleUpdateNewPassW = (e) => {
        const regexPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (newPassWord) {
            e.preventDefault()
            if (regexPass.test(newPassWord)) {
                setIsLoading(true)
                async function resetPassword() {
                    await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${user.id}`,
                        {
                            ...user,
                            password: newPassWord,
                            otp: null
                        })
                    setIsLoading(false)
                    setErrorPass(false)
                    checkOutToast()
                    setTimeout(() => {
                        window.location.replace('/')
                    }, 3000)
                    return
                }
                resetPassword()
            } else {
                return setErrorPass(true)
            }
        }
    }
    return (
        <>
            <form>
                {isSendOtp && <div className="form-group">
                    <label htmlFor="restore-email"></label>
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        id="restore-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onInput={() => setNotExist(false)}
                    />
                    {notExist && <span className="errorMsg">Email không đúng hoặc không tồn tại!</span>}
                </div>}


                {showInputOtp && <div className="form-group">
                    <label htmlFor="restore-otp"></label>
                    <input
                        type="text"
                        required
                        placeholder="Nhập OTP"
                        id="restore-otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onInput={() => setErrMsg(false)}
                    />
                </div>}

                {errMsg &&
                    <span
                        style={{ margin: '-23px 0 17px 0', display: 'block' }}
                        className="errorMsg"
                    >
                        OTP không đúng. Vui lòng nhập chính xác OTP
                    </span>
                }

                {showInputOtp && <span className="mess-submit">
                    <i className="fa-solid fa-arrow-right"></i>
                    Chúng tôi đã gửi mã xác nhận đến {'*'.repeat(email.search('@gmail.com') - 4) + email.slice(email.search('@gmail.com') - 4)}
                </span>}

                {showInputPassW && <div className="form-group">
                    <label htmlFor="reset-password"></label>
                    <input
                        type="password"
                        required
                        placeholder="Nhập mật khẩu mới"
                        id="reset-password"
                        value={newPassWord}
                        onChange={(e) => setNewPassWord(e.target.value)}
                        onInput={() => setErrorPass(false)}
                    />
                    {errorPass && <span className="errorMsg">Mật khẩu phải từ 8 ký tự, ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số và 1 kí tự đặc biệt</span>}
                </div>}



                <div className="policy">
                    Website được bảo vệ bởi reCAPTCHA và
                    <Link to="https://policies.google.com/privacy" style={{ color: '#2962ff' }}> Chính sách bảo mật </Link>
                    và <Link to="https://policies.google.com/terms" style={{ color: '#2962ff' }}>Điều khoản dịch vụ</Link> của Google.
                </div>

                {isSendOtp && <button type="submit" onClick={handleSendOtp} className="btn btn-register">GỬI MÃ XÁC NHẬN</button>}
                {showInputOtp && <button type="submit" onClick={handleOTP} className="btn btn-register">GỬI</button>}
                {showInputPassW &&
                    <button
                        type="submit"
                        onClick={handleUpdateNewPassW}
                        className="btn btn-register"
                    >
                        {isLoading ?
                            <span className="loader-register">Loading</span> :
                            'CẬP NHẬT'
                        }

                    </button>
                }
            </form>
            <ToastContainer />
        </>
    )

}

export default memo(RestoreByEmail)