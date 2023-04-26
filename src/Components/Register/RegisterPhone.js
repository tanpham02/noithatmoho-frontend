import { useState, useMemo, useEffect, memo } from "react"
import { Link } from "react-router-dom";
import axios from 'axios'


const RegisterPhone = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showInput, setShowInput] = useState(false)
    const [falseOtp, setFasleOtp] = useState(false)
    const [validatePhone, setValidatePhone] = useState(true)
    const [validateOTP, setValidateOTP] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [PhonePassW, setPhonePassW] = useState(false)
    const [datas, setDatas] = useState([])
    const [existPhone, setExistPhone] = useState(false)
    const [passwordByPhone, setPasswordByPhone] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const handlePhoneNumberChange = (e) => {
        setExistPhone(false)

        setPhoneNumber(e.target.value);
        if (phoneNumber) {
            setValidatePhone(handleValidataPhone)
        }
    };


    useEffect(() => {
        async function fetchData() {
            const res = await axios('http://localhost:9080/api/users')
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
            datas.find(data => {
                async function a() {
                    if (data.phone_number) {
                        const x = String(data.phone_number)
                        const resPhone = `0${x.slice(3)}`
                        if (resPhone.trim() === phoneNumber.trim()) {
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
                axios.post('http://localhost:9080/api/send-otp', {
                    phone_number: `+84${phoneNumber.slice(1)}`,
                    vouchers: 'MOHO500K, MOHO50K, MOHO300K, MOHO200K, MOHO100K'
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

        const output = datas.filter(data => data.otp)
        if (output.length) {
            output.filter(otpData => {
                const x = String(otpData.phone_number)
                const stringPhone = `0${x.slice(3)}`
                if (otp === otpData.otp && stringPhone === phoneNumber) {
                    setPhonePassW(true)
                    setShowInput(false)
                    setFasleOtp(false)
                    return otp
                }
                if (otp !== otpData.otp) {
                    setFasleOtp(true)
                    return -1
                }
            })
        } else {
            console.log('OTP Invalid!')
        }

        if (otp === '') {
            setValidateOTP(true)
            return;
        }
    }

    const handleInputOTP = () => {
        setExistPhone(false)
        setFasleOtp(false)
    }

    const handleInputPhoneNum = () => {
        setValidatePhone(true)
    }


    const handleReisterWithPhone = (e) => {

        setIsLoading(true)
        const regexPassW = /(?=.{8,})/
        if (regexPassW.test(passwordByPhone)) {
            e.preventDefault()
            axios.post('http://localhost:9080/api/register', {
                password: passwordByPhone
            })
            setIsLoading(false)
            window.alert('Đăng kí thành công!')
            // window.location.replace('/')
        } else {

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



                {showInput === true &&
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
                                Chúng tôi đã gửi mã xác nhận đến số điện thoại  {phoneNumber}
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
                        />
                    </div>
                )}



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
                        <span class="loader">Loading</span> :
                        'ĐĂNG KÝ'
                    }
                </button>)}
            </form>
        </>
    )
}

export default memo(RegisterPhone)