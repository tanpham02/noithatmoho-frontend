import { useState, useMemo, useEffect, memo, useCallback } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'


const RegisterPhone = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showInput, setShowInput] = useState(false)
    const [falseOtp, setFalseOtp] = useState(false)
    const [validatePhone, setValidatePhone] = useState(true)
    const [validateOTP, setValidateOTP] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [PhonePassW, setPhonePassW] = useState(false)
    const [datas, setDatas] = useState([])
    const [existPhone, setExistPhone] = useState(false)
    const [passwordByPhone, setPasswordByPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorValidatePass, setErrorValidatePass] = useState(false)


    const handlePhoneNumberChange = (e) => {
        setExistPhone(false)

        setPhoneNumber(e.target.value);
        if (phoneNumber) {
            setValidatePhone(handleValidataPhone)
        }
    };

    const checkOutToast = useCallback(() =>
        toast.info('Đăng kí thành công.', {
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
        const phoneNumberRegex = /^[0-9]+$/
        const phoneRegex = /[a-zA-Z]/
        if (phoneNumberRegex) {
            return phoneNumberRegex.test(phoneNumber.trim())
        }
        if (phoneRegex) {
            return false
        }
    }, [phoneNumber])

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSendOtp = (e) => {
        e.preventDefault()
        setShowMessage(true)

        let flag = false

        if (phoneNumber === '' || flag) {
            setShowInput(false)
            setValidatePhone(handleValidataPhone)
            flag = true
            return flag;
        }

        if (phoneNumber.length <= 7 && !flag) {
            setValidatePhone(false)
            setShowInput(false)
            return flag
        }


        if (datas.length) {
            datas.filter(data => {
                async function a() {
                    if (data.phone_number) {
                        if (data.phone_number.trim() === phoneNumber.trim()) {
                            setExistPhone(true)
                            flag = true
                            return flag
                        }
                    }
                }
                a()
            })
        }

        if (handleValidataPhone) {
            if (phoneNumber !== '' && !flag) {
                setShowInput(true)
                axios.post('https://noithatmoho-backend.up.railway.app/api/send-otp-sms', {
                    phone_number: `+84${phoneNumber.slice(1)}`
                })
                    .then(response => {
                        if (response !== '') {
                            console.log(response.data)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        } else {
            setValidatePhone(false)
        }
        return flag


    }


    const handleEnterOTP = (e) => {
        e.preventDefault()

        if (otp === '') {
            setValidateOTP(true)
            return;
        }

        const output = datas.filter(data => data.otp)
        if (output.length) {
            output.filter(otpData => {
                if (otp === otpData.otp && otpData.phone_number === phoneNumber) {
                    setPhonePassW(true)
                    setShowInput(false)
                    setFalseOtp(false)
                    async function removeOtp() {
                        await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${otpData.id}`, {
                            ...otpData,
                            otp: ''
                        })
                    }
                    removeOtp()
                    return phoneNumber
                }   
                if (otp !== otpData.otp) {
                    setFalseOtp(true)
                    return -1
                }
            })
        } else {
            console.log('OTP Invalid!')
        }


    }

    const handleInputOTP = () => {
        setExistPhone(false)
        setFalseOtp(false)
    }

    const handleInputPhoneNum = () => {
        setValidatePhone(true)
    }


    const handleReisterWithPhone = (e) => {
        e.preventDefault()
        const regexPassW = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (regexPassW.test(passwordByPhone)) {
            const output = datas.filter(data => data.phone_number === phoneNumber)
            if (output.length) {
                setIsLoading(true)
                async function insertUserByPhone() {
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
                insertUserByPhone()
            }
        } else {
            setErrorValidatePass(true)
            return
        }
    }

    return (

        <>
            <form>
                {PhonePassW || (!showInput && (<div className="form-group input-otp">
                    <label htmlFor="phone-number"></label>
                    <input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        id="phone-number"
                        name="phone-number"
                        value={phoneNumber.trim()}
                        onChange={handlePhoneNumberChange}
                        onInput={handleInputPhoneNum}
                    />
                    {!validatePhone && (
                        <span className="errorMsg">{phoneNumber === '' ? 'Required' : 'Số điện thoại phải là chữ số và tối thiểu 8 chữ số'}</span>
                    )}
                    {existPhone && <span className="errorMsg">Số điện thoại đã được sử dụng</span>}
                </div>))}



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
                            onChange={handleOtpChange}
                            onInput={handleInputOTP}
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
                                Chúng tôi đã gửi mã xác nhận đến số điện thoại  {'*'.repeat(+ phoneNumber.length - 3) + phoneNumber.slice(-3)}
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



                <div className="policy" style={{ marginTop: '16px' }}>
                    Website được bảo vệ bởi reCAPTCHA và
                    <Link to="https://policies.google.com/privacy"> Chính sách bảo mật </Link>
                    và <Link to="https://policies.google.com/terms">Điều khoản dịch vụ</Link> của Google.
                </div>



                {PhonePassW || (!showInput && (<button className="btn btn-register__phone my--22" onClick={handleSendOtp}>
                    GỬI MÃ OTP
                </button>))}
                {showInput && (<button className="btn btn-register__phone my--22" onClick={handleEnterOTP}>
                    GỬI
                </button>)}

                {PhonePassW && (<button className="btn btn-register__phone my--22" onClick={handleReisterWithPhone}>
                    {isLoading ?
                        <span class="loader-register">Loading</span> :
                        'ĐĂNG KÝ'
                    }
                </button>)}
            </form>
            <ToastContainer />
        </>
    )
}

export default memo(RegisterPhone)