import { useState, useEffect } from 'react'
import axios from 'axios'
import { Publish } from "@material-ui/icons";
import './DetailProductAdmin.scss'

const DetailProductAdmin = () => {
    const [product, setProduct] = useState({})
    const [isACtive, setIsActive] = useState(0)


    useEffect(() => {
        const id = window.location.pathname.split('/')[3]
        async function fetchData() {
            const res = await axios.get(`http://localhost:9080/api/products/${id}`)
            const datas = res.data
            setProduct(datas)
        }
        fetchData()

    }, [window.location.pathname])

    return (
        <div className="product-detail-admin">
            <h1 className="productTitle">Chi tiết sản phẩm</h1>
            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.image_url && product.image_url.split(', ')[0]} alt={product.name} className="productInfoImg" />
                        <span className="productName">{product.name}</span>
                    </div>
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
                            <span className="productInfoKey">Số lượng nhập vào</span>
                            <span className="productInfoValue">{product.quantity_stock}</span>
                        </div>

                        <div className="productInfoItem">
                            <span className="productInfoKey">Số lượng tồn kho</span>
                            <span className="productInfoValue">{
                                product.quantity_remaining ?
                                    product.quantity_remaining :
                                    (parseInt(product.quantity_stock - product.quantity_sold))
                            }</span>
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
                                        {product.image_url.split(',').map((img, index) => (
                                            <div
                                                key={index}
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
                                            src={product.image_url.split(',')[isACtive]}
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

                <form className="userUpdateForm" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
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
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label style={{
                                margin: '5px 0',
                                fontWeight: 500,
                                fontSize: '1.25rem'
                            }}>Số lượng nhập vào</label>
                            <input
                                type="text"
                                placeholder={product.quantity_stock}
                                name='quantity_stock'
                                className="userUpdateInput"
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
                                placeholder={product.quantity_remaining}
                                name='quantity_remaining'
                                className="userUpdateInput"
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
                            />
                        </div>
                    </div>

                    <div className="userUpdateRight" >
                        <div className="productFormRight" style={{
                        position: 'relative',
                        top: '-142px'
                    }}>
                            <div className="productUpload">
                                <img src={product.image_url && product.image_url.split(', ')[0]} alt="" className="productUploadImg" />
                                <label for="file">
                                    <Publish />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="btn productButton">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DetailProductAdmin