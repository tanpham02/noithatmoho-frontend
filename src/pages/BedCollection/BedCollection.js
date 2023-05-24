import Header from "../../Components/Header/Header"
import BedCollection from "../../Components/BedCollection/BedCollection"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"
import { useTranslation } from 'react-i18next'

import { memo, useEffect } from "react"


const BedCollectionPage = ({
    datas,
    dataTypes,
    accountInfos,
    localeLogos,
    bannerServices
}) => {
    const { t } = useTranslation(['navigation'])
    useEffect(() => {
        document.title = "Mẫu Giường Ngủ Gỗ Đẹp, Đơn Giản 1m4, 1m6, 1m8 - Nội Thất MOHO"
    }, [])
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const filters = {
        filterCategories: [
            `${t('Bed')}`
        ],
        filterPrices: [
            {
                name: `${t('Under')} 500,000₫`,
                value: 'under-500000'
            },
            {
                name: '500,000₫ - 1,000,000₫',
                value: '500000 - 1000000'
            },
            {
                name: '1,000,000₫ - 1,500,000₫',
                value: '1000000 - 1500000'
            },
            {
                name: '2,000,000₫ - 5,000,000₫',
                value: '2000000 - 5000000'
            },
            {
                name: `${t('Over')} 5,000,000₫`,
                value: 'over-5000000'
            }
        ],
        filterSort: [
            {
                name: `${t('Price')}: ${t('Increase')}`,
                value: `${t('Increase')}`
            },
            {
                name: `${t('Price')}: ${t('Decrease')}`,
                value:  `${t('Decrease')}`
            },
            {
                name: `${t('Name')}: A-Z`,
                value: 'A-Z'
            },
            {
                name: `${t('Name')}: Z-A`,
                value: 'Z-A'
            },
        ]
    }

    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <BedCollection
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

export default memo(BedCollectionPage)

