import { useEffect } from "react";
import Header from "../../Components/Header/Header";
import Register from "../../Components/Register/Register";
import Footer from "../../Components/Footer/Footer";
import BannerService from "../../Components/BannerService/BannerService";


const RegisterPage = ({ localeLogos, bannerServices, accountInfos }) => {
    useEffect(() => {
        document.title = 'Tạo tài khoản'
    }, [])
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <Register />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </div>
    )
}

export default RegisterPage