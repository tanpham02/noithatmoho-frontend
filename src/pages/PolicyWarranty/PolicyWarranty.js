import { useEffect } from "react";
import Header from "../../Components/Header/Header";
import PolicyWarranty from "../../Components/PolicyWarranty/PolicyWarranty";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const PolicyWarrantyPage = ({ localeLogos, bannerServices, accountInfos }) => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = "Chính Sách Bảo Hành & Bảo Trì"
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos}/>
            <PolicyWarranty />
            <BannerService bannerServices={bannerServices}/>
            <Footer />
        </>
    )
}

export default PolicyWarrantyPage