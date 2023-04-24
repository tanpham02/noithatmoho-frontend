import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import RegisterPage from './pages/RegisterPage/Register'
import HomePage from './pages/Home/Home'
import DiscountPage from './pages/Dicount/Discount'
import MohoWorkPage from './pages/MohoWork/MohoWork'
import MohoKitchenPage from './pages/MohoKitchen/MohoKitchen'
import RestoreAccountPage from './pages/RestoreAccountPage/RestoreAccountPage'
import BrandStoryPage from './pages/BrandStory/BrandStory'
import CareerPage from './pages/Career/Career'
import PolicySalePage from './pages/PolicySale/PolicySale'
import PolicyDeliveryInstallationPage from './pages/PolicyDeliveryInstallation/PolicyDeliveryInstallation'
import PolicyExchangeReturnPage from './pages/PolicyExchangeReturn/PolicyExchangeReturn'
import PolicyWarrantyPage from './pages/PolicyWarranty/PolicyWarranty'
import CustomerLoyalPage from './pages/CustomerLoyal/CustomerLoyal'
import ReviewGetPrizesPage from './pages/ReviewGetPrizes/ReviewGetPrizes'
import PolicyPartnerSalePage from './pages/PolicyPartnerSale/PolicyPartnerSale'
import AllProductsPage from './pages/AllProducts/AllProducts'
import DiningRoomPage from './pages/DiningRoom/DiningRoom'
import LivingRoomPage from './pages/LivingRoom/LivingRoom'
import BedRoomPage from './pages/BedRoom/BedRoom'
import WorkRoomPage from './pages/WorkRoom/WorkRoom'
import AccountPage from './pages/Account/Account'
import AccountAddressPage from './pages/AccountAddress/AccountAddress'
import DecorationsPage from './pages/Decorations/Decorations'
import KogeCollectionPage from './pages/KogeColection/KogeCollection'
import GoToTop from './Components/GoToTop/GoToTop'
import Chat from './Components/Chat/Chat'
import KoldingCollectionPage from './pages/KoldingCollection/KoldingCollection'
import FijiCollectionPage from './pages/FijiCollection/FijiCollection'
import FynCollectionPage from './pages/FynCollection/FynCollection'
import MalagaCollecionPage from './pages/MalagaCollecion/MalagaCollecion'
import HobroCollectionPage from './pages/HobroCollection/HobroCollection'
import MossCollectionPage from './pages/MossCollection/MossCollection'
import MilanCollectionPage from './pages/MilanCollection/MilanCollection'
import NyborgCollecionPage from './pages/NyborgCollecion/NyborgCollecion'
import OdenseCollectionPage from './pages/OdenseCollection/OdenseCollection'
import VlineCollectionPage from './pages/VlineCollection/VlineCollection'
import VienanCollectionPage from './pages/ViennaCollection/ViennaCollection'
import OsloColletionPage from './pages/OsloCollection/OsloCollection'
import SofaPage from './pages/Sofa/Sofa'
import SofaTablePage from './pages/SofaTable/SofaTable'
import TvCabinetPage from './pages/TvCabinet/TvCabinet'
import ShoesCabinetPage from './pages/ShoesCabinet/ShoesCabinet'
import DetailProductPage from './pages/DetailProduct/DetailProduct'
import TableDiningPage from './pages/TableDining/TableDining'
import ChairDiningPage from './pages/ChairDining/ChairDining'
import SetDiningPage from './pages/SetDining/SetDining'
import CabinetKitchenPage from './pages/CabinetKitchen/CabinetKitchen'
import BedCollectionPage from './pages/BedCollection/BedCollection'
import BedSidePage from './pages/BedSide/BedSide'
import ClosetPage from './pages/Closet/Closet'
import CabinetMakeUpPage from './pages/CabinetMakeUp/CabinetMakeUp'
import DeskCollectionPage from './pages/DeskCollection/DeskCollection'
import ChairOfficePage from './pages/ChairOffice/ChairOffice'
import CabinetShelfPage from './pages/CabinetShelf/CabinetShelf'
import VaseBowlPage from './pages/VaseBowl/VaseBowl'
import MattressPage from './pages/Mattress/Mattress'
import BeddingMattressPage from './pages/BeddingMattress/BeddingMattress'
import BlanketPage from './pages/Blanket/Blanket'
import TreeFlowersPage from './pages/TreeFlowers/TreeFlowers'
import ChairPadCushionPage from './pages/ChairPadCushion/ChairPadCushion'
import KitchenwarePage from './pages/Kitchenware/Kitchenware'
import CheckOutPage from './pages/CheckOutPage'
import BestSellerPage from './pages/BestSeller/BestSeller'
import AdminHome from './pages/AdminHome/AdminHome'
import ManagerUsersPage from './pages/ManagerUsers/ManagerUsers'
import ManagerProductsPage from './pages/ManagerProducts/ManagerProducts'
import DetailUserPage from './pages/DetailUser/DetailUser'
import CreateUserPage from './pages/CreateUser/CreateUser'
import CreateProductPage from './pages/CreateProduct/CreateProduct'
import DetailProductAdminPage from './pages/DetailProductAdmin/DetailProductAdmin'
import {
  PermIdentity,
  Storefront,
  StoreRounded
} from "@material-ui/icons"


const localeLogos = [
  {
    url: 'https://img.freepik.com/premium-vector/flag-united-states-america-vector-illustration-flat-modern-style_575709-256.jpg',
    alt: 'en',
    style: {
      height: '19px',
      width: "29px"
    }
  },
  {
    url: 'https://static.ex-cdn.com/cpcs.vn/v1.6.20/templates_acai/themes/images/vn.png',
    alt: 'vi',
    style: {
      height: '25px',
      width: "29px"
    }
  }
]

const bannerServices = [
  {
    name: 'Giao Hàng & Lắp Đặt',
    url: '/assets/img/banner-service/banner-service_1.png'
  },
  {
    name: 'Đổi Trả 1 - 1',
    url: '/assets/img/banner-service/banner-service_2.png'
  },
  {
    name: 'Bảo Hành 2 Năm',
    url: '/assets/img/banner-service/banner-service_3.png'
  },
  {
    name: 'Tư Vấn Thiết Kế',
    url: '/assets/img/banner-service/banner-service_4.png'
  },
]

const sliders = [
  {
    url: '/assets/img/slides-image/slideshow_1.png',
    title: 'Nội Thất DUTA thông báo khuyến mãi'
  },
  {
    url: '/assets/img/slides-image/slideshow_2.png',
    title: 'Ưu đãi combo nội thất'
  },
  {
    url: '/assets/img/slides-image/slideshow_3.png',
    title: 'Ưu Đãi Mừng Ra Mắt Hệ Tủ Bếp DUTA KITCHEN'
  },
  {
    url: '/assets/img/slides-image/slideshow_4.png',
    title: 'Ưu đãi mã giảm giá Nội Thất DUTA'
  },
  {
    url: '/assets/img/slides-image/slideshow_5.png',
    title: 'Ưu đãi khi ghé thăm cửa hàng nội thất'
  },
  {
    url: '/assets/img/slides-image/slideshow_6.png',
    title: 'Ưu đãi combo ghế sofa và bàn trà sofa'
  },
  {
    url: '/assets/img/slides-image/slideshow_7.png',
    title: 'Ưu đãi khi mua trọn bộ bàn ăn'
  },
  {
    url: '/assets/img/slides-image/slideshow_8.png',
    title: 'Ưu đãi khi mua 2 sản phẩm khác nhau trong phòng làm việc'
  },
  {
    url: '/assets/img/slides-image/slideshow_9.png',
    title: 'Ưu đãi giường ngủ và tủ đầu giường'
  },
  {
    url: '/assets/img/slides-image/slideshow_10.png',
    title: 'Ưu đãi 5% khi mua cùng bộ sưu tập'
  },
  // {
  //     url: '/assets/img/slides-image/slideshow_11.png',
  //     title: 'Ưu đãi combo nội thất'
  // },
  // {
  //     url: '/assets/img/slides-image/slideshow_12.png',
  //     title: 'Ưu Đãi Mừng Ra Mắt Hệ Tủ Bếp MOHO KITCHEN'
  // },
  // {
  //     url: '/assets/img/slides-image/slideshow_13.png',
  //     title: 'Nội Thất MOHO thông báo khuyến mãi'
  // },
  // {
  //     url: '/assets/img/slides-image/slideshow_14.png',
  //     title: 'Ưu đãi khi ghé thăm cửa hàng nội thất'
  // },
  // {
  //     url: '/assets/img/slides-image/slideshow_15.png',
  //     title: 'Ưu đãi khi mua trọn bộ bàn ăn'
  // },
]

const customers = [
  {
    url: '/assets/img/customer/customer_item_1.png',
    title: 'customer-item-1'
  },
  {
    url: '/assets/img/customer/customer_item_2.png',
    title: 'customer-item-2'
  },
  {
    url: '/assets/img/customer/customer_item_3.png',
    title: 'customer-item-3'
  },
  {
    url: '/assets/img/customer/customer_item_4.png',
    title: 'customer-item-4'
  },
  {
    url: '/assets/img/customer/customer_item_5.png',
    title: 'customer-item-5'
  },
  {
    url: '/assets/img/customer/customer_item_6.png',
    title: 'customer-item-6'
  },
  {
    url: '/assets/img/customer/customer_item_7.png',
    title: 'customer-item-7'
  },
  {
    url: '/assets/img/customer/customer_item_8.png',
    title: 'customer-item-8'
  },
  {
    url: '/assets/img/customer/customer_item_9.png',
    title: 'customer-item-9'
  },
  {
    url: '/assets/img/customer/customer_item_10.png',
    title: 'customer-item-10'
  },
]

const listPage = [
  {
    name: 'Người Dùng',
    path: '/manager-users',
    icon: PermIdentity
  },
  {
    name: 'Sản Phẩm',
    path: '/manager-products',
    icon: Storefront
  },
  {
    name: 'Xem Cửa Hàng',
    path: '/',
    icon: StoreRounded
  }
]

function App() {
  const [gotoTop, setGotoTop] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [datas, setDatas] = useState([])
  const [dataGroupTypes, setDataGroupTypes] = useState([])
  const [dataTypes, setDataTypes] = useState([])
  const timerId = useRef()


  const accountInfos = [
    {
      name: JSON.parse(localStorage.getItem('fullNameAccount')),
      path: '#'
    },
    {
      name: 'Tài khoản của bạn',
      path: '/account'
    },
    {
      name: 'Thông tin địa chỉ',
      path: '/account/addresses'
    },
    {
      name: 'Đăng xuất',
      path: '/account/logout'
    }
  ]

  useEffect(() => {
    async function getDataProducts() {
      const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/products');
      setDatas([...res.data])
    }
    getDataProducts()
  }, [])


  useEffect(() => {
    async function getDataGroupTypes() {
      const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/groupTypes')
      setDataGroupTypes([...res.data])
    }
    getDataGroupTypes()
  }, [])

  useEffect(() => {
    async function getDataTypes() {
      const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/types')
      setDataTypes([...res.data])
    }
    getDataTypes()
  }, [])



  const handleShowGotoTop = () => {
    if (window.scrollY > 1500 || document.documentElement.scrollTo > 1500) {
      setGotoTop(!gotoTop)
    } else {
      setGotoTop(gotoTop)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleShowGotoTop)

    return () => window.removeEventListener('scroll', handleShowGotoTop)
  }, [])

  useEffect(() => {
    if (window.location.pathname.includes('/admin') ||
      window.location.pathname.includes('/manager-users') ||
      window.location.pathname.includes('/manager-users/detail') ||
      window.location.pathname.includes('/manager-users/create-user') ||
      window.location.pathname.includes('/manager-products') ||
      window.location.pathname.includes('/manager-products/create-product') ||
      window.location.pathname.includes('/manager-products/detail')) {
      document.querySelector('.fb_reset')?.classList.add('hidden')
    } else {
      document.querySelector('.fb_reset')?.classList.remove('hidden')
    }
  }, [window.location.pathname])


  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={<HomePage datas={datas} dataGroupTypes={dataGroupTypes} dataTypes={dataTypes} accountInfos={accountInfos} localeLogos={localeLogos} bannerServices={bannerServices} sliders={sliders} customers={customers} />}
        />
        <Route
          path='/account'
          element={
            <AccountPage accountInfos={accountInfos} localeLogos={localeLogos} bannerServices={bannerServices} />
          }
        />
        <Route
          path='/account/addresses'
          element={<AccountAddressPage accountInfos={accountInfos} localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/account/register'
          element={<RegisterPage accountInfos={accountInfos} localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/account/restore-account'
          element={<RestoreAccountPage accountInfos={accountInfos} localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/collections/uu-dai'
          element={<DiscountPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/brand-story'
          element={<BrandStoryPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/career'
          element={<CareerPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/chinh-sach-ban-hang'
          element={<PolicySalePage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/giao-hang-va-lap-dat'
          element={<PolicyDeliveryInstallationPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/chinh-sach-doi-tra'
          element={<PolicyExchangeReturnPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/chinh-sach-bao-hanh'
          element={<PolicyWarrantyPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/khach-hang-than-thiet-mohomie'
          element={<CustomerLoyalPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/review-hay-nhan-qua-ngay-mohoments'
          element={<ReviewGetPrizesPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/pages/chinh-sach-doi-tac-ban-hang'
          element={<PolicyPartnerSalePage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} />}
        />
        <Route
          path='/collections/moho-works'
          element={<MohoWorkPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/pages/kitchen'
          element={<MohoKitchenPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/collections/phong-khach'
          element={<LivingRoomPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/collections/tat-ca-san-pham-moho'
          element={<AllProductsPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} />}
        />
        <Route
          path='/collections/phong-an'
          element={<DiningRoomPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/collections/phong-ngu'
          element={<BedRoomPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/page/best-seller'
          element={<BestSellerPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/collections/phong-lam-viec'
          element={<WorkRoomPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/collections/do-trang-tri'
          element={<DecorationsPage accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} dataGroupTypes={dataGroupTypes} />}
        />
        <Route
          path='/collections/koge-collection'
          element={<KogeCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/kolding-collection'
          element={<KoldingCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/fiji-collection'
          element={<FijiCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/fyn-collection'
          element={<FynCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/hobro-collection'
          element={<HobroCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/malaga-collection'
          element={<MalagaCollecionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/moss-collection'
          element={<MossCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/milan-collection'
          element={<MilanCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/nyborg-collection'
          element={<NyborgCollecionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/odense-collection'
          element={<OdenseCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/oslo-collection'
          element={<OsloColletionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/vline-collection'
          element={<VlineCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/vienna-collection'
          element={<VienanCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/ghe-sofa'
          element={<SofaPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/ban-sofa-ban-cafe-ban-tra'
          element={<SofaTablePage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/tu-ke-tivi'
          element={<TvCabinetPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/tu-giay-tu-trang-tri'
          element={<ShoesCabinetPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/ban-an'
          element={<TableDiningPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/ghe-an'
          element={<ChairDiningPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/bo-ban-an'
          element={<SetDiningPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/moho-kitchen'
          element={<CabinetKitchenPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/giuong-ngu'
          element={<BedCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/tu-dau-giuong'
          element={<BedSidePage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/tu-quan-ao'
          element={<ClosetPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/ban-trang-diem'
          element={<CabinetMakeUpPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/ban-lam-viec'
          element={<DeskCollectionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/ghe-van-phong'
          element={<ChairOfficePage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/tu-ke'
          element={<CabinetShelfPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/binh-chau-lo'
          element={<VaseBowlPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/nem'
          element={<MattressPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/chan-ga-goi-nem'
          element={<BeddingMattressPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/chan-phu'
          element={<BlanketPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/cay-hoa'
          element={<TreeFlowersPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/dem-ngoi-goi-tua'
          element={<ChairPadCushionPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/collections/do-nha-bep'
          element={<KitchenwarePage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/products/:dataname'
          element={<DetailProductPage
            accountInfos={accountInfos}
            localeLogos={localeLogos} bannerServices={bannerServices} datas={datas} dataTypes={dataTypes} />}
        />
        <Route
          path='/checkout/:username'
          element={<CheckOutPage datas={datas} />}
        />
        <Route
          path='/admin'
          element={<AdminHome listPage={listPage} />}
        />
        <Route
          path='/manager-users'
          element={<ManagerUsersPage listPage={listPage} />}
        />
        <Route
          path='/manager-users/detail/:id'
          element={<DetailUserPage listPage={listPage} />}
        />
        <Route
          path='/manager-users/create-user'
          element={<CreateUserPage listPage={listPage} />}
        />

        <Route
          path='/manager-products'
          element={<ManagerProductsPage listPage={listPage} />}
        />
        <Route
          path='/manager-products/create-product'
          element={<CreateProductPage listPage={listPage} />}
        />
        <Route
          path='/manager-products/detail/:id'
          element={<DetailProductAdminPage listPage={listPage} />}
        />
      </Routes>
      {gotoTop && <GoToTop />}
      {/* {showChat && <Chat />} */}
    </div>
  );
}

export default App;
