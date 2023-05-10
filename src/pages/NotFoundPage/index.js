import { useEffect, memo } from "react";
import NotFound from "../../Components/NotFound/NotFound";
import Header from "../../Components/Header/Header";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";
function NotFoundPage({ accountInfos, localeLogos, bannerServices }) {
    useEffect(() => {
        document.title = "Không tìm thấy trang"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <NotFound />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default memo(NotFoundPage)