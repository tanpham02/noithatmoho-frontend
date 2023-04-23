import Navigation from "../Navigation/Navigation"
import Login from "../Login/Login"
import Cart from "../Cart/Cart"
import { useState, useEffect, useCallback, useRef, memo } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import './HeaderFixed.scss'

import { groupTypes, types, products, DEFAULT_LANG } from '../Header/Header'

const HeaderFixed = ({ onLanguage, search, setValueSearch, localeLogos, accountInfos, dataSearch, onGetValueSearch, onDetailPro }) => {
    const { t } = useTranslation()
    const [showLogin, setShowLogin] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [highlight, sethighLight] = useState(0)
    const [showInfo, setShowInfo] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [author, setAuthor] = useState([])
    const [activeSearch, setActiveSearch] = useState(false)
    const [fixedHeader, setFixedHeader] = useState(false)
    const inputSearchRef = useRef()
    const [currentLang, setCurrentLang] = useState('')

    const handleClickOption = (index) => {
        sethighLight(index)

        if (index === 3) {
            localStorage.removeItem('fullNameAccount')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('idUser')
            window.location.replace('/')
        }
    }


    useEffect(() => {
        const fullnameStorage = localStorage.getItem('fullNameAccount')
        if (fullnameStorage) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [])


    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.icon-search')) {
                setActiveSearch(false)
            }
        }
        window.addEventListener('click', handleClick)

        return () => window.removeEventListener('click', handleClick)
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
        }
        window.addEventListener('mousedown', handleMouseDown)


        return () => window.removeEventListener('mousedown', handleMouseDown)
    }, [])


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
        onGetValueSearch(search)
    }, [search])


    useEffect(() => {
        const handleShowHeader = () => {
            if (window.scrollY > 250) {
                setFixedHeader(true)
                return
            }
            setFixedHeader(false)
        }
        window.addEventListener('scroll', handleShowHeader)

        return () => window.removeEventListener('scroll', handleShowHeader)
    }, [])

    useEffect(() => {
        if (activeSearch) {
            inputSearchRef.current.focus()
        }
    }, [activeSearch])

    useEffect(() => {
        if (localStorage?.getItem('lang') ?? DEFAULT_LANG) {
            setCurrentLang(localStorage?.getItem('lang') ?? DEFAULT_LANG)
        }
    }, [localStorage.getItem('lang')])


    return (
        <div className={`header-fixed ${fixedHeader && 'active'}`}>
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col" style={{ width: '100%', maxWidth: '100%' }}>
                        <div className="header__container">
                            <div className="header__name">
                                <Link to='/'>moho</Link>
                                <i className="fa-sharp fa-solid fa-seedling"></i>
                            </div>

                            <Navigation
                                groupTypes={groupTypes}
                                types={types}
                                products={products}
                            />

                            <div
                                className="icon-search fixed mr---42px"
                                onClick={() => setActiveSearch(!activeSearch)}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                {activeSearch && <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="search fixed">
                                    <input
                                        ref={inputSearchRef}
                                        className="header-search__input"
                                        type='search'
                                        placeholder={t('Search product')}
                                        value={search}
                                        onChange={(e) => setValueSearch(e.target.value)}
                                    />

                                </div>}
                                {activeSearch && (search && <ul className="list-searchs fixed">
                                    {dataSearch.length ? dataSearch.map((data, index) => (
                                        <li
                                            className="item-search"
                                            key={index}
                                            onClick={() => onDetailPro(data.id)}
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
                                className="menu-account fixed mr---42px"
                                onClick={() => (isLogin ? setShowInfo(!showInfo) : setShowLogin(!showLogin))}
                            >
                                <div className="menu-account__icon">
                                    <i className="fa-regular fa-user"></i>
                                </div>

                                {isLogin || (showLogin && <Login onGetDataAuthor={handleAuthor} fixedHeader={fixedHeader} />)}

                                {showInfo &&
                                    <div
                                        className="userInfo" style={{ right: '-41px' }}
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
                                <div className="admin fixed mr---42px">
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

                                        {JSON.parse(localStorage.getItem('cartLists')) ?

                                            JSON.parse(localStorage.getItem('cartLists')).length <= 9 ?
                                                <span span className="quanlity-product">
                                                    {JSON.parse(localStorage.getItem('cartLists')).length}
                                                </span> :
                                                <span className="quanlity-product">
                                                    9
                                                    <span className="quanlity-product__plus" style={{ position: 'absolute', top: '-2px', right: '0' }}>+</span>
                                                </span>
                                            :
                                            <span className="quanlity-product">
                                                0
                                            </span>
                                        }
                                        <div
                                            className="123"
                                            style={{
                                                marginRight: '-55px',
                                                position: 'relative',
                                                top: ' -1px'
                                            }}
                                        >
                                            <span style={{
                                                marginTop: '6px',
                                                display: 'block'
                                            }}
                                                className="moho-cart__title"
                                            >
                                                {t('Cart')}
                                            </span>
                                            {showCart && <Cart />}
                                        </div>
                                    </div>
                                )}


                            <div
                                className='locale-language'
                                onClick={onLanguage}
                            >
                                {localeLogos.map((localeLogo, index) => (
                                    <img
                                        key={index}
                                        style={{ ...localeLogo.style }}
                                        src={localeLogo.url}
                                        alt={localeLogo.alt}
                                        className={`${currentLang === localeLogo.alt ? '' : 'active'}`}
                                    />
                                ))}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default memo(HeaderFixed)