import Header from "../../Components/Header/Header"
import CabinetKitchen from "../../Components/CabinetKitchen/CabinetKitchen"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"
import { memo, useEffect } from "react"
import { useTranslation } from 'react-i18next'


const CabinetKitchenPage = ({
    datas,
    dataTypes,
    accountInfos,
    localeLogos,
    bannerServices
}) => {

    const { t } = useTranslation(['navigation'])

    const filters = {
        filterCategories: [
            `${t('Kitchen Cabinet')}`
        ],
        filterPrices: [
            {
                name: `${t('Under')} 500,000₫`,
                value: `under-500000`
            },
            {
                name: `500,000₫ - 1,000,000₫`,
                value: `500000 - 1000000`
            },
            {
                name: `1,000,000₫ - 1,500,000₫`,
                value: `1000000 - 1500000`
            },
            {
                name: `2,000,000₫ - 5,000,000₫`,
                value: `2000000 - 5000000`
            },
            {
                name: `${t('Over')} 5,000,000₫`,
                value: `over-5000000`
            }
        ],
        filterSort: [
            {
                name: `${('Price')}: ${t('Increase')}`,
                value: `${t('Increase')}`
            },
            {
                name: `${('Price')}: ${t('Decrease')}`,
                value: `${t('Decrease')}`
            },
            {
                name: `${t('Name')}: A-Z`,
                value: `A-Z`
            },
            {
                name: `${t('Name')}: Z-A`,
                value: `Z-A`
            },
        ]
    }

    useEffect(() => {
        document.title = "Tư Vấn Và Thiết Kế Tủ Bếp Miễn Phí - Nội Thất MOHO"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <CabinetKitchen
                datas={datas}
                dataTypes={dataTypes}
                filterCategories={filters.filterCategories}
                filterPrices={filters.filterPrices}
                filterSort={filters.filterSort}
            />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default memo(CabinetKitchenPage)

