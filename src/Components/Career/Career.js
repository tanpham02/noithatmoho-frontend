import { memo } from 'react'
import './Career.css'

const Career = () => {
    return (
        <div className="career">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='career__heading'>Career - Thông Tin Tuyển Dụng</h2>
                        <div className="career__content">
                            <span>
                                Nội Thất MOHO hiện đang tuyển dụng các vị trí bên dưới. Nếu bạn quan tâm, MOHO rất vui được mời bạn xem chi tiết mô tả công việc và gửi CV về email:
                            </span> <br />
                            <strong className="mb--10 career__contact-email">phamvantan1311@gmail.com</strong>
                            <div className="career__jobs">
                                <strong>01 Content Marketing Executive</strong> <br />
                                <strong>02 Graphic Designer</strong> <br />
                                <strong>02 Sales & Customer Service Executive</strong> <br />
                                <strong>01 E-commerce Marketing Executive</strong> <br />
                                <strong>01 Furniture Design Manager</strong> <br />
                                <strong>01 Merchandise Manager/ Product Marketing Manager</strong> <br />
                                <strong>01 Business Planner</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Career)