import { useState, useEffect, useMemo, memo } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import './CheckOut.scss'

export const ID_USER = JSON.parse(localStorage.getItem('idUser'))

const checkouts = {
    deliverys: [
        {
            'type-delivery': 'J&T Express (Thường)',
            type: 'radio',
            img: 'https://jtexpress.vn/themes/jtexpress/assets/images/logo.svg'

        },
        {
            'type-delivery': 'Vận chuyển bởi người bán (Nhanh)',
            type: 'radio',
            img: 'https://theme.hstatic.net/200000065946/1000806110/14/logo.png?v=2363'
        }
    ],
    payment: [
        {
            'type-pay': 'Thanh toán tiền mặt khi giao hàng (COD)',
            type: 'radio',
            img: 'https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4'

        },
        {
            'type-pay': 'Thanh toán chuyển khoản qua ngân hàng',
            type: 'radio',
            img: 'https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=4'
        },
        {
            'type-pay': 'Thanh toán online qua cổng VNPay (ATM/Visa/MasterCard/JCB/QR Pay trên Internet Banking)',
            type: 'radio',
            img: 'https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=4'
        },
        {
            'type-pay': 'Ví MoMo',
            type: 'radio',
            img: 'https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=4'
        },
    ],
    vouchers: [
        {
            code: 'MOHO500K',
            discount: 'Giảm 500,000₫'
        },
        {
            code: 'MOHO300K',
            discount: 'Giảm 300,000₫'
        },
        {
            code: 'MOHO200K',
            discount: 'Giảm 200,000₫'
        },
        {
            code: 'MOHO100K',
            discount: 'Giảm 100,000₫'
        },
        {
            code: 'MOHO50K',
            discount: 'Giảm 50,000₫'
        },
    ]
}
const CheckOut = ({ datas }) => {
    const [ids, setIds] = useState([])
    const [dataCheckOuts, setDataCheckOuts] = useState([])
    const [focusName, setFocusName] = useState(false)
    const [name, setName] = useState('')
    const [focusPhoneNum, setFocusPhoneNum] = useState(false)
    const [phoneNum, setPhoneNum] = useState('')
    const [focusAddress, setFocusAddress] = useState(false)
    const [address, setAddress] = useState('')
    const [checkedDelivery, setCheckedDelivery] = useState(0)
    const [delivery, setDelivery] = useState('J&T Express (Thường)')
    const [checkedPayment, setCheckedPayment] = useState(0)
    const [payment, setPayment] = useState('Thanh toán tiền mặt khi giao hàng (COD)')
    const [voucher, setVoucher] = useState('')
    const [inputVoucher, setInputVoucher] = useState('')
    const [priceVoucher, setPriceVoucher] = useState()
    const [notVoucher, setNotVoucher] = useState(false)
    const [total, setTotal] = useState()
    const [carts, setCarts] = useState([])
    const [infoUser, setInfoUser] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);


    const [voucherDbs, setVoucherDbs] = useState([])

    useEffect(() => {
        async function getUsers() {
            const res = await axios.get(`http://localhost:9080/api/users/${ID_USER}`)
            const users = await res.data
            setInfoUser(users)
        }
        getUsers()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('fullNameAccount')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('idUser')
        localStorage.removeItem('selectedFilePath')
        localStorage.setItem('isLogin', JSON.stringify(false))
        window.location.replace('/')
    }

    useEffect(() => {
        if (infoUser.full_name) {
            setName(infoUser.full_name)
            setFocusName(true)
        }
        if (infoUser.address) {
            setAddress(infoUser.address)
            setFocusAddress(true)
        }
        if (infoUser.phone_number) {
            setPhoneNum(infoUser.phone_number)
            setFocusPhoneNum(true)
        }
    }, [infoUser])


    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('cartLists'))
        setCarts([...carts])
    }, [])

    useEffect(() => {
        const cartLists = JSON.parse(localStorage.getItem('cartLists'))
        const output = cartLists.map(cart => cart.id)
        setIds(output)
    }, [])

    useEffect(() => {
        const dataCheckout = datas.filter(data => ids.includes(data.id))
        const carts = JSON.parse(localStorage.getItem('cartLists'))
        const merge = dataCheckout.concat(carts)
        const result = Object.values(merge.reduce((accumulator, current) => {
            const { id, name, discount, prices = 0, quantity_sold = 0, quantity_stock = 0, image_url = '', size = '', type_id = '', quantity = 0 } = current
            accumulator[id] = accumulator[id] || { id, name, discount, size, type_id, prices: 0, quantity_sold: 0, quantity_stock: 0, image_url: '', quantity: 0 }
            accumulator[id].prices += prices
            accumulator[id].quantity_sold += quantity_sold
            accumulator[id].quantity_stock += quantity_stock
            accumulator[id].image_url += image_url
            accumulator[id].quantity += quantity
            return accumulator
        }, {}));
        setDataCheckOuts(result)
    }, [datas, ids])

    const handleSetInputName = () => {
        if (name.length) {
            setFocusName(true)
        } else {
            setFocusName(false)
        }
    }
    const handleBlurInputName = () => {
        if (name.length <= 0) {
            setFocusName(false)
        } else {
            setFocusName(true)
        }
    }

    const handleSetInputPhoneNum = () => {
        if (phoneNum.length) {
            setFocusPhoneNum(true)
        } else {
            setFocusPhoneNum(false)
        }

    }
    const handleBlurInputPhoneNum = () => {
        if (phoneNum.length <= 0) {
            setFocusPhoneNum(false)
        } else {
            setFocusPhoneNum(true)
        }
    }

    const handleSetInputAddress = () => {
        if (address.length) {
            setFocusAddress(true)
        } else {
            setFocusAddress(false)
        }

    }
    const handleBlurInputAddress = () => {
        if (address.length <= 0) {
            setFocusAddress(false)
        } else {
            setFocusAddress(true)
        }
    }

    const handleCheckDelivery = (index, e) => {
        setCheckedDelivery(index)
        setDelivery(e.target.value)
    }
    const handleCheckPayment = (index, e) => {
        setCheckedPayment(index)
        setPayment(e.target.value)
    }

    useEffect(() => {
        if (voucher) {
            setInputVoucher(voucher)
        }
    }, [voucher])


    const handleUseVoucher = () => {

        const vouchersDb = infoUser.vouchers.split(', ')

        const output = vouchersDb.includes(inputVoucher.trim())
        if (output && inputVoucher.length) {
            vouchersDb.forEach(voucher => {
                if (voucher === inputVoucher.trim()) {
                    const index = vouchersDb.findIndex(vou => vou === (inputVoucher))
                    if (index !== -1) {
                        vouchersDb.splice(index, 1)
                        setVoucherDbs([...vouchersDb].join(', '))
                    }
                }
            })
            setNotVoucher(false)
            const subTotal = dataCheckOuts.reduce((result, next) => {
                if (next?.discount) {
                    return result + ((next.prices - (next.prices * (parseInt(next.discount)) / 100)) * next.quantity)
                }
                return result + (next.prices * next.quantity)
            }, 0)
            switch (inputVoucher) {
                case 'MOHO500K':
                    const total1 = (subTotal - 500000)
                    setTotal(parseInt(total1).toLocaleString('EN-VI'))
                    setPriceVoucher(500000)
                    break
                case 'MOHO300K':
                    const total2 = (subTotal - 300000)
                    setTotal(parseInt(total2).toLocaleString('EN-VI'))
                    setPriceVoucher(300000)
                    break
                case 'MOHO200K':
                    const total3 = (subTotal - 200000)
                    setTotal(parseInt(total3).toLocaleString('EN-VI'))
                    setPriceVoucher(200000)
                    break
                case 'MOHO100K':
                    const total4 = (subTotal - 100000)
                    setTotal(parseInt(total4).toLocaleString('EN-VI'))
                    setPriceVoucher(100000)
                    break
                case 'MOHO50K':
                    const total5 = (subTotal - 50000)
                    setTotal(parseInt(total5).toLocaleString('EN-VI'))
                    setPriceVoucher(50000)
                    break
                default:
                    setNotVoucher(true)
                    break;

            }

        } else {
            setNotVoucher(true)
        }
    }


    const handleSubmit = (e) => {
        if (name.length && address.length && phoneNum.length) {
            e.preventDefault()
            const cartStorage = JSON.parse(localStorage.getItem('cartLists'))

            const infoProducts = dataCheckOuts.map(data => {
                return {
                    id: data.id,
                    name: data.name,
                    quantity: data.quantity,
                    prices: data.prices,
                    img: data.image_url,
                    discount: data.discount ? data.discount : ''
                }
            })

            let totalOrder = infoUser?.total_order ? parseInt(infoUser.total_order) : 0

            if (infoProducts) {
                totalOrder += 1
            }

            const checkoutDatas = {
                ...infoUser,
                checkout: `${name}; ${phoneNum}; ${JSON.stringify(infoProducts)}; ${address}; ${delivery}; ${payment}; ${total}₫; ${new Date().toLocaleDateString()}`,
                vouchers: `${inputVoucher ? voucherDbs : infoUser.vouchers}`,
                total_order: `${totalOrder}, ${new Date().toLocaleDateString()}`,
                transactions: infoUser.transactions ? infoUser.transactions : ''
            }


            const transactionDb = infoUser?.transactions ? infoUser.transactions : 0
            const transactionHandle = checkoutDatas?.checkout ? JSON.parse(checkoutDatas.checkout?.split('; ')[6]?.split(',').join('')?.slice(0, -1)) : 0

            const checkoutMain = {
                ...checkoutDatas,
                transactions: String(Number(transactionDb) + Number(transactionHandle))
            }

            axios.put(`http://localhost:9080/api/users/${ID_USER}`, checkoutMain)
                .then(async res => {
                    const result = await dataCheckOuts.forEach(checkoutData => {
                        datas.filter(async (data) => {
                            if (data.id === checkoutData.id) {
                                if (checkoutData.id === data.id) {
                                    const quantity_sold = await data.quantity_sold + checkoutData.quantity
                                    const quantity_stock = await data.quantity_stock && data.quantity_stock !== 0 ?
                                        data.quantity_stock - checkoutData.quantity :
                                        0
                                    const updatePro = {
                                        ...data,
                                        quantity_sold,
                                        quantity_stock
                                    }

                                    await axios.put(`http://localhost:9080/api/products/${checkoutData.id}`, updatePro)
                                        .then(res => {
                                            localStorage.setItem('cartLists', JSON.stringify([]))
                                            localStorage.setItem('isSuccessCheckout', JSON.stringify(false))
                                            window.location.replace('/account')
                                        })
                                        .catch(err => console.log(err))
                                }
                            }
                        })
                    })
                    window.alert('Hoàn tất đơn hàng!')
                })
                .catch(err => console.log(err))

        } else {
            window.alert('Vui lòng nhập đầy đủ thông tin!')
        }
    }

    const handleSubTotal = useMemo(() => {
        const subTotal = dataCheckOuts.reduce((result, next) => {
            if (next?.discount) {
                return result + ((next.prices - (next.prices * (parseInt(next.discount)) / 100)) * next.quantity)
            }
            return result + (next.prices * next.quantity)
        }, 0)
        setTotal(parseInt(subTotal).toLocaleString('EN-Vi'))
        return parseInt(subTotal).toLocaleString('EN-Vi')
    }, [dataCheckOuts])


    useEffect(() => {
        const storedPath = infoUser.avatar
        if (storedPath) {
            setSelectedFile(storedPath);
        }
    }, [infoUser]);





    return (
        <div className="checkout">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col-2-6 checkout-fisrt">
                        <h3 className="checkout__main-logo">Nội Thất MOHO</h3>
                        <h4 className="checkout__heading">Thông tin giao hàng</h4>
                        <div className="checkout__info-user">
                            <div className="checkout__info-name">
                                {selectedFile ?

                                    <div className="checkout__info-avata have-avatar">
                                        <img src={selectedFile} alt="" />
                                    </div> :
                                    <div className="checkout__info-avata">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                }
                                <div className="checkout__info-contents">
                                    <div>
                                        <span>{JSON.parse(localStorage.getItem('fullNameAccount'))}</span>
                                        <span> {infoUser.email && `(${infoUser.email})`}</span>
                                    </div>
                                    <Link className="userInfo__item-link-update" to="/account/addresses">Cập nhật thông tin địa chỉ</Link> <br />
                                    <Link onClick={handleLogout} className="userInfo__item-link-logout" to="/account/logout">Đăng xuất</Link>
                                </div>
                            </div>
                        </div>
                        <form id="checkout__info-form">
                            <div className="form-group">
                                <label htmlFor="form-checkout__full-name" className={`${focusName && 'active'}`}>Họ và tên</label>
                                <input
                                    type='text'
                                    required
                                    name="form-checkout__full-name"
                                    id="form-checkout__full-name"
                                    className="form-checkout__full-name"
                                    onInput={() => handleSetInputName}
                                    onBlur={handleBlurInputName}
                                    onFocus={() => setFocusName(true)}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="form-checkout__phone-number" className={`${focusPhoneNum && 'active'}`}>Số điện thoại</label>
                                <input
                                    type='text'
                                    required
                                    name="form-checkout__phone-number"
                                    id="form-checkout__phone-number"
                                    className="form-checkout__phone-number"
                                    onInput={() => handleSetInputPhoneNum}
                                    onBlur={handleBlurInputPhoneNum}
                                    onFocus={() => setFocusPhoneNum(true)}
                                    value={phoneNum}
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="form-checkout__address" className={`${focusAddress && 'active'}`}>Địa chỉ</label>
                                <input
                                    type='text'
                                    required
                                    name="form-checkout__address"
                                    id="form-checkout__address"
                                    className="form-checkout__address"
                                    onInput={() => handleSetInputAddress}
                                    onBlur={handleBlurInputAddress}
                                    onFocus={() => setFocusAddress(true)}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <span className="form-checkout__delivery-heading ">Phương thức vận chuyển</span>
                                <div className="form-checkout__delivery-contents">
                                    {checkouts.deliverys.map((delivery, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer' }}>
                                            <input
                                                type={delivery.type}
                                                required
                                                name={`form-checkout__delivery-${index + 1}`}
                                                id={`form-checkout__delivery-${index + 1}`}
                                                className={`form-checkout__delivery-${index + 1}`}
                                                checked={checkedDelivery === index}
                                                value={delivery['type-delivery']}
                                                onChange={(e) => handleCheckDelivery(index, e)}
                                            />
                                            <img
                                                style={{
                                                    height: delivery['type-delivery'] === 'J&T Express(Thường)' ? 'auto' : 'auto',
                                                    width: delivery['type-delivery'] === 'J&T Express(Thường)' ? 55 : 55,

                                                }}
                                                src={delivery.img}
                                                alt={delivery['type-delivery']}
                                            />
                                            <label htmlFor={`form-checkout__delivery-${index + 1}`}>
                                                <span className="check-type"></span>
                                                {delivery['type-delivery']}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group ">
                                <span className="form-checkout__payment-heading">Phương thức thanh toán</span>
                                <div className="form-checkout__payment-contents">
                                    {checkouts.payment.map((pay, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer' }}>
                                            <input
                                                type={pay.type}
                                                required
                                                name={`form-checkout__payment-${index + 1}`}
                                                id={`form-checkout__payment-${index + 1}`}
                                                className={`form-checkout__payment-${index + 1}`}
                                                checked={checkedPayment === index}
                                                value={pay['type-pay']}
                                                onChange={(e) => handleCheckPayment(index, e)}
                                            />
                                            <img src={pay.img} alt={pay['type-pay']} />
                                            <label htmlFor={`form-checkout__payment-${index + 1}`}>
                                                <span className="check-type"></span>
                                                {pay['type-pay']}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" style={{
                                position: 'relative',
                                right: '-371px'
                            }} onClick={handleSubmit} className="btn btn-checkout">Hoàn tất đơn hàng</button>
                        </form>
                    </div>
                    <div className="grid__col-2-4 checkout-second">
                        <ul className="checkout__cart-lists">
                            {dataCheckOuts.map((dataCheckout, index) => (
                                <li key={index} className="checkout__cart-item">
                                    <div className='cart-item__wrap'>
                                        <div className="cart-item__img">
                                            <img src={dataCheckout.image_url.split(', ')[0]} alt={dataCheckout.name} />
                                            {carts.map((cartStorage, index) => {
                                                if (dataCheckout.id === cartStorage.id) {
                                                    return (
                                                        <span key={index} className='cart-item__quantity'>{cartStorage.quantity}</span>
                                                    )
                                                }
                                            })}
                                        </div>
                                        <div className="cart-item__desc">
                                            <h3 className="cart-item__name">{dataCheckout.name}</h3>
                                            <span className="cart-item__color">Màu tự nhiên</span>
                                        </div>
                                    </div>
                                    <span className="cart-item__prices" style={{ letterSpacing: 1 }}>
                                        {dataCheckout.discount ?
                                            (dataCheckout.prices - (dataCheckout.prices * (parseInt(dataCheckout.discount)) / 100)).toLocaleString("en-VI") :
                                            parseInt(dataCheckout.prices).toLocaleString("en-VI")
                                        }
                                        <span className="VND">₫</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-item__oder-summary">
                            <label htmlFor="cart-item__voucher"></label>
                            <input
                                type='text'
                                required
                                name="cart-item__voucher"
                                id="cart-item__voucher"
                                className="cart-item__voucher"
                                placeholder="Mã giảm giá"
                                value={inputVoucher}
                                onChange={(e) => setInputVoucher(e.target.value)}
                                onInput={() => setNotVoucher(false)}
                            />
                            <button onClick={handleUseVoucher} disabled={!inputVoucher.length} className={`btn btn-voucher ${inputVoucher.length && 'active'}`}>Sử dụng</button> <br />
                        </div>
                        {notVoucher && <span className="errorMsg check-voucher">Mã giảm giá không chính xác hoặc đã sử dụng!</span>}

                        <div className="cart-item__list-vouchers">
                            {checkouts.vouchers.map((voucher, index) => (
                                <span
                                    className="pseudo"
                                    key={index}
                                >
                                    <span
                                        className="cart-item__item-vouchers"
                                        data-voucher={voucher.code}
                                        onClick={(e) => setVoucher(e.currentTarget.dataset.voucher)}
                                    >
                                        {voucher.discount}
                                    </span>
                                </span>
                            ))}
                            <span className="note-promotion-checkout">Lưu ý: Không áp dụng đồng thời 2 chương trình khuyến mãi</span>
                        </div>


                        <div className="cart-item__paymment">
                            <div className="cart-item__paymment-subtotal">
                                <div style={{ marginBottom: 16 }}>
                                    <span className="paymment-subtotal">Tạm tính</span>
                                    <span style={{ letterSpacing: 1 }} className="subtotal">{handleSubTotal}
                                        <span className="VND">₫</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="fee-delivery">Mã giảm giá</span>
                                    {priceVoucher ?
                                        <span className="price-voucher">

                                            <span style={{
                                                width: 8,
                                                position: 'relative',
                                                top: '-4px',
                                                right: '5px'
                                            }}
                                                className="fee-line"
                                            ></span>
                                            {parseInt(priceVoucher).toLocaleString('EN-VI')}
                                            <span className="VND">₫</span>
                                        </span>
                                        :
                                        <span className="fee-line"></span>
                                    }
                                </div>
                            </div>


                            <div className="cart-item__paymment-total">
                                <span className="cart-item__total-name">Tổng cộng</span>
                                <div className="cart-item__prices">
                                    <span className="vnd-locale">VND</span>
                                    <span className="cart-item__prices-total">{total || handleSubTotal}
                                        <span className="VND">₫</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default memo(CheckOut)