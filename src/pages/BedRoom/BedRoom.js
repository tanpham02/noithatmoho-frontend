import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BedRoom from "../../Components/BedRoom/BedRoom";
import BannerService from "../../Components/BannerService/BannerService";
import { memo, useEffect } from "react";
import { useTranslation } from 'react-i18next'



const BedRoomPage = ({
  localeLogos,
  bannerServices,
  datas,
  dataTypes,
  dataGroupTypes,
  accountInfos
}) => {

  const { t } = useTranslation(['navigation', 'header'])

  const filters = {
    filterCategories: [
      `${t('Bed')}`,
      `${t('Bedside')}`,
      `${t('Makeup Table')}`,
      `${t('Wardrobe')}`,
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
    document.title = `${t('Furniture', {ns: 'header'})} Phòng Ngủ Đẹp, Hiện Đại 2023 - ${t('Furniture', {ns: 'header'})} MOHO`
  }, [])

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      <Header localeLogos={localeLogos} accountInfos={accountInfos} />
      <BedRoom
        datas={datas}
        dataTypes={dataTypes}
        dataGroupTypes={dataGroupTypes}
        filterCategories={filters.filterCategories}
        filterPrices={filters.filterPrices}
        filterSort={filters.filterSort}
      />
      <BannerService bannerServices={bannerServices} />
      <Footer />
    </>
  )
}

export default memo(BedRoomPage)
