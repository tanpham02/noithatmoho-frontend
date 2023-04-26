import axios from "axios"
import { useState, memo, useEffect } from "react"
import { Link } from "react-router-dom"

const RestoreByEmail = () => {

    const [datas, setDatas] = useState([])
    const [email, setEmail] = useState('')
    const [newPassWord, setNewPassWord] = useState('')
    const [isSendOtp, setIsSendOtp] = useState(true)
    const [otp, setOtp] = useState('')
    const [id, setId] = useState()
    const [user, setUser] = useState({})
    const [resOtp, setResOtp] = useState('')
    const [showInputPassW, setShowInputPassW] = useState(false)
    const [showInputOtp, setShowInputOtp] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const [notExist, setNotExist] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:9080/api/users')
            const data = await res.data
            setDatas(data)
        }
        fetchData()
    }, [])


    const handleSendOtp = (e) => {
        if (email) {
            e.preventDefault()
            setShowInputOtp(true)
            setIsSendOtp(false)
            const output = datas.filter(data => data.email === email.trim())
            if (output.length) {
                output.find(id => {
                    setUser(id)
                    setId(id.id)
                    axios.post(`http://localhost:9080/api/sendOTPRestoreAccountByMail`, {
                        email
                    })
                        .then((res) => {
                            setResOtp(String(res.data))
                            return axios.put(`http://localhost:9080/api/users/${id.id}`,
                                {
                                    ...id,
                                    otp: res.data
                                })
                        })
                        .then(res => {
                            return res.data
                        })
                        .catch(err => console.log(err))
                })
            } else {
                setIsSendOtp(true)
                setNotExist(true)
                setShowInputOtp(false)
                setErrMsg(false)
            }
            return
        }
    }


    const handleOTP = (e) => {
        if (otp) {
            e.preventDefault()
            if (resOtp === otp) {
                setShowInputPassW(true)
                setShowInputOtp(false)
                setErrMsg(false)
                return
            } else {
                setShowInputPassW(false)
                setErrMsg(true)
            }
        }
    }

    const handleUpdateNewPassW = (e) => {
        if (newPassWord) {
            e.preventDefault()
            axios.put(`http://localhost:9080/api/users/${id}`,
                {
                    ...user,
                    password: newPassWord,
                    otp: null
                })
                .then(res => {
                    return res.data
                })
                .catch(err => console.log(err))
            window.alert('Cập nhật mật khẩu thành công!')
            window.location.replace('/')
        }
    }
    return (
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
                {notExist && <span className="errorMsg">Email không tồn tại!</span>}
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
                Chúng tôi đã gửi mã xác nhận đến {email}
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
                />
            </div>}



            <div className="policy">
                Website được bảo vệ bởi reCAPTCHA và
                <Link to="https://policies.google.com/privacy" style={{ color: '#2962ff' }}> Chính sách bảo mật </Link>
                và <Link to="https://policies.google.com/terms" style={{ color: '#2962ff' }}>Điều khoản dịch vụ</Link> của Google.
            </div>

            {isSendOtp && <button type="submit" onClick={handleSendOtp} className="btn btn-register">GỬI MÃ XÁC NHẬN</button>}
            {showInputOtp && <button type="submit" onClick={handleOTP} className="btn btn-register">GỬI</button>}
            {showInputPassW && <button type="submit" onClick={handleUpdateNewPassW} className="btn btn-register">CẬP NHẬT</button>}
        </form>
    )

}

export default memo(RestoreByEmail)