import Header from "../../Components/Header/Header"
import Kitchenware from "../../Components/Kitchenware/Kitchenware"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"

import { memo, useEffect } from "react"

const filters = {
    filterCategories: [
        'Cốc',
        'Khay'
    ],
    filterPrices: [
        {
            name: 'Dưới 500,000₫',
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
            name: 'Trên 5,000,000₫',
            value: 'over-5000000'
        }
    ],
    filterSort: [
        {
            name: 'Giá: Tăng Dần',
            value: 'Tăng Dần'
        },
        {
            name: 'Giá: Giảm Dần',
            value: 'Giảm Dần'
        },
        {
            name: 'Tên: A-Z',
            value: 'A-Z'
        },
        {
            name: 'Tên: Z-A',
            value: 'Z-A'
        },
    ]
}

const KitchenwarePage = ({ datas, dataTypes, accountInfos, localeLogos, bannerServices }) => {
    useEffect(() => {
        document.title = "Đồ Dùng Nhà Bếp - Dụng Cụ Nhà Bếp"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Header localeLogos={localeLogos} accountInfos={accountInfos} />
            <Kitchenware
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

export default memo(KitchenwarePage)

