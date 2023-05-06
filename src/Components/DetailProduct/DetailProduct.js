import { useState, useEffect, useLayoutEffect, useMemo, memo } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import './DetailProduct.scss'

const DetailProduct = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const [dataDetail, setDataDetail] = useState([])
    const [quantity, setQuantity] = useState(1)
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
            const res = await axios.get(`https://noithatmoho-backend.up.railway.app/api/products/${id}`)
            const data = await res.data
            setDataDetail(prev => [...prev, data])
            setIsLoading(false)
        }
        getData()
    }, [])


    useEffect(() => {
        dataDetail.forEach(data => {
            if (data.quantity_stock < quantity) {
                setStock(true)
                return
            } else {
                setStock(false)
                return
            }
        })
    }, [quantity])


    useEffect(() => {
        if (quantity <= 0) {
            setQuantity(1)
        }
    }, [quantity])



    useLayoutEffect(() => {
        const number = /^[0-9]+$/
        if (!number.test(quantity)) {
            setQuantity(1)
        }
    }, [quantity])


    const handleAddCatLists = (id, quantity_stock) => {
        if (quantity_stock === 0) {
            window.alert('Sản phẩm tạm hết hàng. Vui lòng chọn sản phẩm khác!')
            return
        } else {
            setCartLists(prev => {
                const x = cartLists.find(cart => {
                    if (cart.id === id) {
                        const newQuantity = (cart.quantity = parseInt(cart.quantity) + quantity)
                        return newQuantity
                    }
                })
                if (x) {
                    if (x.id === id) {
                        return [...prev, { id, quantity: x.quantity }]
                    }
                } else {
                    return [...prev, { id, quantity }]
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
            window.alert('Sản phẩm tạm hết hàng. Vui lòng chọn sản phẩm khác!')
            return
        } else {
            localStorage.setItem('cartLists', JSON.stringify([{ id, quantity }]))
            return
        }
    }


    return (
        <div className="product-detail">
            <div className="grid">
                {isLoading ?
                    <span class="loader-products"></span> :

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
                                                        alt={data.name}
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
                                                alt={data.name}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid__col-2-4">
                                {dataDetail.map((data, index) => {
                                    return (
                                        <div className="product-detail__content" key={index}>
                                            <div className="product-detail__heading">
                                                <h3 className="product-detail__name">{data.name}</h3>
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
                                                        <span className="product-detail__content-share">Chia sẻ:&nbsp;
                                                            <Link
                                                                to={`https://www.facebook.com/sharer/sharer.php?u=https://moho.com.vn/${window.location.pathname}`}
                                                            >
                                                                <img src="//theme.hstatic.net/200000065946/1000806110/14/facebook_social.png?v=2363" alt="Facebook" />
                                                            </Link>
                                                        </span>

                                                        <span className="product-detail__content-quantity">
                                                            Đã bán:&nbsp;
                                                            {data.quantity_sold}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="product-detail__prices">
                                                {
                                                    (data.quantity_stock !== 0) && (data.discount &&
                                                        <span className="product-detail__discount">
                                                            -{data.discount}
                                                        </span>)
                                                }
                                                {(data.quantity_stock !== 0) ? (data.discount ?
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
                                                            {`Giá dự kiến chỉ từ ${parseInt(30000000).toLocaleString('EN-VI')}`}
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
                                                    }}>Tạm hết hàng</span>
                                                }
                                            </div>

                                            <div className="product-detail__desc">
                                                {data.size &&
                                                    <span className="product-detail__desc-size">
                                                        <strong>Kích thước: &nbsp;</strong>
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
                                                            <strong>Chất liệu:&nbsp;</strong>
                                                            <span>- Mặt bàn màu nâu: Gỗ thông tự nhiên</span>
                                                            <span>- Mặt bàn màu tự nhiên: Gỗ công nghiệp MDF chuẩn CARB-P2 (*), Veneer gỗ sồi</span>
                                                            <span>- Chân bàn màu nâu: Gỗ thông tự nhiên</span>
                                                            <span>- Chân bàn màu tự nhiên: Gỗ cao su tự nhiên</span>
                                                        </div>
                                                        <div className="product-detail__desc-standard">
                                                            <span>(*) Tiêu chuẩn California Air Resources Board xuất khẩu Mỹ, đảm bảo gỗ không độc hại, an toàn cho sức khỏe</span>
                                                            <span> Chống thấm, cong vênh, trầy xước, mối mọt</span>
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
                                                        <strong style={{ color: '#434343' }}>Giá dự kiến chưa bao gồm đá, kính, thiết bị bếp,...</strong>
                                                        <span style={{ display: 'block' }} className='mb--14 mt--12'>
                                                            - Thiết kế miễn phí
                                                        </span>
                                                        <span style={{ display: 'block' }} className='mb--14'>
                                                            - Lắp đặt miễn phí
                                                        </span>
                                                        <span style={{ display: 'block' }}>
                                                            - Kiểm tra định kỳ miễn phí
                                                        </span>
                                                    </div>
                                                }
                                            </div>

                                            {
                                                JSON.parse(localStorage.getItem('isAdmin')) !== 1 && (data.prices !== 0 && <div className="product-detail__quantity">
                                                    <i onClick={() => setQuantity(quantity - 1)} className="fa-solid fa-minus"></i>
                                                    <input
                                                        type='text'
                                                        value={parseInt(quantity)}
                                                        min='1'
                                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                    />
                                                    <i onClick={() => setQuantity(quantity + 1)} className="fa-solid fa-plus"></i>
                                                </div>)
                                            }

                                            {stock && <span className="errorMsg">Số lượng trong kho không đủ!</span>}

                                            {
                                                JSON.parse(localStorage.getItem('isAdmin')) !== 1 && <div className="product-detail__btn">
                                                    {data.prices ?
                                                        <>
                                                            <button
                                                                onClick={() => handleAddCatLists(data.id, data.quantity_stock)}
                                                                className="btn product-detail__btn-add-cart btn--color-prima-blue"
                                                                disabled={stock}
                                                            >
                                                                Thêm vào giỏ
                                                            </button>
                                                            {JSON.parse(localStorage.getItem('isLogin')) ?
                                                                stock ? <Link
                                                                    to='#'
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        fontSize: '1.333rem'
                                                                    }}
                                                                    onClick={(e) => e.preventDefault()}
                                                                    className="btn product-detail__btn-add-cart btn--color-prima-orange"
                                                                >
                                                                    Mua ngay
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
                                                                        className="btn product-detail__btn-add-cart btn--color-prima-orange"
                                                                    >
                                                                        Mua ngay
                                                                    </Link> :
                                                                <Link
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        fontSize: '1.333rem'
                                                                    }}
                                                                    onClick={(e) => {
                                                                        e.preventDefault(); window.alert('Vui lòng đăng nhập để trải nghiệm tốt hơn!')
                                                                    }}
                                                                    className="btn product-detail__btn-add-cart btn--color-prima-orange"
                                                                >
                                                                    Mua ngay
                                                                </Link>
                                                            }

                                                        </> :
                                                        <button style={{ fontSize: '1.5rem', height: 50 }} className="btn product-detail__btn-add-cart btn--color-prima-blue">LIÊN HỆ ĐỂ NHẬN TƯ VẤN VÀ THIẾT KẾ MIỄN PHÍ</button>
                                                    }
                                                </div>
                                            }

                                            < div className="product-detail__info-promotion" >
                                                <span>
                                                    <i className="fa-solid fa-check"></i>
                                                    Miễn phí giao hàng & lắp đặt tại tất cả quận huyện thuộc TP.HCM, Hà Nội, Biên Hòa và một số quận thuộc Bình Dương (*)
                                                </span>
                                                <span>
                                                    <i className="fa-solid fa-check"></i>
                                                    Miễn phí 1 đổi 1 - Bảo hành 2 năm - Bảo trì trọn đời (**)
                                                </span>
                                                <span>
                                                    <i className="fa-solid fa-check"></i>
                                                    Nhập mã ưu đãi
                                                    <strong>&nbsp;MOHO50K, MOHO100K, MOHO200K, MOHO300K, MOHO500K.&nbsp;</strong>
                                                    Chỉ áp dụng 01 lần/01 khách hàng và không áp dụng cùng với các chương trình khuyến mại khác. Hạn sử dụng: 31/12/2023 (*)
                                                </span>
                                                <span>
                                                    (*) Không áp dụng cho danh mục Đồ Trang Trí
                                                </span>
                                                <span>
                                                    (**) Không áp dụng cho các sản phẩm Clearance. Chỉ bảo hành 01 năm cho khung ghế, mâm và cần đối với Ghế Văn Phòng
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div >
        </div >
    )







}
export default memo(DetailProduct)