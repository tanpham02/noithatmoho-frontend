import Header from "../../Components/Header/Header";
import BrandStory from "../../Components/BrandStory/BrandStory";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";
import { useEffect } from "react";

const BrandStoryPage = ({accountInfos, localeLogos, bannerServices }) => {

    useEffect(() => {
        document.title = "Giới Thiệu Về Nội Thất MOHO"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    },[])
    
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos}/>
            <BrandStory />
            <BannerService bannerServices={bannerServices}/>
            <Footer />
        </>
    )
}

export default BrandStoryPage