import { useEffect } from "react"
import Header from "../../Components/Header/Header"
import AccountAddress from "../../Components/AccountAddress/AccountAddress"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"

const AccountAddressPage = ({ localeLogos, bannerServices, accountInfos }) => {
    useEffect(() => {
        document.title = "Địa chỉ"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    },[])


    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <AccountAddress accountInfos={accountInfos}/>
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}
export default AccountAddressPage