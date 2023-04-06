import { useState, memo } from "react"
import { Link } from "react-router-dom"
import RestoreByEmail from "./RestoreByEmail"
import RestoreByPhone from "./RestoreByPhone"
import './RestoreAccount.scss'

const RestoreAccount = ({ restoreTypes }) => {
    const [checked, setChecked] = useState(0)
    const [showRestoreByEmail, setShowRestoreByEmail] = useState(true)
    const [showRestoreByPhone, setShowRestoreByPhone] = useState(false)


    const handleChecked = (index) => {
        setChecked(index)
        if(index === 1) {
            setShowRestoreByEmail(!showRestoreByEmail)
            setShowRestoreByPhone(!showRestoreByPhone)
        } else {
            setShowRestoreByEmail(true)
            setShowRestoreByPhone(false)
        }
    }

    return (
        <div className="restore-account">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col-2">
                        <div className="heading py--100" >
                            <h1 className="heading-account">Đăng nhập</h1>
                            <span className="heading-description">Đăng nhập để tích lũy điểm và nhận ưu đãi từ MOHO.</span>
                            <span className="heading-line"></span>
                            <div className="login-with mt--38">
                                <button className="login-with__google cancel--border">Đăng nhập với Google</button>
                                <button className="login-with__facebook cancel--border">Đăng nhập với Facebook</button>
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

                            <Link to="/" className="back-home" style={{color: '#000'}}>
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

export default memo(RestoreAccount)