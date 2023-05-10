import { memo } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.scss'
function NotFound() {

    return (
        <div className='not-found'>
            <h2
                style={{
                    fontSize: '9rem',
                    color: 'var(--gray-color)',
                    opacity: '0.9',
                }}
                className='not-found__heading'
            >
                404
            </h2>
            <h2 className='not-found__heading'>Không tìm thấy trang</h2>
            <span className='not-found__description'>Xin lỗi, chúng tôi không tìm thấy trang này</span>
            <Link className='not-found__btn-link btn' to='/'>Trở về trang chủ</Link>
            <span className="heading-line"></span>
        </div >
    )
}

export default memo(NotFound)