import { useState, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import RegisterPhone from './RegisterPhone'
import RegisterEmail from './RegisterEmail'
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton'
import './Register.scss'

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
    const handleChangeType = useCallback((index) => {
        setCheckedType(index)
        if (index === 1) {
            setShowRegisterPhone(!showRegisterPhone)
            setShowRegisterEmail(!showRegisterEmail)
            return;
        }
        //return early
        setShowRegisterPhone(false)
        setShowRegisterEmail(true)
    }, [showRegisterPhone, showRegisterEmail])

    const handleChangeGender = useCallback((index) => {
        setcheckedGender(index)
    }, [])

    return (
        <div className="register">
            <div className="grid">
                <div className="grid__row no-wrap">
                    <div className="grid__col-2">
                        <div className="heading py--100">
                            <h1 className="heading-account">Tạo tài khoản</h1>
                            <span className="heading-description">Đăng ký tài khoản chỉ trong 1 phút để tích lũy điểm và nhận ưu đãi từ MOHO.</span>
                            <span className="heading-line"></span>
                            <div className="login-with mt--38">
                                <GoogleLoginButton />
                                <button className="login-with__facebook cancel--border">Đăng nhập với Facebook</button>
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
    )
}

export default memo(Register)