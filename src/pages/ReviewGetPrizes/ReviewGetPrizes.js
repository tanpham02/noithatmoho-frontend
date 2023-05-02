import { memo, useEffect } from "react";
import Header from "../../Components/Header/Header";
import ReviewGetPrizes from "../../Components/ReviewGetPrizes/ReviewGetPrizes";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const ReviewGetPrizesPage = ({ localeLogos, bannerServices, accountInfos }) => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = "Review Hay Nhận Quà Ngay - MOHOment"
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos}/>
            <ReviewGetPrizes />
            <BannerService bannerServices={bannerServices}/>
            <Footer />
        </>
    )
}

export default memo(ReviewGetPrizesPage)