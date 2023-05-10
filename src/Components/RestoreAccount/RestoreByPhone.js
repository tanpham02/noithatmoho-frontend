import axios from "axios"
import { memo, useState, useEffect, useMemo, useCallback } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RestoreByPhone = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [PhonePassW, setPhonePassW] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [validatePhone, setValidatePhone] = useState(false)
    const [inputEmpty, setInputEmpty] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [datas, setDatas] = useState([])
    const [existPhone, setExistPhone] = useState(false)
    const [otp, setOtp] = useState('')
    const [falseOtp, setFalseOtp] = useState(false)
    const [validateOTP, setValidateOTP] = useState(false)
    const [passwordByPhone, setPasswordByPhone] = useState('')
    const [errorValidatePass, setErrorValidatePass] = useState(false)


    const checkOutToast = useCallback(() =>
        toast.info('Khôi phục tài khoản thành công.', {
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
        async function fetchData() {
            const res = await axios('https://noithatmoho-backend.up.railway.app/api/users')
            const output = await res.data
            setDatas([...output])
        }
        fetchData()
    }, [otp])

    const handleValidataPhone = useMemo(() => {
        const phoneNumberRegex = /^\d+$/
        return phoneNumberRegex.test(phoneNumber.trim())

    }, [phoneNumber])

    const handelInput = () => {
        setInputEmpty(false)
        setValidatePhone(false)
        setExistPhone(false)
        setFalseOtp(false)
        setValidateOTP(false)
    }

    const handleSendOtp = (e) => {
        e.preventDefault()
        let flag = false
        if (phoneNumber === '') {
            setInputEmpty(true)
            return
        }

        if (!handleValidataPhone) {
            setValidatePhone(true)
            return flag
        }

        if (phoneNumber.length <= 7) {
            setValidatePhone(true)
            return flag
        }

        const users = datas?.filter(user => user.phone_number === phoneNumber.trim())
        if (handleValidataPhone && users.length) {
            if (phoneNumber !== '' && !flag) {
                setShowInput(true)
                setShowMessage(true)
                setExistPhone(false)

                const a = users.find(async user => user.id)
                async function sendOtp() {
                    await axios.post(`https://noithatmoho-backend.up.railway.app/api/send-otp-sms-reset`, {
                        phone_number: `+84${phoneNumber.slice(1)}`,
                        id: a.id
                    })
                }
                sendOtp()

            }
        } else {
            setExistPhone(true)
            return
        }
        return flag
    }

    const handleEnterOTP = (e) => {
        e.preventDefault()
        if (otp === '') {
            setValidateOTP(true)
            return;
        }

        if (datas.length && otp.length) {
            const users = datas?.filter(user => user.otp === otp)
            const user = users.find(user => user.otp)
            if (otp === user?.otp && user.phone_number === phoneNumber) {
                console.log(user)
                setShowMessage(true)
                setFalseOtp(false)
                setValidateOTP(false)
                setPhonePassW(true)
                setShowInput(false)

                async function removeOtp() {
                    await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${user.id}`, {
                        ...user,
                        otp: ''
                    })
                }
                removeOtp()
                return phoneNumber
            }
            if (otp !== user?.otp) {
                setFalseOtp(true)
                return -1
            }
        } else {
            console.log('OTP Invalid!')
        }

    }

    const handleReisterWithPhone = (e) => {
        e.preventDefault()
        const regexPassW = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (regexPassW.test(passwordByPhone)) {
            const output = datas.filter(data => data.phone_number === phoneNumber)
            if (output.length) {
                setIsLoading(true)
                async function ResetUserByPhone() {
                    output.forEach(async user => {
                        await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${user.id}`, {
                            ...user,
                            password: passwordByPhone,
                            vouchers: 'MOHO500K, MOHO300K, MOHO200K, MOHO100K, MOHO50K',
                            otp: ''
                        })
                        setIsLoading(false)
                        return passwordByPhone
                    })
                }
                checkOutToast()
                setTimeout(() => {
                    window.location.replace('/')
                }, 3000)
                ResetUserByPhone()
            }
        } else {
            setErrorValidatePass(true)
            return
        }
    }


    return (
        <>
            <form>
                {PhonePassW || !showInput && <div className="form-group">
                    <label htmlFor="restore-phone"></label>
                    <input
                        type="text"
                        required
                        placeholder="Nhập số điện thoại"
                        id="restore-phone"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        onInput={handelInput}
                    />
                    {validatePhone &&
                        <span className="errorMsg">Số điện thoại phải là chữ số và tối thiểu 8 chữ số</span>
                    }
                    {inputEmpty &&
                        <span className="errorMsg">Required</span>
                    }
                    {existPhone &&
                        <span className="errorMsg">Số điện thoại không tồn tại</span>}

                </div>}

                {showInput &&
                    (<div className="form-group input-otp">
                        <label htmlFor="otp"></label>
                        <input
                            type="text"
                            required
                            placeholder="Nhập OTP"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            onInput={handelInput}

                        />
                        {falseOtp && (
                            <span className="errorMsg"> OTP không đúng. Vui lòng nhập chính xác OTP!</span>
                        )}

                        {validateOTP && (
                            <span className="errorMsg">{otp === '' && 'Required'}</span>
                        )}

                        {showMessage &&
                            <span className="message-send-otp">
                                <i className="fa-solid fa-arrow-right" style={{ marginRight: '4px' }}></i>
                                Chúng tôi đã gửi mã xác nhận đến số điện thoại {'*'.repeat(+ phoneNumber.length - 3) + phoneNumber.slice(-3)}
                            </span>
                        }
                    </div>)
                }

                {PhonePassW && (
                    <div className="form-group input-otp">
                        <label htmlFor="set-password-by-phone"></label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            id="set-password-by-phone"
                            name="set-password-by-phone"
                            value={passwordByPhone}
                            onChange={(e) => setPasswordByPhone(e.target.value)}
                            onInput={() => setErrorValidatePass(false)}
                        />
                    </div>
                )}
                {errorValidatePass &&
                    <span
                        className="errorMsg"
                    >
                        Mật khẩu phải từ 8 ký tự, ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số và 1 kí tự đặc biệt
                    </span>
                }


                <div className="policy mt--22">
                    Website được bảo vệ bởi reCAPTCHA và
                    <Link to="https://policies.google.com/privacy" style={{ color: '#2962ff' }}> Chính sách bảo mật </Link>
                    và <Link to="https://policies.google.com/terms" style={{ color: '#2962ff' }}>Điều khoản dịch vụ</Link> của Google.
                </div>


                {PhonePassW ||
                    (!showInput &&
                        (<button
                            onClick={handleSendOtp}
                            className="btn btn-register__phone my--22"
                        >
                            GỬI MÃ OTP
                        </button>))}
                {showInput &&
                    (<button
                        className="btn btn-register__phone my--22"
                        onClick={handleEnterOTP}
                    >
                        GỬI
                    </button>)}

                {PhonePassW &&
                    (<button
                        className="btn-register"
                        onClick={handleReisterWithPhone}
                    >
                        {isLoading ?
                            <span className="loader-register">Loading</span> :
                            'CẬP NHẬT'
                        }
                    </button>)}
            </form>
            <ToastContainer />
        </>
    )
}

export default memo(RestoreByPhone)