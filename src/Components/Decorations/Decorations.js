import { useState, useEffect, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import DecorationFilter from './DecorationFilter'
import { PAGE_SIZE } from "../AllProducts/AllProducts"
import Pagination from "../Pagination/Pagination"


const Decoration = ({ datas, dataTypes, dataGroupTypes, filterCategories, filterPrices, filterSort }) => {
    const [id, setId] = useState([])
    const [dataDecoration, setDataDecoration] = useState([])
    const [indexShowImg, setIndexShowImg] = useState(0)
    const [expectedData, setExpectedData] = useState([])
    const [currentPageData, setCurrentPageData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const handlePageChange = useCallback((page) => {
        const startIndex = (page - 1) * PAGE_SIZE
        const endIndex = startIndex + PAGE_SIZE
        setCurrentPageData(expectedData.slice(startIndex, endIndex))
    }, [expectedData])


    useEffect(() => {
        handlePageChange(1)
    }, [expectedData])


    useEffect(() => {
        const getId = dataGroupTypes.find(dataGroupType => dataGroupType.id === 6)
        const listIds = dataTypes.filter((dataType, index) => dataType['group_type_id'] === getId.id)

        listIds.map(listId => setId(prev => [...prev, listId.id]))
    }, [dataGroupTypes, dataTypes])

    useEffect(() => {
        const results = datas.filter(data => id.includes(data['type_id']))
        setDataDecoration(prev => [...prev, ...results])
    }, [datas, id])


    const handleMouseEnter = (index) => {
        setIndexShowImg(index)
    }

    const handleMouseLeave = (index) => {
        setIndexShowImg(index - 10000000000000)
    }

    const getDataExpected = useCallback((data) => {
        setExpectedData(data)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        async function handleLoading() {
            if (expectedData.length) {
                setIsLoading(false)
                return
            }
        }
        handleLoading()
    }, [expectedData.length])

    return (
        <main className="container product-lists">
            <img className="img-page" src="/assets/img/img-page/decorations.png" alt="Đồ Trang Trí" />
            <div className="grid">
                <div className="grid__row">
                    <h2 className="products__title px--16">Đồ Trang Trí</h2>
                    <DecorationFilter
                        dataDecoration={dataDecoration}
                        filterPrices={filterPrices}
                        filterCategories={filterCategories}
                        filterSort={filterSort}
                        onGetData={getDataExpected}
                    />

                    {isLoading ?

                        <span class="loader-main-products"></span> :
                        <>
                            {currentPageData.map((data, index) => (
                                <div
                                    key={index}
                                    className="grid__col-4 products px--16"
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    onClick={() => localStorage.setItem('productDetail', JSON.stringify(data.id))}
                                >
                                    <Link to={`/products/${(data.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                                        {
                                            data.discount ?
                                                <span className="product-discount">
                                                    -{data.discount}
                                                </span> :

                                                (data.created_at &&
                                                    `${new Date(data.created_at).getMonth() + 1}/${new Date(data.created_at).getDate()}/${new Date(data.created_at).getFullYear()}`
                                                    === new Date().toLocaleDateString()) &&
                                                <span className="product-new">
                                                    NEW
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
                            <Pagination total={expectedData.length} onPageChange={handlePageChange} />
                        </>
                    }
                </div>
            </div>
        </main>
    )

}

export default memo(Decoration)