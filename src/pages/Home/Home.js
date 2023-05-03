import Header from "../../Components/Header/Header"
import Sliders from "../../Components/Slider/Slider"
import Home from "../../Components/Home/Home"
import Customer from "../../Components/Customer/Customer"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"
import { memo, useEffect, useState } from "react"
import axios from "axios"



const HomePage = ({ dataGroupTypes, dataTypes, accountInfos, localeLogos, bannerServices, sliders, customers }) => {
    const [datas, setDatas] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/products')
            const data = await res.data
            setDatas(data)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        document.title = "Nội thất MOHO | Miễn phí giao hàng & Lắp đặt tận phòng"
    }, [])


    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            {isLoading ?
                <span style={{
                    position: 'relative',
                    top: '310px',
                    left: '47.5%'
                }} class="loader-main-products"></span> :
                <>
                    <Header localeLogos={localeLogos} accountInfos={accountInfos} />
                    <Sliders sliders={sliders} />
                    <Home datas={datas} dataGroupTypes={dataGroupTypes} dataTypes={dataTypes} />
                    <Customer customers={customers} />
                    <BannerService bannerServices={bannerServices} />
                    <Footer />
                </>
            }
        </>
    )
}

export default memo(HomePage)

