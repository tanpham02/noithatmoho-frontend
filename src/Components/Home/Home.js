import { useEffect, useState, memo } from "react"
import { Link } from "react-router-dom"
import './Home.scss'
const Home = ({ datas, dataGroupTypes, dataTypes }) => {
    const [indexShowImg, setIndexShowImg] = useState(0)
    const [dataDiscount, setDataDiscount] = useState([])
    const [dataBestSeller, setDataBestSeller] = useState([])
    const [dataDecors, setDataDecors] = useState([])
    const handleMouseEnter = (index) => {
        setIndexShowImg(index)
    }

    useEffect(() => {
        const outputs = datas.filter(data => {
            if (data.discount) {
                return data
            }
        })
        setDataDiscount(outputs)
    }, [datas])

    useEffect(() => {
        const outputs = datas.filter(data => {
            if (data.quantity_sold >= 150) {
                return data
            }
        })
        setDataBestSeller(outputs)
    }, [datas])


    useEffect(() => {
        const idDataGroup = dataGroupTypes.find(dataGroup => dataGroup.id === 6)
        if(idDataGroup) {
            const listIds = dataTypes
                .filter(dataType => {
                    if (idDataGroup?.id === dataType['group_type_id']) {
                        return dataType
                    }
                })
                .map(ids => ids.id)
    
            const dataDecor = datas.filter(data => listIds.includes(data['type_id']))
            setDataDecors(dataDecor)
        }

    }, [dataGroupTypes, dataTypes, datas])


    const handleMouseLeave = (index) => {
        setIndexShowImg(index - 10000000000000)
    }
    return (
        <main className="container product-lists">
            <div className="grid">
                <div className="grid__row ">
                    <div className="discount-home">
                        <div className="flex-box">
                            <h2 className="products__title px--16 discount-home__heading">Ưu Đãi Giới Hạn</h2>
                            <Link to='/collections/uu-dai' className="seen-more">Xem thêm</Link>
                        </div>
                        {dataDiscount.slice(0, -2).map((data, index) => (
                            <div
                                key={index}
                                className="grid__col-4 products px--16"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onClick={() => localStorage.setItem('productDetail', JSON.stringify(data.id))}
                            >
                                <Link to={`/products/${(data.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>


                                    {
                                        data.discount &&
                                        <span className="product-discount">
                                            -{data.discount}
                                        </span>
                                    }

                                    {
                                        data.quantity_sold >= 150 &&
                                        <span className="product-quantity-sold">
                                            Best Seller
                                        </span>
                                    }
                                    <div className="products__img">
                                        <img src={indexShowImg === index ? data.image_url.split(', ')[1] || data.image_url.split(', ')[0] : data.image_url.split(', ')[0]}
                                            alt={data.name}
                                            className="products__img-child"
                                        />
                                    </div>
                                    <div className="products__content">
                                        <h3 className="product-content__name">{data.name}</h3>
                                        <div className="product-content__price">

                                            {data.discount ?
                                                <span className="product__price-new">{data.discount ? (data.prices - (data.prices * (parseInt(data.discount)) / 100)).toLocaleString("en-VI") /* ,{style: "currency", currency: "VND"} */ : parseInt(data.prices).toLocaleString("en-VI")}
                                                    <span className="cart__total-price-vnd">₫</span>
                                                </span>
                                                :
                                                <span>
                                                    <span className="product__price-new">{parseInt(data.prices).toLocaleString("en-VI")}
                                                        <span className="cart__total-price-vnd">₫</span>
                                                    </span>
                                                </span>
                                            }
                                            {data.discount && <span className="product__price-old item-product__price-old">{data.prices.toLocaleString('en-VI')}
                                                <span className="cart__total-price-vnd">₫</span>
                                            </span>}
                                        </div>
                                        <div className="product__content-review">
                                            <div className="product__content-star ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <span className="quantity-review">(12)</span>
                                            </div>
                                            <span className="product-content__sold-quantity">Đã bán {data.quantity_sold}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="best-seller-products-home">
                        <div className="flex-box">
                            <h2 className="products__title px--16 best-seller-products-home__heading">Sản phẩm bán chạy</h2>
                            <Link to='/page/best-seller' className="seen-more">Xem thêm</Link>
                        </div>
                        {dataBestSeller.slice(0, -6).map((data, index) => (
                            <div
                                key={index}
                                className="grid__col-4 products px--16"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onClick={() => localStorage.setItem('productDetail', JSON.stringify(data.id))}
                            >
                                <Link to={`/products/${(data.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>


                                    {
                                        data.discount &&
                                        <span className="product-discount">
                                            -{data.discount}
                                        </span>
                                    }

                                    {
                                        data.quantity_sold >= 150 &&
                                        <span className="product-quantity-sold">
                                            Best Seller
                                        </span>
                                    }
                                    <div className="products__img">
                                        <img src={indexShowImg === index ? data.image_url.split(', ')[1] || data.image_url.split(', ')[0] : data.image_url.split(', ')[0]}
                                            alt={data.name}
                                            className="products__img-child"
                                        />
                                    </div>
                                    <div className="products__content">
                                        <h3 className="product-content__name">{data.name}</h3>
                                        <div className="product-content__price">

                                            {data.discount ?
                                                <span className="product__price-new">{data.discount ? (data.prices - (data.prices * (parseInt(data.discount)) / 100)).toLocaleString("en-VI") /* ,{style: "currency", currency: "VND"} */ : parseInt(data.prices).toLocaleString("en-VI")}
                                                    <span className="cart__total-price-vnd">₫</span>
                                                </span>
                                                :
                                                <span>
                                                    <span className="product__price-new">{parseInt(data.prices).toLocaleString("en-VI")}
                                                        <span className="cart__total-price-vnd">₫</span>
                                                    </span>
                                                </span>
                                            }
                                            {data.discount && <span className="product__price-old item-product__price-old">{data.prices.toLocaleString('en-VI')}
                                                <span className="cart__total-price-vnd">₫</span>
                                            </span>}
                                        </div>
                                        <div className="product__content-review">
                                            <div className="product__content-star ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <span className="quantity-review">(12)</span>
                                            </div>
                                            <span className="product-content__sold-quantity">Đã bán {data.quantity_sold}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="collection-home">
                        <h2 className="products__title px--16 collection-home__heading">Bộ sưu tập nổi bật</h2>

                        <ul className="collection-home__left">
                            <li className="mb--14">
                                <Link to='/collections/vienna-collection'>
                                    <img src="/assets/img/collection-home/collection-vienna.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link to='/collections/vline-collection'>
                                    <img src="/assets/img/collection-home/vline-collection.png" alt="" />
                                </Link>
                            </li>
                        </ul>
                        <ul className="collection-home__right">
                            <li className="mb--14">
                                <Link to='/pages/kitchen'>
                                    <img width={'104%'} src="/assets/img/collection-home/moho-kitchen.png" alt="" />
                                </Link>
                            </li>
                            <div className="collection-home__right__wrapper">
                                <li>
                                    <Link to='/collections/fiji-collection'>
                                        <img width={374} height={267} src="/assets/img/collection-home/collection-fiji.png" alt="" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/collections/kolding-collection'>
                                        <img width={374} height={267} src="/assets/img/collection-home/collection-kolding.png" alt="" />
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className="decoration-home">
                        <div className="flex-box">
                            <h2 className="products__title px--16 decoration-home__heading">Đồ trang trí HOT</h2>
                            <Link to='/collections/do-trang-tri' className="seen-more">Xem thêm</Link>
                        </div>
                        {dataDecors.slice(0, -5).map((data, index) => (
                            <div
                                key={index}
                                className="grid__col-4 products px--16"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onClick={() => localStorage.setItem('productDetail', JSON.stringify(data.id))}
                            >
                                <Link to={`/products/${(data.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>


                                    {
                                        data.discount &&
                                        <span className="product-discount">
                                            -{data.discount}
                                        </span>
                                    }

                                    {
                                        data.quantity_sold >= 150 &&
                                        <span className="product-quantity-sold">
                                            Best Seller
                                        </span>
                                    }
                                    <div className="products__img">
                                        <img src={indexShowImg === index ? data.image_url.split(', ')[1] || data.image_url.split(', ')[0] : data.image_url.split(', ')[0]}
                                            alt={data.name}
                                            className="products__img-child"
                                        />
                                    </div>
                                    <div className="products__content">
                                        <h3 className="product-content__name">{data.name}</h3>
                                        <div className="product-content__price">

                                            {data.discount ?
                                                <span className="product__price-new">{data.discount ? (data.prices - (data.prices * (parseInt(data.discount)) / 100)).toLocaleString("en-VI") /* ,{style: "currency", currency: "VND"} */ : parseInt(data.prices).toLocaleString("en-VI")}
                                                    <span className="cart__total-price-vnd">₫</span>
                                                </span>
                                                :
                                                <span>
                                                    <span className="product__price-new">{parseInt(data.prices).toLocaleString("en-VI")}
                                                        <span className="cart__total-price-vnd">₫</span>
                                                    </span>
                                                </span>
                                            }
                                            {data.discount && <span className="product__price-old item-product__price-old">{data.prices.toLocaleString('en-VI')}
                                                <span className="cart__total-price-vnd">₫</span>
                                            </span>}
                                        </div>
                                        <div className="product__content-review">
                                            <div className="product__content-star ">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <span className="quantity-review">(12)</span>
                                            </div>
                                            <span className="product-content__sold-quantity">Đã bán {data.quantity_sold}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default memo(Home)

