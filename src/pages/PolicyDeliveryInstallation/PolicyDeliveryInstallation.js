import { memo, useEffect } from "react";
import Header from "../../Components/Header/Header";
import PolicyDeliveryInstallation from "../../Components/PolicyDeliveryInstallation/PolicyDeliveryInstallation";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const PolicyDeliveryInstallationPage = ({ accountInfos, localeLogos, bannerServices }) => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = 'Chính Sách Giao Hàng & Lắp Đặt'
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <PolicyDeliveryInstallation />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default memo(PolicyDeliveryInstallationPage)