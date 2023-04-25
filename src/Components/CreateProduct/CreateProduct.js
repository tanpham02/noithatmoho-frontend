import { useState, useEffect, memo } from 'react'
import Loading from '../Loading/Loading'
import axios from 'axios'
import './CreateProduct.scss'

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

    const [regexPrice, setRegexPrice] = useState(false)
    const [regexAmount, setRegexAmount] = useState(false)

    const [isLoading, setIsLoading] = useState(false)


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
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/types')
            const datas = await res.data
            setDataType(datas)
        }
        getDataType()
    }, [])

    useEffect(() => {
        async function getDataGroupType() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/groupTypes')
            const datas = await res.data
            setDataGroupType(datas)
        }
        getDataGroupType()
    }, [])


    useEffect(() => {
        if (dataGroupType) {
            const outputGroupType = dataGroupType.find(groupType => groupType.name.toLowerCase().includes(categoryPro.toLowerCase()))
            if (outputGroupType) {
                const matchId = dataType.filter(type => type['group_type_id'] === outputGroupType.id)
                setSubCategorys(matchId)
                matchId?.forEach(async subCa => setSubCategory(subCa.name))
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
            name: namePro,
            prices: parseFloat(pricePro),
            discount: discountPro,
            quantity_stock: parseInt(quantityStock),
            quantity_sold: 0,
            size,
            image_url: listAvatar.join(', '),
            type_id: typeId.id
        }

        async function createProduct() {
            setIsLoading(true)
            const res = await axios.post('https://noithatmoho-backend.up.railway.app/api/products', createPro)
            try {
                window.alert('Thêm mới sản phẩm thành công!')
                window.location.replace('/manager-products')
                setIsLoading(false)
                return res.data
            } catch (error) {
                return error
            }
        }

        const regexNumber = /^\d+$/
        if (regexNumber.test(quantityStock) && regexNumber.test(pricePro)) {
            setRegexPrice(false)
            setRegexAmount(false)
            createProduct()
        }
        if (regexNumber.test(quantityStock) === false && regexNumber.test(pricePro) === false) {
            setRegexPrice(true)
            setRegexAmount(true)
            return
        }

        if (regexNumber.test(quantityStock) && regexNumber.test(pricePro) === false) {
            setRegexPrice(true)
            return
        }

        if (regexNumber.test(pricePro) && regexNumber.test(quantityStock) === false) {
            setRegexAmount(true)
            return
        }
    }


    return (
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
                        {regexPrice && <span className='errorMsg'>Giá sản phẩm yêu cầu phải là số</span>}
                    </div>
                    <div className="newUserItem">
                        <label>Giảm giá</label>
                        <input
                            type="text"
                            name='discount'
                            placeholder="_%"
                            value={discountPro}
                            onChange={e => setDiscountPro(e.target.value)}
                        />
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
                        {regexAmount && <span className='errorMsg'>Số lượng yêu cầu phải là số</span>}
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
                    <button type='submit' className="btn newUserButton">{isLoading ? <Loading /> : 'Create'}</button>
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
    )

}

export default memo(CreateProduct)