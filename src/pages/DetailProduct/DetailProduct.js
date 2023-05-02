import Header from "../../Components/Header/Header"
import DetailProduct from "../../Components/DetailProduct/DetailProduct"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"

import { memo, useEffect } from "react"
import axios from "axios"



const DetailProductPage = ({ accountInfos, localeLogos, bannerServices, sliders, customers }) => {
    
    const id = JSON.parse(localStorage.getItem('productDetail'))

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:9080/api/products/${id}`)
            const data = await res.data
            document.title = data.name
        }
        getData()
    }, [id])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <DetailProduct />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default memo(DetailProductPage)

