import { useState, useEffect, memo, useCallback } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CreateProduct.scss'
import { API_SERVER_MYDUNG, API_SERVER_TANPHAM } from '../..'

const CreateProduct = () => {
    const [listImgs, setListImgs] = useState([])
    const [listAvatar, setListAvatar] = useState([])
    const [isACtive, setIsActive] = useState(0)
    const [namePro, setNamePro] = useState('')
    const [categoryPro, setCategoryPro] = useState('Bộ Sưu Tập')
    const [subCategory, setSubCategory] = useState('')
    const [pricePro, setPricePro] = useState('')
    const [discountPro, setDiscountPro] = useState('')
    const [quantityStock, setQuantityStock] = useState('')
    const [size, setSize] = useState('')
    const [dataType, setDataType] = useState([])
    const [dataGroupType, setDataGroupType] = useState([])
    const [subCategorys, setSubCategorys] = useState([])
    const [typeId, setTypeId] = useState(null)
    const [createdAt, setCreatedAt] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [regexPrice, setRegexPrice] = useState(false)
    const [regexAmount, setRegexAmount] = useState(false)
    const [regexDiscount, setRegexDiscount] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    const checkOutToast = useCallback(() =>
        toast.info('Hoàn tất thêm sản phẩm', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        }),
        [])


    const handleChangeImg = (e) => {
        const listImgsUrl = Array.from(e.target.files)
        setListImgs(listImgsUrl)

        //Convert to base 64 and save db
        listImgsUrl.map(img => {
            const readFile = new FileReader()
            readFile.readAsDataURL(img)
            readFile.onload = () => setListAvatar(prev => [...prev, readFile.result])
        })
    }

    useEffect(() => {
        async function getDataType() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/types`)
                const datas = await res.data
                setDataType(datas)

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/types`)
                const datas = await res.data
                setDataType(datas)
            }
        }
        getDataType()
    }, [])

    useEffect(() => {
        async function getDataGroupType() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/groupTypes`)
                const datas = await res.data
                setDataGroupType(datas)

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/groupTypes`)
                const datas = await res.data
                setDataGroupType(datas)
            }
        }
        getDataGroupType()
    }, [])


    useEffect(() => {
        if (dataGroupType) {
            const outputGroupType = dataGroupType.find(groupType => groupType.name.toLowerCase().includes(categoryPro.toLowerCase()))
            if (outputGroupType) {
                const matchId = dataType.filter(type => type['group_type_id'] === outputGroupType.id)
                setSubCategorys(matchId)
            }
        }
    }, [categoryPro, dataGroupType, dataType])


    useEffect(() => {
        const outputType = dataType.find(type => type.name.toLowerCase().includes(subCategory.toLowerCase()))
        setTypeId(outputType)
    }, [dataType, subCategory])

    const handleSubmit = (e) => {
        e.preventDefault()

        const createPro = {
            name: namePro.trim(),
            prices: parseFloat(pricePro.trim()),
            discount: discountPro.trim(),
            quantity_stock: parseInt(quantityStock.trim()),
            quantity_sold: 0,
            size,
            image_url: listAvatar.join(', '),
            type_id: typeId.id,
            created_at: createdAt,
            created_by: createdBy.trim()
        }



        const regexNumber = /^[1-9]0?\d*$/
        const validateDiscount = /^(?:[1-9]0?\d*%?)?$/
        if (regexNumber.test(quantityStock.trim()) && regexNumber.test(pricePro.trim()) && validateDiscount.test(discountPro.trim())) {
            setRegexPrice(false)
            setRegexAmount(false)
            setRegexDiscount(false)
            setIsLoading(true)
            async function createProduct() {
                try {
                    const res = await axios.post(`${API_SERVER_TANPHAM}/api/products`, createPro)
                    setIsLoading(false)
                    checkOutToast()
                    window.setTimeout(() => {
                        window.location.replace('/manager-products')
                    }, 2800)
                    return res.data

                } catch (err) {
                    const res = await axios.post(`${API_SERVER_MYDUNG}/api/products`, createPro)
                    setIsLoading(false)
                    checkOutToast()
                    window.setTimeout(() => {
                        window.location.replace('/manager-products')
                    }, 2800)
                    return res.data
                }
            }
            createProduct()
            return
        }
        if (regexNumber.test(quantityStock.trim()) === false && regexNumber.test(pricePro.trim()) === false && validateDiscount.test(discountPro.trim()) === false) {
            setRegexPrice(true)
            setRegexAmount(true)
            setRegexDiscount(true)
            return
        }

        if (regexNumber.test(quantityStock.trim()) === false && regexNumber.test(pricePro.trim()) === false) {
            setRegexPrice(true)
            setRegexAmount(true)
            setIsLoading(false)
            return
        }
        if (regexNumber.test(quantityStock.trim()) === false && validateDiscount.test(discountPro.trim()) === false) {
            setRegexAmount(true)
            setRegexDiscount(true)
            setIsLoading(false)
            return
        }
        if (regexNumber.test(pricePro.trim()) === false && validateDiscount.test(discountPro.trim()) === false) {
            setRegexPrice(true)
            setRegexDiscount(true)
            setIsLoading(false)
            return
        }

        if (regexNumber.test(pricePro.trim()) === false) {
            setRegexPrice(true)
            setIsLoading(false)
            return
        }

        if (regexNumber.test(quantityStock.trim()) === false) {
            setRegexAmount(true)
            setIsLoading(false)
            return
        }
        if (validateDiscount.test(discountPro.trim()) === false) {
            setRegexDiscount(true)
            setIsLoading(false)
            return
        }
    }
    return (
        <>
            <div className="newUser">
                <h1 className="newUserTitle">Thêm mới sản phẩm</h1>
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                }}>
                    <form className="newUserForm" onSubmit={handleSubmit}>
                        <div className="newUserItem">
                            <label>Tên danh mục</label>
                            <select
                                className='filter-sort'
                                style={{
                                    padding: '12px',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    color: 'gray',
                                    fontWeight: 600,
                                    fontSize: '1.3rem'
                                }}
                                onChange={e => setCategoryPro(e.target.value)}
                            >
                                <option style={{
                                    fontSize: '1.3rem'
                                }} className='filter__item' value='Bộ Sưu Tập'>Bộ Sưu Tập</option>
                                <option style={{
                                    fontSize: '1.3rem'
                                }} className='filter__item' value='Phòng Khách'>Phòng Khách</option>
                                <option style={{
                                    fontSize: '1.3rem'
                                }} className='filter__item' value='Phòng Ăn'>Phòng Ăn</option>
                                <option style={{
                                    fontSize: '1.3rem'
                                }} className='filter__item' value='Phòng Ngủ'>Phòng Ngủ</option>
                                <option style={{
                                    fontSize: '1.3rem'
                                }} className='filter__item' value='Phòng Làm Việc'>Phòng Làm Việc</option>
                                <option style={{
                                    fontSize: '1.3rem'
                                }} className='filter__item' value='Đồ Trang Trí'>Đồ Trang Trí</option>
                            </select>
                        </div>
                        <div className="newUserItem">
                            <label>Tên danh mục phụ</label>
                            <select
                                className='filter-sort'
                                style={{
                                    padding: '12px',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    fontWeight: 600,
                                    color: 'gray',
                                    fontSize: '1.3rem'
                                }}
                                onChange={e => setSubCategory(e.target.value)}
                            >
                                {subCategorys && subCategorys.map(subCate => (
                                    <option style={{
                                        fontSize: '1.3rem'
                                    }} key={subCate.name} className='filter__item' value={subCate.name}>{subCate.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="newUserItem">
                            <label>Tên sản phẩm</label>
                            <input
                                required
                                type="text"
                                name='name-product'
                                placeholder="Tên sản phẩm"
                                value={namePro}
                                onChange={e => setNamePro(e.target.value)}
                            />
                        </div>
                        <div className="newUserItem">
                            <label>Giá sản phẩm</label>
                            <input
                                required
                                type="text"
                                name='Giá'
                                placeholder="Giá sản phẩm"
                                value={pricePro}
                                onChange={e => setPricePro(e.target.value)}
                                onInput={() => setRegexPrice(false)}
                            />
                            {regexPrice && <span className='errorMsg'>Giá sản phẩm yêu cầu phải là số và bắt đầu với chữ số lớn hơn 0</span>}
                        </div>
                        <div className="newUserItem">
                            <label>Giảm giá</label>
                            <input
                                type="text"
                                name='discount'
                                placeholder="_%"
                                value={discountPro}
                                onChange={e => setDiscountPro(e.target.value)}
                                onInput={() => setRegexDiscount(false)}
                            />
                            {regexDiscount && <span className='errorMsg'>Yêu cầu phải là số và bắt đầu với chữ số lớn hơn 0. (Và % có thể có hoặc không)</span>}
                        </div>

                        <div className="newUserItem">
                            <label>Số lượng nhập vào</label>
                            <input
                                required
                                type="text"
                                name='quantity_stock'
                                placeholder="Số lượng"
                                value={quantityStock}
                                onChange={e => setQuantityStock(e.target.value)}
                                onInput={() => setRegexAmount(false)}
                            />
                            {regexAmount && <span className='errorMsg'>Số lượng nhập vào yêu cầu phải là số và bắt đầu với chữ số lớn hơn 0</span>}
                        </div>

                        <div className="newUserItem">
                            <label>Kích thước</label>
                            <input
                                required
                                type="text"
                                name='size'
                                placeholder="Dài x Rộng x Chiều cao (cm)"
                                value={size}
                                onChange={e => setSize(e.target.value)}
                            />
                        </div>
                        <div className="newUserItem">
                            <label>Ngày tạo</label>
                            <input
                                required
                                type="date"
                                name='created_at'
                                value={createdAt}
                                onChange={e => setCreatedAt(e.target.value)}
                            />
                        </div>
                        <div className="newUserItem">
                            <label>Tạo bởi</label>
                            <input
                                required
                                type="text"
                                name='created_by'
                                placeholder="Phạm Văn Tân"
                                value={createdBy}
                                onChange={e => setCreatedBy(e.target.value)}
                            />
                        </div>

                        <button
                            type='submit'
                            className="btn newUserButton"
                        >
                            {isLoading ?
                                <div className="admin-product-lds-dual-ring"></div> :
                                'Create'
                            }
                        </button>
                    </form>


                    <div>
                        <label style={{
                            paddingBottom: '4px',
                            display: 'block'
                        }}>Ảnh sản phẩm</label>
                        {listImgs && (
                            <div className='product-detail__img'>
                                <div className="product-detail__img-group">
                                    {listImgs.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`product-detail__img-content ${isACtive === index && 'active'}`}
                                            onClick={() => setIsActive(index)}
                                        >
                                            <img
                                                src={URL.createObjectURL(img)}
                                                alt=''
                                            />
                                        </div>)
                                    )}

                                </div>
                                <div className="product-detail__img-single" style={{ height: listImgs.length <= 0 ? '0' : '79.5%' }}>
                                    <img
                                        style={{
                                            width: '50%',
                                            height: listImgs.length <= 0 ? '0' : '79.5%',
                                            border: listImgs.length <= 0 ? '0' : '1px solid var(--border-color)'
                                        }}
                                        src={(isACtive || listImgs[isACtive]) && URL.createObjectURL(listImgs[isACtive])}
                                        alt=''
                                    />
                                </div>
                            </div>
                        )}
                        <div className="newUserItem">

                            <input
                                type="file"
                                name='image_urls'
                                onChange={handleChangeImg}
                                style={{
                                    position: 'relative',
                                    right: '19px'
                                }}
                                multiple
                            />
                        </div>
                    </div>

                </div>

            </div>
            <ToastContainer />
        </>
    )

}

export default memo(CreateProduct)