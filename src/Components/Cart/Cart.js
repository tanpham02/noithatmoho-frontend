import { useTranslation } from 'react-i18next'
import { useState, useEffect, useMemo, memo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Cart.scss'

const Cart = () => {
    const [datas, setDatas] = useState([])
    const [cartLists, setCartLists] = useState([])
    const { t } = useTranslation(['header'])
    const [carts, setCarts] = useState([])

    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('cartLists'))
        setCarts([...carts])
    }, [])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:9080/api/products')
            const data = await res.data
            setDatas(data)
        }
        fetchData()
    }, [])


    useEffect(() => {
        if (datas.length) {
            carts.forEach(id => {
                const output = datas.find(data => {
                    return data.id === id.id
                })
                setCartLists(prev => [...prev, output])
            })
        }
    }, [datas, carts])


    const handleRemoveCart = (id, e) => {
        if (e.target.closest('i.fa-solid.fa-xmark.rounded-sm.cart__item-remove')) {
            e.preventDefault()
            e.stopPropagation()
            const index = carts.findIndex(cart => cart.id === id)
            if (index > -1) {
                carts.splice(index, 1)
            }
            localStorage.setItem('cartLists', JSON.stringify([...carts]))
            window.location.replace(window.location.pathname)
        }
    }


    const totalCart = useMemo(() => {
        const merge = cartLists.concat(carts)
        const result = Object.values(merge.reduce((accumulator, current) => {
            const { id, name, discount= '', prices = 0, quantity_sold = 0, quantity_stock = 0, image_url = '', quantity = 0 } = current
            accumulator[id] = accumulator[id] || { id, name, discount, prices: 0, quantity_sold: 0, quantity_stock: 0, image_url: '', quantity: 0 }
            accumulator[id].prices += prices
            accumulator[id].quantity_sold += quantity_sold
            accumulator[id].quantity_stock += quantity_stock
            accumulator[id].image_url += image_url
            accumulator[id].quantity += quantity
            return accumulator
        }, {}));

        const totals = result.reduce((acc, next) => {
            if (next?.discount) {
                return acc + ((next.prices - (next.prices * (parseInt(next.discount)) / 100)) * next.quantity)
            }
            return acc + next.prices * next.quantity

        }, 0)
        return parseInt(totals).toLocaleString('EN-VI')

    }, [cartLists, carts])

    const handlGetProductDetail = (id) => {
        localStorage.setItem('productDetail', JSON.stringify(id))
        window.location.reload()
    }

    return (
        <div
            className="cart"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="cart__container">
                <p
                    className="cart__heading">
                    {t('Cart')}
                </p>
                <div className="cart__main">
                    {carts.length ?
                        <ul className="cart__lists">
                            {cartLists.map((cart, index) =>
                                <li
                                    className="cart__item"
                                    onClick={() => handlGetProductDetail(cart.id)}
                                >
                                    <Link
                                        style={{ display: 'flex' }}
                                        to={`/products/${(cart.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")} `}
                                    >
                                        <img
                                            src={cart.image_url.split(',')[0]}
                                            alt={cart.name}
                                            className="cart__item-img"
                                        />
                                        <div className="cart__item-product">
                                            <div className="item-product__name">
                                                <h2 >
                                                    {cart.name}
                                                </h2>
                                            </div>
                                            <span className="item-product__color">MÀU TỰ NHIÊN</span>

                                            <div className="item-product__quanlity-price">

                                                {carts.map((cartStorage, index) => {
                                                    if (cart.id === cartStorage.id) {
                                                        return (
                                                            <div className='item-product__groups-quantity' >
                                                                <span key={index} className='item-product__quantity'>{cartStorage.quantity}</span>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                                <div className="item-product__prices">
                                                    {cart.discount ?
                                                        <>
                                                            <span className="product-detail__prices-new cart-price--color">
                                                                {cart.discount ?
                                                                    (cart.prices - (cart.prices * (parseInt(cart.discount)) / 100)).toLocaleString("en-VI") :
                                                                    parseInt(cart.prices).toLocaleString("en-VI")
                                                                }
                                                                <span className="VND">₫</span>
                                                            </span>

                                                            <span className="product-detail__prices-old item-product__price-old cart-price--color">
                                                                {parseInt(cart.prices).toLocaleString("en-VI")}
                                                                <span className="VND">₫</span>
                                                            </span>
                                                        </> :
                                                        <span className="product-detail__prices-new cart-price--color">
                                                            {cart.prices.toLocaleString('en-VI')}
                                                            <span className="VND">₫</span>
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <i
                                            className="fa-solid fa-xmark rounded-sm cart__item-remove"
                                            onClick={(e) => handleRemoveCart(cart.id, e)}
                                        ></i>
                                    </Link>
                                </li>
                            )}
                        </ul> :

                        (<div className="cart__no-cart">
                            <svg width="55" height="45" viewBox="0 0 81 70" className="mr-6" style={{ marginTop: 2 }}>
                                <g transform="translate(0 2)" strokeWidth="4" stroke="#333333" fill="none" fillRule="evenodd">
                                    <circle strokeLinecap="square" cx="34" cy="60" r="6"></circle>
                                    <circle strokeLinecap="square" cx="67" cy="60" r="6"></circle>
                                    <path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
                                </g>
                            </svg>
                            <span>Hiện chưa có sản phẩm</span>
                        </div>)
                    }
                </div>
            </div>

            <div className="cart__total-prices">
                <span className="cart__total-title">TỔNG TIỀN:</span>
                <span className="cart__total-price total-carts">{totalCart}
                    <span className="cart__total-price-vnd alignment--position">₫</span>
                </span>
            </div>

            <div className="cart-btns">
                <Link className="btn cart-btns__view"
                    to=""
                >
                    Xem giỏ hàng
                </Link>
                {carts.length ?
                    JSON.parse(localStorage.getItem('isLogin')) ?
                        <Link className="btn cart-btns__checkout"
                            to={
                                `/checkout/${(JSON.parse(localStorage.getItem('fullNameAccount')))?.split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                        >
                            Thanh toán
                        </Link> :
                        <Link className="btn cart-btns__checkout" onClick={() => window.alert('Vui lòng đăng nhập để trải nghiệm được tốt hơn!')}
                            to=''
                        >
                            Thanh toán
                        </Link> :
                    <Link className="btn cart-btns__checkout"
                        onClick={() => window.alert('Hiện tại không có sản phẩm nào!')}    
                        to=''
                    >
                        Thanh toán
                    </Link>
                }

            </div>
        </div >
    )
}

export default memo(Cart)