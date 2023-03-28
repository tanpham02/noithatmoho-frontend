import Header from "../../Components/Header/Header"
import Sliders from "../../Components/Slider/Slider"
import Customer from "../../Components/Customer/Customer"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"

import { useEffect } from "react"



const HomePage = ({ accountInfos, localeLogos, bannerServices, sliders, customers }) => {
    useEffect(() => {
        document.title = "Nội thất MOHO | Miễn phí giao hàng & Lắp đặt tận phòng"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <Sliders sliders={sliders} />
            <Customer customers={customers} />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default HomePage

