import { memo } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Customer.scss'

const Customer = ({ customers }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };
    return (
        <div className="customer py--40">
            <h2 className="customer__title">Khách hàng MOHO tại</h2>
            <Slider {...settings}>
                {customers.map(((customer, index) => (
                    <div key={index} className="customers-main">
                        <img src={customer.url} alt={customer.title} />
                    </div>
                )))}
            </Slider>
        </div>
    )
}

export default memo(Customer)