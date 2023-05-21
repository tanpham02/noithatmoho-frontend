import Header from "../../Components/Header/Header"
import DetailProduct from "../../Components/DetailProduct/DetailProduct"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"

import { memo, useEffect } from "react"
import axios from "axios"
import { API_SERVER_MYDUNG, API_SERVER_TANPHAM } from "../.."



const DetailProductPage = ({ accountInfos, localeLogos, bannerServices, sliders, customers }) => {

    const id = JSON.parse(localStorage.getItem('productDetail'))

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/products/${id}`)
                const data = await res.data
                document.title = data.name

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/products/${id}`)
                const data = await res.data
                document.title = data.name
            }
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

