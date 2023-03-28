import Header from "../../Components/Header/Header"
import AllProducts from "../../Components/AllProducts/AllProducts"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"
import { useEffect } from "react"

const filters = {
  filterCategories: [
    'Bàn Sofa - Bàn Cafe - Bàn Trà',
    'Bàn Ăn',
    'Ghế Sofa',
    'Tủ Đầu Giường',
    'Kệ',
    'Tủ Quần Áo',
    'Tủ Kệ Tivi',
    'Tủ Giày',
    'Tủ Trang Trí',
    'Bàn Làm Việc',
    'Ghế Ăn',
    'Giường Ngủ',
    'Bàn Trang Điểm',
    'Ghế Văn Phòng',
    'Bếp'
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

const AllProductsPage = ({ localeLogos, bannerServices, datas, accountInfos, onGetDataSearch, dataSearch }) => {

  console.log(onGetDataSearch)
  useEffect(() => {
    document.title = 'Tất Cả Sản Phẩm Đồ Gỗ Nội Thất Của MOHO'
  }, [])

  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <>
      <Header localeLogos={localeLogos} accountInfos={accountInfos} onGetDataSearch={onGetDataSearch}/>
      <AllProducts datas={dataSearch} filterCategories={filters.filterCategories} filterPrices={filters.filterPrices} filterSort={filters.filterSort} />
      <BannerService bannerServices={bannerServices} />
      <Footer />
    </>
  )
}

export default AllProductsPage

