import Header from "../../Components/Header/Header";
import Career from "../../Components/Career/Career";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";
import { memo, useEffect } from "react";

const CareerPage = ({accountInfos,  localeLogos, bannerServices }) => {

    useEffect(() => {
        document.title = "Career - Thông Tin Tuyển Dụng Nội Thất MOHO"
    }, [])
    
    useEffect(() => {
        window.scroll(0, 0)
    },[])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos}/>
            <Career />
            <BannerService bannerServices={bannerServices}/>
            <Footer />
        </>
    )
}

export default memo(CareerPage)