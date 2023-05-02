import { memo, useEffect } from "react";
import Header from "../../Components/Header/Header";
import PolicyExchangeReturn from "../../Components/PolicyExchangeReturn/PolicyExchangeReturn";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const PolicyExchangeReturnPage = ({ accountInfos, localeLogos, bannerServices }) => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = "Chính Sách Đổi Trả – Nội Thất MOHO"
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <PolicyExchangeReturn />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default memo(PolicyExchangeReturnPage)