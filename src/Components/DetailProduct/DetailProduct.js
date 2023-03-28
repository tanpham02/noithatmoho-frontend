import { useState, useEffect, useLayoutEffect, useMemo, memo } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import './DetailProduct.css'

const DetailProduct = () => {

    useEffect(() => {
        window.scroll(0, 0)
    },[])

    const [dataDetail, setDataDetail] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [isACtive, setIsActive] = useState(0)
    const [cartLists, setCartLists] = useState(() => {
        return JSON.parse(localStorage.getItem('cartLists')) ?? []
    })

    
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('productDetail'))
        async function getData() {
            const res = await axios.get(`http://localhost:9080/api/products/${id}`)
            const data = await res.data
            setDataDetail(prev => [...prev, data])
        }
        getData()
    }, [])


    useLayoutEffect(() => {
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


    const handleAddCatLists = (id) => {
        setCartLists(prev => {
            const x = cartLists.find(cart => {
                if (cart.id === id) {
                    const newQuantity = (cart.quantity += quantity)
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


    return (
        <div className="product-detail">
            <div className="grid">
                <div className="grid__row">
                    <div style={{ display: 'flex' }}>
                        <div className="grid__col-2-6">
                            {dataDetail.map((data, index) => (
                                <div key={index} className='product-detail__img'>
                                    <div className="product-detail__img-group">
                                        {data.image_url.split(',').map((img, index) => (
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
                                            src={data.image_url.split(',')[isACtive]}
                                            alt={data.name}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid__col-2-4">
                            {dataDetail.map((data, index) => (
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
                                            data.discount &&
                                            <span className="product-detail__discount">
                                                -{data.discount}
                                            </span>
                                        }
                                        {data.discount ?
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
                                        }
                                    </div>

                                    <div className="product-detail__desc">
                                        {data.size &&
                                            <span className="product-detail__desc-size">
                                                <strong>Kích thước: &nbsp;</strong>{data.size}
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

                                    {data.prices !== 0 && <div className="product-detail__quantity">
                                        <i onClick={() => setQuantity(quantity - 1)} className="fa-solid fa-minus"></i>
                                        <input
                                            type='text'
                                            value={quantity}
                                            min='1'
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                        <i onClick={() => setQuantity(quantity + 1)} className="fa-solid fa-plus"></i>
                                    </div>}

                                    <div className="product-detail__btn">
                                        {data.prices ?
                                            <>
                                                <button
                                                    onClick={() => handleAddCatLists(data.id)}
                                                    className="btn product-detail__btn-add-cart btn--color-prima-blue"
                                                >
                                                    Thêm vào giỏ
                                                </button>
                                                <button
                                                    className="btn product-detail__btn-add-cart btn--color-prima-orange"
                                                >
                                                    Mua ngay
                                                </button>
                                            </> :
                                            <button style={{ fontSize: '1.5rem', height: 50 }} className="btn product-detail__btn-add-cart btn--color-prima-blue">LIÊN HỆ ĐỂ NHẬN TƯ VẤN VÀ THIẾT KẾ MIỄN PHÍ</button>
                                        }
                                    </div>
                                    <div className="product-detail__info-promotion">
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
                                            Chỉ áp dụng 01 lần/01 khách hàng và không áp dụng cùng với các chương trình khuyến mại khác. Hạn sử dụng: 31/03/2023 (*)
                                        </span>
                                        <span>
                                            (*) Không áp dụng cho danh mục Đồ Trang Trí
                                        </span>
                                        <span>
                                            (**) Không áp dụng cho các sản phẩm Clearance. Chỉ bảo hành 01 năm cho khung ghế, mâm và cần đối với Ghế Văn Phòng
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )







}
export default memo(DetailProduct)