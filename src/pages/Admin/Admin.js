import { useEffect } from "react"
import Header from "../../Components/Header/Header"
import Admin from "../../Components/Admin/Admin"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"
import { useTranslation } from 'react-i18next'



const AdminPage = ({ accountInfos, localeLogos, bannerServices }) => {
    const { t } = useTranslation(['header'])
    
    useEffect(() => {
        document.title = `Nội thất MOHO | ${t('Administrator')}`
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    },[])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <Admin />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default AdminPage

