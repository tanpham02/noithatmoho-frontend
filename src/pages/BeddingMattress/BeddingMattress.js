import Header from "../../Components/Header/Header"
import BeddingMattress from "../../Components/BeddingMattress/BeddingMattress"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"
import { memo, useEffect } from "react"
import { useTranslation } from 'react-i18next'


const BeddingMattressPage = ({
    datas,
    dataTypes,
    accountInfos,
    localeLogos,
    bannerServices
}) => {
    const { t } = useTranslation(['navigation'])

    const filters = {
        filterCategories: [
            `${t('Bedding - Mattress')}`
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
                name: `${t('Price')}: ${t('Increase')}`,
                value: `${t('Increase')}`
            },
            {
                name: `${t('Price')}: ${t('Decrease')}`,
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
        document.title = "Đồ Trang Trí/ Đồ decor: Chăn Ga - Gối Nệm"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <BeddingMattress
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

export default memo(BeddingMattressPage)

