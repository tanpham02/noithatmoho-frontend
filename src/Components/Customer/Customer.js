import { memo } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Customer.scss'
import { useTranslation } from 'react-i18next'

const Customer = ({ customers }) => {
    const { t } = useTranslation(['products'])
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
            <h2 className="customer__title">{t('MOHO Customers at')}</h2>
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