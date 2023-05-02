import { memo, useEffect } from "react";
import Header from "../../Components/Header/Header";
import CustomerLoyal from "../../Components/CustomerLoyal/CustomerLoyal";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const CustomerLoyalPage = ({ localeLogos, bannerServices, accountInfos }) => {
    
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = "Khách Hàng Thân Thiết – MOHOmie"
    }, [])

    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos}/>
            <CustomerLoyal />
            <BannerService bannerServices={bannerServices}/>
            <Footer />
        </>
    )
}

export default memo(CustomerLoyalPage)