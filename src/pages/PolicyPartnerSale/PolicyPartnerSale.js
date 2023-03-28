import { useEffect } from "react";
import Header from "../../Components/Header/Header";
import PolicyPartnerSale from "../../Components/PolicyPartnerSale/PolicyPartnerSale";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const PolicyPartnerSalePage = ({ localeLogos, bannerServices, accountInfos }) => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = "Chính Sách Đối Tác Bán Hàng"
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <PolicyPartnerSale />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default PolicyPartnerSalePage