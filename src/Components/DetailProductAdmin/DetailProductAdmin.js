import { useState, useEffect, memo } from 'react'
import axios from 'axios'
import './DetailProductAdmin.scss'

const DetailProductAdmin = () => {
    const [product, setProduct] = useState({})
    const [isACtive, setIsActive] = useState(0)

    const [namePro, setNamePro] = useState('')
    const [pricePro, setPricePro] = useState('')
    const [discountPro, setDiscountPro] = useState('')
    const [quantityStock, setQuantityStock] = useState(null)
    const [quantitySold, setQuantitySold] = useState(null)
    const [listImgs, setListImgs] = useState([])
    const [listAvatar, setListAvatar] = useState()
    const [size, setSize] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    const handleChangeImg = (e) => {
        const listImgsUrl = Array.from(e.target.files)
        const imgDemo = e.target.files[0]
        setListAvatar(imgDemo)


        // Convert to base 64 and save db
        listImgsUrl.map(img => {
            const readFile = new FileReader()
            readFile.readAsDataURL(img)
            readFile.onload = () => setListImgs(prev => [...prev, readFile.result])
        })
    }



    useEffect(() => {
        const id = window.location.pathname.split('/')[3]
        async function fetchData() {
            const res = await axios.get(`http://localhost:9080/api/products/${id}`)
            const datas = res.data
            setProduct(datas)
        }
        fetchData()

    }, [window.location.pathname])

    useEffect(() => {
        if (product) {
            if (product.name) {
                setNamePro(product.name)
            }
            if (product.prices) {
                setPricePro(product.prices)
            }
            if (product.discount) {
                setDiscountPro(product.discount)
            }
            if (product.quantity_stock) {
                setQuantityStock(product.quantity_stock)
            }
            if (product.quantity_sold) {
                setQuantitySold(product.quantity_sold)
            }
            if (product.size) {
                setSize(product.size)
            }
        }
    }, [product])


    const handleSubmit = (e) => {
        e.preventDefault()

        const updateData = {
            ...product,
            name: namePro ? namePro : product.name,
            prices: pricePro ? pricePro : product.prices,
            discount: discountPro,
            quantity_stock: quantityStock ? parseInt(quantityStock) : product.quantity_stock,
            quantity_sold: quantitySold ? parseInt(quantitySold) : product.quantity_sold,
            image_url: listImgs.length ? listImgs.join(', ') : product.image_url,
            size: size ? size : product.size
        }

        setIsLoading(true)
        async function updatePro() {
            const res = await axios.put(`http://localhost:9080/api/products/${product.id}`, updateData)
            setIsLoading(false)
            window.location.reload()
            return res.data
        }
        if (window.confirm('Bạn có chắc chắn muốn cập nhật sản phẩm này?') === true) {
            updatePro()
        } else {
            setIsLoading(false)
            return
        }
    }



    return (
        <div className="product-detail-admin">
            <h1 className="productTitle">Chi tiết sản phẩm</h1>
            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.image_url && product.image_url.split(', ')[0]} alt={product.name} className="productInfoImg" />
                        <span className="productName">{product.name}</span>
                    </div>
                    {product.quantity_stock === 0 &&
                        <span
                            className='errorMsg'
                            style={{
                                padding: '8px 0',
                                display: 'block',
                                fontSize: '1.25rem',
                                fontWeight: '500'
                            }}
                        >
                            ( Sản phẩm đã hết hàng. Vui lòng liên hệ đối tác để nhập hàng! )
                        </span>
                    }
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID</span>
                            <span className="productInfoValue">{product.id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Giảm giá</span>
                            {product.discount ?
                                <span className="productInfoValue">{product.discount}</span> :
                                <span className='fee-line'></span>
                            }
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Giá</span>
                            <span className="productInfoValue" style={{ letterSpacing: 1 }}>{`${parseInt(product.prices).toLocaleString('en-vi')}₫`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Số lượng bán ra</span>
                            <span className="productInfoValue">{product.quantity_sold}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Số lượng tồn kho</span>
                            <span className="productInfoValue">
                                {product.quantity_stock}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Kích thước</span>
                            <span className="productInfoValue">{product.size}</span>
                        </div>
                    </div>
                </div>

                <div className="productTopLeft">
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            {product.image_url && (
                                <div className='product-detail__img'>
                                    <div className="product-detail__img-group">
                                        {product.image_url.split(', ').map((img, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                }}
                                                className={`product-detail__img-content ${isACtive === index && 'active'}`}
                                                onClick={() => setIsActive(index)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={product.name}
                                                />
                                            </div>)
                                        )}

                                    </div>
                                    <div className="product-detail__img-single">
                                        <img
                                            src={product.image_url.split(', ')[isACtive]}
                                            alt={product.name}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <h2 style={{
                display: 'inline-block',
                margin: '12px 0 0 18px',
                fontSize: '1.9rem',
                color: 'var(--gray-color)',
                fontWeight: 800,
            }}>Cập nhật sản phẩm</h2>
            <div className="productBottom">

                <form className="userUpdateForm"
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label style={{
                                margin: '5px 0',
                                fontWeight: 500,
                                fontSize: '1.25rem'
                            }}>Tên sản phẩm</label>
                            <input
                                type="text"
                                name='name'
                                placeholder={product.name}
                                className="userUpdateInput"
                                required
                                value={namePro}
                                onChange={e => setNamePro(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label style={{
                                margin: '5px 0',
                                fontWeight: 500,
                                fontSize: '1.25rem'
                            }}>Giảm giá</label>
                            <input
                                type="text"
                                placeholder='_%'
                                name='discount'
                                className="userUpdateInput"
                                value={discountPro}
                                onChange={e => setDiscountPro(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label style={{
                                margin: '5px 0',
                                fontWeight: 500,
                                fontSize: '1.25rem'
                            }}>Giá</label>
                            <input
                                type="text"
                                placeholder={product.prices}
                                name='prices'
                                className="userUpdateInput"
                                required
                                value={pricePro}
                                onChange={e => setPricePro(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label style={{
                                margin: '5px 0',
                                fontWeight: 500,
                                fontSize: '1.25rem'
                            }}>Số lượng bán ra</label>
                            <input
                                type="text"
                                placeholder={product.quantity_sold}
                                name='quantity_sold'
                                className="userUpdateInput"
                                value={quantitySold}
                                onChange={e => setQuantitySold(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label style={{
                                margin: '5px 0',
                                fontWeight: 500,
                                fontSize: '1.25rem'
                            }}>Số lượng tồn kho</label>
                            <input
                                type="text"
                                placeholder={product.quantity_stock}
                                name='quantity_stock'
                                className="userUpdateInput"
                                required
                                value={quantityStock}
                                onChange={e => setQuantityStock(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label style={{
                                margin: '5px 0',
                                fontWeight: 500,
                                fontSize: '1.25rem'
                            }}>Kích thước</label>
                            <input
                                type="text"
                                placeholder={product.size}
                                name='size'
                                className="userUpdateInput"
                                required
                                value={size}
                                onChange={e => setSize(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="userUpdateRight" >
                        <div className="productFormRight" style={{
                            position: 'relative',
                            top: '-114px'
                        }}>

                            {(!listAvatar) ? <div className="productUpload">
                                <img src={product.image_url && product.image_url.split(', ')[0]} alt="" className="productUploadImg" />
                                <div className="newUserItem">
                                    <input
                                        type="file"
                                        name='image_urls'
                                        style={{
                                            position: 'relative',
                                            right: '-71px',
                                            top: '19px'
                                        }}
                                        onChange={handleChangeImg}
                                        multiple
                                    />
                                </div>
                            </div> :
                                <div className="productUpload">
                                    <img src={URL.createObjectURL(listAvatar)} alt="" className="productUploadImg" />
                                    <div className="newUserItem">
                                        <input
                                            type="file"
                                            name='image_urls'
                                            style={{
                                                position: 'relative',
                                                right: '-71px',
                                                top: '19px'
                                            }}
                                            onChange={handleChangeImg}
                                            multiple
                                        />
                                    </div>
                                </div>
                            }

                            <button
                                type='submit'
                                className="btn productButton"
                            >
                                {isLoading ?
                                    <div class="admin-product-lds-dual-ring"></div> :
                                    'Update'
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(DetailProductAdmin)