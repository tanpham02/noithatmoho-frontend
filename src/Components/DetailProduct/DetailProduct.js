import { useState, useEffect, useLayoutEffect, useMemo, memo } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import './DetailProduct.scss'
import { API_SERVER_MYDUNG, API_SERVER_TANPHAM } from "../.."
import { useTranslation } from 'react-i18next'


const DetailProduct = () => {
    const { t } = useTranslation(['products', 'header'])
    useEffect(() => {
        window.scroll(0, 0)
    }, [])


    const [dataDetail, setDataDetail] = useState([])
    const [quantity, setQuantity] = useState('1')
    const [isACtive, setIsActive] = useState(0)
    const [cartLists, setCartLists] = useState(() => {
        return JSON.parse(localStorage.getItem('cartLists')) ?? []
    })
    const [stock, setStock] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const id = JSON.parse(localStorage.getItem('productDetail'))
        async function getData() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/products/${id}`)
                const data = await res.data
                setDataDetail(prev => [...prev, data])
                setIsLoading(false)

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/products/${id}`)
                const data = await res.data
                setDataDetail(prev => [...prev, data])
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        dataDetail.forEach(data => {
            if (quantity > data.quantity_stock) {
                setStock(true)
                return
            } else {
                setStock(false)
                return
            }
        })
    }, [quantity])

    useLayoutEffect(() => {
        const number = /^[0-9]+$/
        if (quantity <= 0 || !number.test(quantity)) {
            setQuantity('')
            return
        }
    }, [quantity])


    const handleAddCatLists = (id, quantity_stock) => {
        if (quantity_stock === 0) {
            window.alert(`${t('Product is temporarily out of stock. Please choose another product')}`)
            return
        } else {
            setCartLists(prev => {
                const x = cartLists.find(cart => {
                    if (cart.id === id) {
                        const newQuantity = (cart.quantity = parseInt(cart.quantity) + parseInt(quantity))
                        return parseInt(newQuantity)
                    }
                })
                if (x) {
                    if (x.id === id) {
                        return [...prev, { id, quantity: parseInt(x.quantity) }]
                    }
                } else {
                    return [...prev, { id, quantity: quantity.length ? parseInt(quantity) : 1 }]
                }
            })
            window.location.reload()
            return
        }
    }

    const handelGetCartUnique = useMemo(() => {
        const key = 'id';
        const newCartList = [...new Map(cartLists.map(item =>
            [item[key], item])).values()];

        return newCartList
    }, [cartLists])

    useEffect(() => {
        localStorage.setItem('cartLists', JSON.stringify(handelGetCartUnique))
    }, [handelGetCartUnique])



    const handleBuyProduct = (id, quantity_stock) => {
        if (quantity_stock === 0) {
            window.alert(`${t('Product is temporarily out of stock. Please choose another product')}`)
            return
        } else {
            localStorage.setItem('cartLists', JSON.stringify([{ id, quantity: parseInt(quantity) }]))
            return
        }
    }


    return (
        <div className="product-detail">
            <div className="grid">
                {isLoading ?
                    <span className="loader-products"></span> :

                    <div className="grid__row">
                        <div style={{ display: 'flex' }}>
                            <div className="grid__col-2-6">
                                {dataDetail.map((data, index) => (
                                    <div key={index} className='product-detail__img'>
                                        <div className="product-detail__img-group">
                                            {data.image_url.split(', ').map((img, index) => (
                                                <div
                                                    key={index}
                                                    className={`product-detail__img-content ${isACtive === index && 'active'}`}
                                                    onClick={() => setIsActive(index)}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={t(data.name)}
                                                    />
                                                </div>)
                                            )}

                                        </div>
                                        <div className="product-detail__img-single">
                                            {data.quantity_sold >= 150 &&
                                                <span className="product-detail__best-seller">
                                                    Best Seller
                                                </span>
                                            }
                                            <img
                                                src={data.image_url.split(', ')[isACtive]}
                                                alt={t(data.name)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid__col-2-4">
                                {dataDetail.map((data, index) => (
                                    <div className="product-detail__content" key={index}>
                                        <div className="product-detail__heading">
                                            <h3 className="product-detail__name">{t(data.name)}</h3>
                                            <div className="product-detail__overview">
                                                <div className="product-detail__content-review">
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <span className="quantity-review">&nbsp;(12)</span>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: ' center',
                                                    width: '160px'
                                                }}>
                                                    <span className="product-detail__content-share">{t('Share')}:&nbsp;
                                                        <Link
                                                            to={`https://www.facebook.com/sharer/sharer.php?u=https://moho.com.vn/${window.location.pathname}`}
                                                        >
                                                            <img src="//theme.hstatic.net/200000065946/1000806110/14/facebook_social.png?v=2363" alt="Facebook" />
                                                        </Link>
                                                    </span>

                                                    <span className="product-detail__content-quantity">
                                                        {t('Sold')}:&nbsp;
                                                        {data.quantity_sold}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="product-detail__prices">
                                            {
                                                (data.quantity_stock !== 0) && (data.discount &&
                                                    <span className="product-detail__discount">
                                                        {
                                                            data.discount.includes('%') ?
                                                                `-${data.discount}` :
                                                                `-${data.discount}%`
                                                        }
                                                    </span>)
                                            }
                                            {(data.quantity_stock > 0) ?
                                                (data.discount ?
                                                    <>
                                                        <span className="product-detail__prices-new">
                                                            {data.discount ?
                                                                (data.prices - (data.prices * (parseInt(data.discount)) / 100)).toLocaleString("en-VI") :
                                                                parseInt(data.prices).toLocaleString("en-VI")
                                                            }
                                                            <span className="VND">₫</span>
                                                        </span>

                                                        <span className="product-detail__prices-old item-product__price-old">
                                                            {parseInt(data.prices).toLocaleString("en-VI")}
                                                            <span className="VND">₫</span>
                                                        </span>
                                                    </> :
                                                    (data.prices === 0) ?
                                                        <span className="product-detail__prices-new" style={{ fontSize: 12 }}>
                                                            {`${t('Estimated price from')} ${parseInt(30000000).toLocaleString('EN-VI')}`}
                                                            <span className="VND">₫</span>
                                                        </span>
                                                        :
                                                        <span className="product-detail__prices-new ">{data.prices.toLocaleString('en-VI')}
                                                            <span className="VND">₫</span>
                                                        </span>
                                                ) :
                                                <span style={{
                                                    backgroundColor: 'var(--primary-color-blue)',
                                                    fontSize: '1.3rem',
                                                    fontWeight: 600,
                                                    color: 'var(--text-white)',
                                                    filter: 'brightness(1.1)',
                                                    display: 'inline-block',
                                                    lineHeight: '40px',
                                                    height: '40px',
                                                    padding: '0 12px',
                                                    borderRadius: '4px'
                                                }}>{t('Temporarily out of stock')}</span>
                                            }
                                        </div>

                                        <div className="product-detail__desc">
                                            {data.size &&
                                                <span className="product-detail__desc-size">
                                                    <strong>{t('Size')}: &nbsp;</strong>
                                                    {data.size.split(', ').length === 1 ?
                                                        data.size.split(', ')[0] :
                                                        data.size.split(', ').map(si =>
                                                            <span className="mt--12" style={{ display: 'block' }}>- {si}</span>
                                                        )
                                                    }
                                                </span>
                                            }

                                            {data.size ?
                                                <>
                                                    <div className="product-detail__desc-material">
                                                        <strong>{t('Material')}:&nbsp;</strong>
                                                        <span>- {t('Table top')}</span>
                                                        <span>- {t('Table legs')}</span>
                                                        <span>- {t('Industrial wood, Rubber veneer')}</span>
                                                    </div>
                                                    <div className="product-detail__desc-standard">
                                                        <span>(*) {t('Standard California')}</span> <br />
                                                        <span className="mt--12" style={{ display: 'block' }}> {t('Waterproof, warping, scratches, termites')}</span>
                                                    </div>
                                                </>
                                                :
                                                <div style={{
                                                    fontSize: '1.2rem',
                                                    color: '#000',
                                                    textAlign: 'left',
                                                    fontWeight: '400'
                                                }}
                                                >
                                                    <strong style={{ color: '#434343' }}>{t('Estimated price does not include stone, glass, kitchen equipment,...')}</strong>
                                                    <span style={{ display: 'block' }} className='mb--14 mt--12'>
                                                        - {t('Free Design')}
                                                    </span>
                                                    <span style={{ display: 'block' }} className='mb--14'>
                                                        - {t('Free installation')}
                                                    </span>
                                                    <span style={{ display: 'block' }}>
                                                        - {t('Free Periodic Checks')}
                                                    </span>
                                                </div>
                                            }
                                        </div>


                                        <div style={{ paddingTop: 10 }}>
                                            {(JSON.parse(localStorage.getItem('isAdmin')) !== 1 && data.prices !== 0) &&
                                                <>
                                                    <span
                                                        style={{
                                                            fontSize: ' 1.2rem',
                                                            color: "var(--gray-color)",
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {`${t('Products available')} ${data.quantity_stock > 0 ? data.quantity_stock : 0}`}
                                                    </span>

                                                    <div className="product-detail__quantity">
                                                        <i
                                                            onClick={() => setQuantity(quantity > 1 ? parseInt(quantity) - 1 : 1)}
                                                            className="fa-solid fa-minus">
                                                        </i>
                                                        <input
                                                            type='text'
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                        />
                                                        <i
                                                            onClick={() => setQuantity(quantity > 0 ? parseInt(quantity) + 1 : 1)}
                                                            className="fa-solid fa-plus">
                                                        </i>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        {stock && <span className="errorMsg">{t('The quantity in stock is not enough')}</span>}
                                        {JSON.parse(localStorage.getItem('isAdmin')) !== 1 && <div className="product-detail__btn">
                                            {data.prices ?
                                                <>
                                                    <button
                                                        onClick={() => handleAddCatLists(data.id, data.quantity_stock)}
                                                        className={`btn product-detail__btn-add-cart btn--color-prima-blue ${stock && 'stock-btn'}`}
                                                        disabled={stock}
                                                    >
                                                        {t('Add to Carts')}
                                                    </button>
                                                    {JSON.parse(localStorage.getItem('isLogin')) ?
                                                        stock ? <Link
                                                            to='#'
                                                            style={{
                                                                textAlign: 'center',
                                                                fontSize: '1.333rem'
                                                            }}
                                                            onClick={(e) => e.preventDefault()}
                                                            className={`btn product-detail__btn-add-cart btn--color-prima-orange ${stock && 'stock-btn'}`}
                                                        >
                                                            {t('BUY NOW')}
                                                        </Link> :
                                                            <Link
                                                                style={{
                                                                    textAlign: 'center',
                                                                    fontSize: '1.333rem'
                                                                }}
                                                                to={data.quantity_stock !== 0 ?
                                                                    (`/checkout/${(JSON.parse(localStorage.getItem('fullNameAccount')))?.split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || ''}  `) :
                                                                    '#'
                                                                }
                                                                onClick={() => handleBuyProduct(data.id, data.quantity_stock)}
                                                                className={`btn product-detail__btn-add-cart btn--color-prima-orange ${stock && 'stock-btn'}`}
                                                            >
                                                                {t('BUY NOW')}
                                                            </Link> :
                                                        <Link
                                                            style={{
                                                                textAlign: 'center',
                                                                fontSize: '1.333rem'
                                                            }}
                                                            onClick={(e) => {
                                                                e.preventDefault(); window.alert(`${t('Please login for a better experience')}`)
                                                            }}
                                                            className={`btn product-detail__btn-add-cart btn--color-prima-orange ${stock && 'stock-btn'}`}
                                                        >
                                                            {t('BUY NOW')}
                                                        </Link>
                                                    }

                                                </> :
                                                <button
                                                    style={{
                                                        fontSize: '1.4rem',
                                                        height: 50
                                                    }}
                                                    className="btn product-detail__btn-add-cart btn--color-prima-blue"
                                                >
                                                    {t('CONTACT US FOR FREE CONSULTING AND DESIGN')}
                                                </button>
                                            }
                                        </div>}

                                        < div className="product-detail__info-promotion" >
                                            <span>
                                                <i className="fa-solid fa-check"></i>
                                                {t('Delivery policy', { ns: 'header' })}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-check"></i>
                                                {t('Free 1 to 1 exchange - 2 years warranty - Lifetime maintenance')}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-check"></i>
                                                {t('Enter promo code')}
                                                <strong>&nbsp;MOHO50K, MOHO100K, MOHO200K, MOHO300K, MOHO500K.&nbsp;</strong>
                                                {t('Valid only once per customer and cannot be combined with other promotions. Expiry date:')} 31/12/2023 (*)
                                            </span>
                                            <span>
                                                (*) {t('Not applicable for Decoration category')}
                                            </span>
                                            <span>
                                                (**) {t('Only 1 year warranty for chair frame, wheel and lever for Office Chair')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div >
        </div >
    )







}
export default memo(DetailProduct)