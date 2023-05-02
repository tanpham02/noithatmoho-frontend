import { memo, useEffect } from "react";
import Header from "../../Components/Header/Header";
import PolicySale from "../../Components/PolicySale/PolicySale";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const PolicySalePage = ({ accountInfos, localeLogos, bannerServices }) => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = "Chính Sách Bán Hàng"
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <PolicySale />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default memo(PolicySalePage)