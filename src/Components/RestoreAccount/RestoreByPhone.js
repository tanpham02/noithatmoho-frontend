import { memo } from "react"
import { Link } from "react-router-dom"

const RestoreByPhone = () => {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="restore-phone"></label>
                <input
                    type="text"
                    required
                    placeholder="Nhập số điện thoại"
                    id="restore-phone"
                />
            </div>
            <div className="policy">
                Website được bảo vệ bởi reCAPTCHA và
                <Link to="https://policies.google.com/privacy" style={{ color: '#2962ff' }}> Chính sách bảo mật </Link>
                và <Link to="https://policies.google.com/terms" style={{ color: '#2962ff' }}>Điều khoản dịch vụ</Link> của Google.
            </div>

            <button type="submit" className="btn-register"> GỬI MÃ XÁC NHẬN</button>
        </form>
    )
}

export default memo(RestoreByPhone)