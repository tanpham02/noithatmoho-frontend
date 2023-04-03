import Navigation from "../Navigation/Navigation"
import Login from "../Login/Login"
import Cart from "../Cart/Cart"
import { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo, memo } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import './Header.css'
import HeaderFixed from "../HeaderFixed/HeaderFixed"
import axios from "axios"

export const groupTypes = [
    {
        id: 1,
        name: 'Product',
        href: '/collections/tat-ca-san-pham-moho'
    },
    {
        id: 2,
        name: 'New Lines',
        desc: 'NEW'
    },
    {
        id: 3,
        name: 'Offer',
        desc: 'HOT',
        href: '/collections/uu-dai'
    },
    {
        id: 4,
        name: 'Service'
    },
    {
        id: 5,
        name: 'About Us',
        href: '/pages/brand-story'
    }
]

export const types = [
    {
        id: 1,
        'groupType-id': 1,
        names: [
            {
                name: 'Collection',
            },
            {
                name: 'Living Room',
                href: '/collections/phong-khach'
            },
            {
                name: 'Dining Room',
                href: '/collections/phong-an'
            },
            {
                name: 'Bed Room',
                href: '/collections/phong-ngu'
            },
            {
                name: 'Working Room',
                href: '/collections/phong-lam-viec'
            },
            {
                name: 'Decorations',
                href: '/collections/do-trang-tri'
            }
        ]
    },
    {
        id: 2,
        'groupType-id': 2,
        names: [
            {
                name: 'MOHO WORKS',
                href: '/collections/moho-works'
            },
            {
                name: 'MOHO KITCHEN',
                href: '/pages/kitchen'
            }
        ]
    },
    {
        id: 3,
        'groupType-id': 4,
        names: [
            {
                name: 'Sales Policy',
                href: '/pages/chinh-sach-ban-hang'
            },
            {
                name: 'Delivery & Installation Policy',
                href: '/pages/giao-hang-va-lap-dat'
            },
            {
                name: 'Return Policy',
                href: '/pages/chinh-sach-doi-tra'
            },
            {
                name: 'Warranty & Maintenance Policy',
                href: '/pages/chinh-sach-bao-hanh'
            },
            {
                name: 'Loyal Customer - DUTAmie',
                href: '/pages/khach-hang-than-thiet-mohomie'
            },
            {
                name: 'Share Review Get Prizes - DUTAment',
                href: '/pages/review-hay-nhan-qua-ngay-mohoments'
            },
            {
                name: 'Sales Partner Policy',
                href: '/pages/chinh-sach-doi-tac-ban-hang'
            }
        ]
    },
    {
        id: 1,
        'groupType-id': 5,
        names: [
            {
                name: 'Brand Story',
                href: '/pages/brand-story'
            },
            {
                name: 'Career',
                href: '/pages/career'
            }
        ]
    }
]

export const products = [
    {
        id: 1,
        'type-name': 'Collection',
        value: [
            {
                name: 'KOGE Collection',
                href: '/collections/koge-collection'
            },

            {
                name: 'KOLDING Collection',
                href: '/collections/kolding-collection'
            },

            {
                name: 'FIJI Collection',
                href: '/collections/fiji-collection'
            },

            {
                name: 'FYN Collection',
                href: '/collections/fyn-collection'
            },

            {
                name: 'HOBRO Collection',
                href: '/collections/hobro-collection'
            },

            {
                name: 'MALAGA Collection',
                href: '/collections/malaga-collection'
            },

            {
                name: 'MOSS Collection',
                href: '/collections/moss-collection'
            },

            {
                name: 'MILAN Collection',
                href: '/collections/milan-collection'
            },

            {
                name: 'NYBORG Collection',
                href: '/collections/nyborg-collection'
            },

            {
                name: 'ODENSE Collection',
                href: '/collections/odense-collection'
            },

            {
                name: 'OSLO Collection',
                href: '/collections/oslo-collection'
            },

            {
                name: 'VLINE Collection',
                href: '/collections/vline-collection'
            },

            {
                name: 'VIENNA Collection',
                href: '/collections/vienna-collection   '
            },
        ]
    },
    {
        id: 2,
        'type-name': 'Living Room',
        value: [
            {
                name: 'Sofa',
                href: '/collections/ghe-sofa'
            },
            {
                name: 'Sofa Table',
                href: '/collections/ban-sofa-ban-cafe-ban-tra'
            },
            {
                name: 'TV Stand',
                href: '/collections/tu-ke-tivi'
            },
            {
                name: 'Shoes Cabinet',
                href: '/collections/tu-giay-tu-trang-tri'

            }
        ]
    },
    {
        id: 3,
        'type-name': 'Dining Room',
        value: [
            {
                name: 'Dining Table',
                href: '/collections/ban-an'
            },
            {
                name: 'Dining Chair',
                href: '/collections/ghe-an'
            },
            {
                name: 'Dining Set',
                href: '/collections/bo-ban-an'
            },
            {
                name: 'Kitchen Cabinet',
                href: '/collections/moho-kitchen'
            }
        ]
    },
    {
        id: 4,
        'type-id': 3,
        'type-name': 'Bed Room',
        value: [
            {
                name: 'Bed',
                href: '/collections/giuong-ngu'
            },
            {
                name: 'Bedside',
                href: '/collections/tu-dau-giuong'
            },
            {
                name: 'Wardrobe',
                href: '/collections/tu-quan-ao'
            },
            {
                name: 'Makeup Table',
                href: '/collections/ban-trang-diem'
            }
        ]
    },
    {
        id: 5,
        'type-id': 4,
        'type-name': 'Working Room',
        value: [
            {
                name: 'Desk',
                href: '/collections/ban-lam-viec'
            },
            {
                name: 'Office Chair',
                href: '/collections/ghe-van-phong'
            },
            {
                name: 'Cabinet & Shelf',
                href: '/collections/tu-ke'
            }
        ]
    },
    {
        id: 6,
        'type-id': 5,
        'type-name': 'Decorations',
        value: [
            {
                name: 'Vase - Bowl',
                href: '/collections/binh-chau-lo'
            },
            {
                name: 'Mattress',
                href: '/collections/nem '
            },
            {
                name: 'Bedding - Mattress',
                href: '/collections/chan-ga-goi-nem'
            },
            {
                name: 'Blanket',
                href: '/collections/chan-phu'
            },
            {
                name: 'Tree - Flowers',
                href: '/collections/cay-hoa'
            },
            {
                name: 'Chair Pad - Cushion',
                href: '/collections/dem-ngoi-goi-tua'
            },
            {
                name: 'Kitchenware',
                href: '/collections/do-nha-bep'
            }
        ]
    }
]


const Header = ({ localeLogos, accountInfos }) => {
    const { t, i18n } = useTranslation(['header'])
    const [showLogin, setShowLogin] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [id, setId] = useState()
    const [isLogin, setIsLogin] = useState(false)
    const [highlight, sethighLight] = useState(0)
    const [showInfo, setShowInfo] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [author, setAuthor] = useState([])
    const [search, valueSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    const [activeSearch, setActiveSearch] = useState(false)
    const localeLngRef = useRef()



    function handleLanguage(e) {
        i18n.changeLanguage(e.target.alt)
        localStorage.setItem('lang', e.target.alt)
        window.location.reload()
    }


    const handleClickOption = (index) => {
        sethighLight(index)

        if (index === 3) {
            localStorage.removeItem('fullNameAccount')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('idUser')
            localStorage.removeItem('selectedFilePath')
            localStorage.setItem('isLogin', JSON.stringify(false))
            window.location.replace('/')
        }
    }

    // localeLngRef.current will be refference DOM element before component render when use hook useEffect, useLayoutEffect
    useLayoutEffect(() => {
        if (localeLngRef.current) {
            const childrens = localeLngRef.current.children
            Array.from(childrens).map((children, index) => {
                if (localStorage.getItem('lang') === children.alt) {
                    setId(index)
                }
            })
        }
    }, [])

    useEffect(() => {
        const fullnameStorage = localStorage.getItem('fullNameAccount')
        if (fullnameStorage) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [])


    useEffect(() => {
        const handleSroll = (e) => {
            if (window.scrollY > 120 || document.documentElement.scrollTop > 120) {
                setShowLogin(false)
                setShowInfo(false)
                setShowCart(false)
            }
        }
        window.addEventListener('scroll', handleSroll)
        return () => window.removeEventListener('scroll', handleSroll)
    }, [])

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (!e.target.closest('.menu-account')) {
                setShowLogin(false)
            }

            if (!e.target.closest('.menu-account')) {
                setShowInfo(false)
            }

            if (!e.target.closest('.moho-cart')) {
                setShowCart(false)
            }

            if (!e.target.closest('.header-search')) {
                setActiveSearch(false)
            }
        }
        window.addEventListener('mousedown', handleMouseDown)

        return () => window.removeEventListener('mousedown', handleMouseDown)
    }, [])


    const handleShowTitleMenuAccount = useMemo(() => {
        const yourAccount = t('Your account')
        if (yourAccount?.includes('Tài khoản của tôi')) {
            const output = yourAccount.slice(0, -4)
            return output
        }
        return yourAccount
    }, [isLogin])


    useEffect(() => {
        if (author.length) {
            author.forEach(result => {
                if (result.is_admin === 1) {
                    localStorage.setItem('isAdmin', result.is_admin)
                } else {
                    localStorage.setItem('isAdmin', result.is_admin)
                }
            })
        }
    }, [author])

    useEffect(() => {
        const admin = parseInt(localStorage.getItem('isAdmin'))
        if (admin === 1) {
            setIsAdmin(true)
            return
        }
        if (admin === 0) {
            setIsAdmin(false)
            return
        }
    }, [author])


    const handleAuthor = useCallback((data) => {
        setAuthor(data)
    }, [])


    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:9080/api/products')
            const datas = await res.data
            const results = datas.filter(data => {
                if (data.name.toLowerCase().includes(search.trim().toLowerCase())) {
                    return data
                }
            })
            setDataSearch(results)
        }
        if (search) {
            getData()
            setActiveSearch(true)
        }
    }, [search])

    const handleGetValueSearch = useCallback((value) => {
        valueSearch(value)
    }, [])





    const handleDetailPro = useCallback((id) => {
        localStorage.setItem('productDetail', JSON.stringify(id))
        window.location.reload()
    }, [])


    return (
        <>

            <div className="header">
                <div className="header__delivery-policy">
                    <span>{t('Delivery policy')}</span>
                </div>
                <div className="grid">
                    <div className="grid__row">
                        <div className="grid__col" style={{ width: '100%', maxWidth: '100%' }}>
                            <div className="header__container">
                                <div className="header__name">
                                    <Link to='/'>moho</Link>
                                    <i className="fa-sharp fa-solid fa-seedling"></i>
                                </div>

                                <div className="header-search">
                                    <input
                                        className="header-search__input"
                                        type='search'
                                        placeholder={t('Search product')}
                                        value={search}
                                        onFocus={() => setActiveSearch(true)}
                                        onChange={(e) => valueSearch(e.target.value)}
                                    />
                                    <button
                                        className="btn-search"
                                        type="search"
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>

                                    </button>

                                    {activeSearch && (search && <ul className="list-searchs">
                                        {dataSearch.length ? dataSearch.map((data, index) => (
                                            <li
                                                className="item-search"
                                                key={index}
                                                onClick={() => handleDetailPro(data.id)}
                                            >
                                                <Link to={`/products/${(data.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                                                    <div className="item-search__content">
                                                        <h3 className="item-search__name">{data.name}</h3>
                                                        {data.prices === 0 ?
                                                            <span className="item-search__prices">{`Giá dự kiến chỉ từ ${parseInt(30000000).toLocaleString('EN-VI')}`}
                                                                <span className="VND">₫</span>
                                                            </span>
                                                            : <span className="item-search__prices">{parseInt(data.prices).toLocaleString('EN')}
                                                                <span className="VND">₫</span>
                                                            </span>
                                                        }
                                                    </div>
                                                    <div className="item-search_img">
                                                        <img src={data.image_url.split(',')[0]} alt={data.name} />
                                                    </div>
                                                </Link>
                                            </li>
                                        )) :
                                            <span style={{
                                                padding: '18px 10px',
                                                display: 'block',
                                                fontSize: '1.2rem',
                                                color: '#434343',
                                                fontWeight: 600
                                            }}>Không tìm thấy sản phẩm nào phù hợp!</span>
                                        }
                                    </ul>)}
                                </div>



                                <div
                                    className="menu-account"
                                    onClick={() => (isLogin ? setShowInfo(!showInfo) : setShowLogin(!showLogin))}
                                >
                                    <div className="menu-account__icon">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                    <div className="menu-account__title">
                                        {isLogin || <span>{t('Login')} / {t('Register')}</span>}
                                        <div className="menu-account__your-account">
                                            <span>{isLogin ? handleShowTitleMenuAccount : t('Your account')}</span>
                                            {isLogin || <i className="fa-solid fa-angle-down"></i>}
                                        </div>
                                        {isLogin && (
                                            <div style={{ position: 'relative', letterSpacing: '0.8px', display: 'inline-block', paddingRight: '2.5px' }}>
                                                <span className="full-name-accout">{JSON.parse(localStorage.getItem('fullNameAccount'))} </span>
                                                <i style={{ position: 'absolute', right: '-11px', top: '4.9px', fontSize: '1.1rem' }} className="fa-solid fa-angle-down"></i>
                                            </div>
                                        )}

                                    </div>
                                    {isLogin || (showLogin && <Login onGetDataAuthor={handleAuthor} />)}

                                    {showInfo &&
                                        <div
                                            className="userInfo"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <h4 className="userInfo__title">Thông tin tài khoản</h4>
                                            <ul className="userInfo__list-options">
                                                {accountInfos.map((accountInfo, index) => (
                                                    <li
                                                        className="userInfo__item-option"
                                                        key={index}
                                                        onClick={() => handleClickOption(index)}
                                                    >
                                                        <Link
                                                            className="userInfo__item-link"
                                                            to={accountInfo.path}
                                                            style={{
                                                                color: highlight === index && '#000',
                                                                fontWeight: highlight === index && 500
                                                            }}

                                                        >
                                                            {accountInfo.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                </div>

                                {isAdmin ? (
                                    <div className="admin">
                                        <img className="admin__img" src="/assets/img/admin/admin.png" alt="Quản Trị Viên" />
                                        <Link to='/admin' className="admin__title">{t('Administrator')}</Link>
                                    </div>
                                ) :
                                    (
                                        <div
                                            className="moho-cart"
                                            onClick={() => setShowCart(!showCart)}
                                        >
                                            <span className="icon-product">
                                                <svg className="svg-ico-cart" style={{ enableBackground: 'new 0 0 512 512' }} height="23" viewBox="0 0 512 512" width="23" xmlns="http://www.w3.org/2000/svg">
                                                    <g>
                                                        <path d="m472 452c0 11.046-8.954 20-20 20h-20v20c0 11.046-8.954 20-20 20s-20-8.954-20-20v-20h-20c-11.046 0-20-8.954-20-20s8.954-20 20-20h20v-20c0-11.046 8.954-20 20-20s20 8.954 20 20v20h20c11.046 0 20 8.954 20 20zm0-312v192c0 11.046-8.954 20-20 20s-20-8.954-20-20v-172h-40v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-192v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-40v312h212c11.046 0 20 8.954 20 20s-8.954 20-20 20h-232c-11.046 0-20-8.954-20-20v-352c0-11.046 8.954-20 20-20h60.946c7.945-67.477 65.477-120 135.054-120s127.109 52.523 135.054 120h60.946c11.046 0 20 8.954 20 20zm-121.341-20c-7.64-45.345-47.176-80-94.659-80s-87.019 34.655-94.659 80z"></path>
                                                    </g>
                                                </svg>
                                            </span>

                                            {JSON.parse(localStorage.getItem('cartLists')).length <= 9 ?
                                                <span className="quanlity-product">
                                                    {JSON.parse(localStorage.getItem('cartLists')).length}
                                                </span>
                                                :
                                                <span className="quanlity-product">
                                                    9
                                                    <span className="quanlity-product__plus" style={{ position: 'absolute', top: '-2px', right: '0' }}>+</span>
                                                </span>
                                            }
                                            <span className="moho-cart__title">{t('Cart')}</span>
                                            {showCart && <Cart />}
                                        </div>
                                    )}


                                <div
                                    className='locale-language'
                                    ref={localeLngRef}
                                    onClick={handleLanguage}
                                >
                                    {localeLogos.map((localeLogo, index) => (
                                        <img
                                            key={index}
                                            style={{ ...localeLogo.style }}
                                            src={localeLogo.url}
                                            alt={localeLogo.alt}
                                            className={`${id === index ? '' : 'active'}`}
                                        />
                                    ))}

                                </div>
                            </div>
                            <Navigation
                                groupTypes={groupTypes}
                                types={types}
                                products={products}
                                dataSearch={dataSearch}
                            />
                        </div>
                    </div>
                </div>
            </div >
            <HeaderFixed
                localeLogos={localeLogos}
                accountInfos={accountInfos}
                onGetValueSearch={handleGetValueSearch}
                search={search}
                setValueSearch={valueSearch}
                onDetailPro={handleDetailPro}
                dataSearch={dataSearch}
            />

        </>
    )

}

export default memo(Header)