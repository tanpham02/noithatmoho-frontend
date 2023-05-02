import { memo, useEffect } from "react";
import Header from "../../Components/Header/Header";
import RestoreAccount from "../../Components/RestoreAccount/RestoreAccount";
import BannerService from "../../Components/BannerService/BannerService";
import Footer from "../../Components/Footer/Footer";

const restoreTypes = [
    {
        type: 'Khôi phục bằng email',
        'type-input': 'radio',
        required: true,
        'className-id-input': 'restore-account__email'
    },
    {
        type: 'Khôi phục bằng số điện thoại',
        'type-input': 'radio',
        required: true,
        'className-id-input': 'restore-account__phone-number'
    }
]

const RestoreAccountPage = ({ accountInfos, localeLogos, bannerServices }) => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        document.title = 'Khôi Phục Tài Khoản'
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <RestoreAccount restoreTypes={restoreTypes} />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>

    )
}

export default memo(RestoreAccountPage)