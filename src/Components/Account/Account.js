import { useState, useEffect, useMemo, memo, useCallback, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Account.scss'
import { ID_USER } from "../CheckOut/CheckOut"
import { API_SERVER_MYDUNG, API_SERVER_TANPHAM } from "../.."

const Account = ({ accountInfos, onReload }) => {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [dataUser, setDataUser] = useState({})
    const [userId, setUserId] = useState()
    const [isUpdate, setIsUpdate] = useState(false)
    const [dataUserCheckout, setDataUserCheckout] = useState({})
    const [isSuccessCheckout, setIsSuccessCheckout] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatar, setAvatar] = useState()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isCancelCheckout, setIsCancelCheckout] = useState(
        () => JSON.parse(localStorage.getItem('isCancelCheckout')) ?? false
    )
    const timerId = useRef()

    const checkOutToast = useCallback(() =>
        toast.info('Cập nhật thông tin thành công', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        }),
        [])
    const cancelToast = useCallback(() =>
        toast.info('Đã hủy đơn hàng', {
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

    useEffect(() => {
        if (localStorage.getItem('isSuccessCheckout') === false || 'false') {
            timerId.current = setTimeout(() => {
                localStorage.setItem('isCancelCheckout', true)
                setIsCancelCheckout(JSON.parse(localStorage.getItem('isCancelCheckout')))
            }, (1000 * 60 * 60) * 2)
        }

        return () => clearTimeout(timerId.current)
    }, [localStorage?.getItem('isSuccessCheckout')])

    useEffect(() => {
        const idUser = JSON.parse(localStorage.getItem('idUser'))
        setUserId(idUser)
        async function fetchDataUser() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/users/${idUser}`)
                const data = await res.data
                setDataUser({ ...data })

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/users/${idUser}`)
                const data = await res.data
                setDataUser({ ...data })
            }
        }
        fetchDataUser()
    }, [isUpdate])

    useEffect(() => {
        async function fetchDataPros() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/products`)
                const data = await res.data
                setProducts(data)

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/products`)
                const data = await res.data
                setProducts(data)
            }
        }
        fetchDataPros()
    }, [])

    useEffect(() => {
        if (dataUser.email) {
            setEmail(dataUser.email)
        }

        if (dataUser.full_name) {
            setFullName(dataUser.full_name)
        }

        if (dataUser.birthday) {
            setBirthday(dataUser.birthday)
        }
    }, [dataUser])

    useEffect(() => {
        setIsLoading(true)
        async function getCheckout() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/users/${ID_USER}`)
                const data = await res.data
                setDataUserCheckout({ ...data })
                setIsLoading(false)

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/users/${ID_USER}`)
                const data = await res.data
                setDataUserCheckout({ ...data })
                setIsLoading(false)
            }
        }
        getCheckout()
    }, [])

    const handleChangeFullname = (e) => {
        setFullName(e.target.value)
    }

    const handleChangBirthday = (e) => {
        setBirthday(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updateUser = {
            ...dataUser,
            email,
            full_name: fullName,
            birthday,
            avatar: avatar ? avatar : dataUser.avatar
        }

        async function updateUsers() {
            try {
                await axios.put(`${API_SERVER_TANPHAM}/api/users/${userId}`, updateUser)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
                checkOutToast()
                setTimeout(() => {
                    setIsUpdate(true)
                }, 2300)

            } catch (err) {
                await axios.put(`${API_SERVER_MYDUNG}/api/users/${userId}`, updateUser)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
                checkOutToast()
                setTimeout(() => {
                    setIsUpdate(true)
                }, 2300)
            }
        }
        updateUsers()

    }

    useEffect(() => {
        onReload(isUpdate)
    }, [isUpdate])

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(URL.createObjectURL(file))

        // Convert file to Base64 string 
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setAvatar(reader.result)
        }
    }

    useEffect(() => {
        const fileData = dataUser.avatar
        if (fileData) {
            setSelectedFile(fileData)
        }
    }, [dataUser])

    useEffect(() => {
        if (dataUser.full_name !== undefined) {
            localStorage.setItem('fullNameAccount', JSON.stringify(dataUser.full_name || dataUser.phone_number))
            if (isUpdate) {
                window.location.reload()
            }
        } else {
            return
        }
    }, [dataUser.full_name, isUpdate])

    const handleClickOption = (index) => {
        if (index === 2) {
            localStorage.removeItem('fullNameAccount')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('idUser')
            localStorage.removeItem('selectedFilePath')
            localStorage.setItem('isLogin', JSON.stringify(false))
            window.location.reload()
        }
    }


    const handleIsSuccessCheckout = (e) => {
        localStorage.setItem('isSuccessCheckout', true)
        localStorage.removeItem('cancelCheckout')

        if (dataUserCheckout.checkout.split('; ')[8] === 'Successfully') {
            if (dataUserCheckout?.checkout) {
                const nextProduct = JSON.parse(dataUserCheckout.checkout?.split('; ')[2])
                async function updateProBought() {
                    try {
                        await axios.put(`${API_SERVER_TANPHAM}/api/users/${ID_USER}`, {
                            ...dataUserCheckout,
                            product_boughts: dataUserCheckout?.product_boughts ?
                                JSON.stringify([...JSON.parse(dataUserCheckout.product_boughts), ...nextProduct]) :
                                JSON.stringify([...nextProduct]),
                        })
                        window.location.reload()

                    } catch (err) {
                        await axios.put(`${API_SERVER_MYDUNG}/api/users/${ID_USER}`, {
                            ...dataUserCheckout,
                            product_boughts: dataUserCheckout?.product_boughts ?
                                JSON.stringify([...JSON.parse(dataUserCheckout.product_boughts), ...nextProduct]) :
                                JSON.stringify([...nextProduct]),
                        })
                        window.location.reload()
                    }
                }
                updateProBought()
            }
            return dataUserCheckout

        } else {
            const newObj = dataUserCheckout.checkout.split('; ').reduce((acc, next, index) => {
                acc[index] = next
                return acc
            }, {})
            newObj['8'] = 'Successfully'
            const output = Object.values(newObj).join('; ')

            if (dataUserCheckout?.checkout) {
                const nextProduct = JSON.parse(dataUserCheckout.checkout?.split('; ')[2])

                const dateLocale = new Date().toLocaleDateString().split('/')
                const localeDay = dateLocale[0] + '/' + dateLocale[2]

                const dateLocaleDb = dataUserCheckout?.total_order && dataUserCheckout.total_order?.split(', ')[1].split('/')
                const localeDayDb = dataUserCheckout?.total_order && dateLocaleDb[0] + '/' + dateLocaleDb[2]

                const transactionHandle =
                    dataUserCheckout?.checkout ? JSON.parse(dataUserCheckout.checkout?.split('; ')[6]?.split(',').join('')?.slice(0, -1)) : 0

                const transactions = Number(transactionHandle) + Number(dataUserCheckout?.transactions)



                if (localeDayDb === localeDay) {
                    async function updateProBought() {
                        try {
                            await axios.put(`${API_SERVER_TANPHAM}/api/users/${ID_USER}`, {
                                ...dataUserCheckout,
                                checkout: output,
                                product_boughts: dataUserCheckout?.product_boughts ?
                                    JSON.stringify([...JSON.parse(dataUserCheckout.product_boughts), ...nextProduct]) :
                                    JSON.stringify([...nextProduct]),
                                transactions: `${transactions}`
                            })
                            window.location.reload()

                        } catch (err) {
                            await axios.put(`${API_SERVER_MYDUNG}/api/users/${ID_USER}`, {
                                ...dataUserCheckout,
                                checkout: output,
                                product_boughts: dataUserCheckout?.product_boughts ?
                                    JSON.stringify([...JSON.parse(dataUserCheckout.product_boughts), ...nextProduct]) :
                                    JSON.stringify([...nextProduct]),
                                transactions: `${transactions}`
                            })
                            window.location.reload()
                        }
                    }
                    updateProBought()
                }
            }
            return dataUserCheckout
        }

    }

    const uniqueProductBoughts = useMemo(() => {
        if (dataUserCheckout?.product_boughts) {
            const dataUnique = Array.from(new Set(JSON.parse(dataUserCheckout?.product_boughts)
                .map(item => item.id)))
                .map(id => {
                    return JSON.parse(dataUserCheckout?.product_boughts).find(item => item.id === id);
                });
            return dataUnique
        }

    }, [dataUserCheckout])


    const handleCancelCheckout = (e) => {
        localStorage.setItem('isCancelCheckout', true)
        localStorage.setItem('isSuccessCheckout', true)

        let totalOrder = dataUserCheckout?.total_order ? parseInt(dataUserCheckout.total_order) - 1 : 0

        const newObj = dataUserCheckout.checkout.split('; ').reduce((acc, next, index) => {
            acc[index] = next
            return acc
        }, {})
        newObj['8'] = 'Fail'
        const output = Object.values(newObj).join('; ')

        const cancelCheckoutData = {
            ...dataUserCheckout,
            checkout: output,
            total_order: `${totalOrder}, ${dataUserCheckout.checkout.split('; ')[7]}`,
        }

        async function cancelCheckout() {

            try {
                const res = await axios.put(`${API_SERVER_TANPHAM}/api/users/${ID_USER}`, cancelCheckoutData).then(res => {
                    return dataUserCheckout?.checkout && JSON.parse(dataUserCheckout.checkout?.split('; ')[2]).forEach(checkoutData => {
                        products.filter(async data => {
                            if (data.id === checkoutData.id) {
                                if (checkoutData.id === data.id) {
                                    const quantity_sold = data.quantity_sold && data.quantity_sold !== 0 ?
                                        data.quantity_sold - checkoutData.quantity : 0
                                    const quantity_stock = data.quantity_stock + checkoutData.quantity
                                    const updatePro = {
                                        ...data,
                                        quantity_sold,
                                        quantity_stock
                                    }
                                    await axios.put(`${API_SERVER_TANPHAM}/api/products/${data.id}`, updatePro)
                                        .then(res => console.log(res.data))
                                        .catch(err => console.log(err))
                                }
                            }
                        })
                    })
                })
                cancelToast()
                setTimeout(() => {
                    window.location.reload()
                }, 2500)
                return res.data

            } catch (err) {
                const res = await axios.put(`${API_SERVER_MYDUNG}/api/users/${ID_USER}`, cancelCheckoutData).then(res => {
                    return dataUserCheckout?.checkout && JSON.parse(dataUserCheckout.checkout?.split('; ')[2]).forEach(checkoutData => {
                        products.filter(async data => {
                            if (data.id === checkoutData.id) {
                                if (checkoutData.id === data.id) {
                                    const quantity_sold = data.quantity_sold && data.quantity_sold !== 0 ?
                                        data.quantity_sold - checkoutData.quantity : 0
                                    const quantity_stock = data.quantity_stock + checkoutData.quantity
                                    const updatePro = {
                                        ...data,
                                        quantity_sold,
                                        quantity_stock
                                    }
                                    await axios.put(`${API_SERVER_MYDUNG}/api/products/${data.id}`, updatePro)
                                        .then(res => console.log(res.data))
                                        .catch(err => console.log(err))
                                }
                            }
                        })
                    })
                })
                cancelToast()
                setTimeout(() => {
                    window.location.reload()
                }, 2500)
                return res.data
            }
        }

        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?') === true) {
            cancelCheckout()
        }
        return
    }


    useEffect(() => {
        setIsSuccessCheckout(JSON.parse(localStorage.getItem('isSuccessCheckout')))
    }, [])


    const handleSubTotal = useMemo(() => {
        if (dataUserCheckout?.checkout) {
            const subTotal = JSON.parse(dataUserCheckout.checkout?.split('; ')[2]).reduce((result, next) => {
                if (next?.discount) {
                    return result + ((next.prices - (next.prices * (parseInt(next.discount)) / 100)) * next.quantity)
                }
                return result + (next.prices * next.quantity)
            }, 0)
            return parseInt(subTotal)
        }
    }, [dataUserCheckout])

    return (
        <>
            <div className='account'>
                <div className='grid'>
                    <div className='grid__row'>
                        <h2 className="account__title">Tài khoản của bạn</h2>
                        <div className='grid__col-2-3'>
                            <h4 className="account__heading-body">TÀI KHOẢN</h4>
                            <ul className="account__body-lists">
                                {accountInfos
                                    .filter((account, index) => (index !== 0))
                                    .map((acc, index) => (
                                        <li key={index} className='account__body-item' onClick={() => handleClickOption(index)}>
                                            <i className="fa-regular fa-circle-dot"></i>
                                            <Link style={{
                                                color: 'Tài khoản của bạn' === acc.name ? '#000' : '',
                                                fontWeight: 'Tài khoản của bạn' === acc.name ? '600' : ''
                                            }} to={acc.path}>{acc.name}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='grid__col-2-7'>
                            <h4 className="account__heading-body account__heading-body--gray">THÔNG TIN TÀI KHOẢN</h4>

                            <div>
                                {!(selectedFile) &&
                                    <div>
                                        {selectedFile ?
                                            <div className="account__info-avata have-avatar">
                                                <img src={selectedFile} alt="" accept="image/*" />
                                            </div> :
                                            <div className="account__info-avata">
                                                <i className="fa-regular fa-user"></i>
                                            </div>
                                        }
                                    </div>
                                }
                                {(selectedFile) && <img width={250} accept="image/*" height={250} style={{ border: '2px solid #e3e5ec', borderRadius: '12px' }} src={selectedFile} alt="ssss" />}
                                <form id="form-account">
                                    <div className="form-group">
                                        <label htmlFor="form-account__avatar"></label>
                                        <input
                                            type='file'
                                            id="form-account__avatar"
                                            name="form-account__avatar"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="form-account__email">Email</label>
                                        <input
                                            type='email'
                                            placeholder="Email"
                                            id="form-account__email"
                                            name="form-account__email"
                                            disabled
                                            value={email}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="form-account__fullname">Tên đầy đủ</label>
                                        <input
                                            type='text'
                                            placeholder="Tên đầy đủ"
                                            id="form-account__fullname"
                                            name="form-account__fullname"
                                            value={fullName}
                                            onChange={handleChangeFullname}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="form-account__birthday">Ngày Sinh</label>
                                        <input
                                            type='text'
                                            placeholder="dd/mm/yyyy"
                                            id="form-account__birthday"
                                            name="form-account__birthday"
                                            value={birthday}
                                            onChange={handleChangBirthday}
                                        />
                                    </div>



                                    <button type="submit" onClick={handleSubmit} className="btn acount-btn">Cập nhật</button>
                                </form>
                            </div>

                            {isLoading ?
                                <span className="loader-products"></span> :
                                <>

                                    {(!isSuccessCheckout
                                        &&
                                        dataUserCheckout?.checkout
                                        &&
                                        dataUserCheckout?.checkout?.split('; ')[8]?.trim() !== 'Fail'
                                    ) &&
                                        <div className="warraper-products-bought">
                                            {dataUserCheckout?.checkout &&
                                                <>
                                                    <div className="products-bought">
                                                        <>
                                                            <span className="products-bought__heading">Đơn hàng của bạn</span>
                                                            <ul className="checkout__cart-lists">
                                                                {JSON.parse(dataUserCheckout.checkout?.split('; ')[2]).map((bought, index) => (
                                                                    <li key={index} className="checkout__cart-item">
                                                                        <Link
                                                                            onClick={() => localStorage.setItem('productDetail', JSON.stringify(bought.id))}
                                                                            to={`/products/${(bought.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                                                            style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'space-between',
                                                                                padding: '8px 15px 15px 0',
                                                                                width: '100%'
                                                                            }}
                                                                        >
                                                                            <div className='cart-item__wrap'>
                                                                                <div className="cart-item__img">
                                                                                    <img src={bought.img.split(', ')[0]} alt={bought.name} />
                                                                                    <span key={index} className='cart-item__quantity'>{bought.quantity}</span>
                                                                                </div>
                                                                                <div className="cart-item__desc">
                                                                                    <h3 className="cart-item__name"
                                                                                        style={{
                                                                                            width: '100%'
                                                                                        }}
                                                                                    >
                                                                                        {bought.name}</h3>
                                                                                    <span className="cart-item__color">Màu tự nhiên</span>
                                                                                </div>
                                                                            </div>
                                                                            <span className="cart-item__prices" style={{ letterSpacing: 1 }}>
                                                                                {bought.discount ?
                                                                                    (bought.prices - (bought.prices * (parseInt(bought.discount)) / 100)).toLocaleString("en-VI") :
                                                                                    parseInt(bought.prices).toLocaleString("en-VI")
                                                                                }
                                                                                <span className="VND">₫</span>
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            <div style={{
                                                                padding: '0px 0px 20px 2px'
                                                            }}>

                                                                <div className="info-checkout" style={{
                                                                    display: 'flex',
                                                                    color: '#434343',
                                                                    flexDirection: 'column',
                                                                    fontWeight: 500,
                                                                    borderTop: '1px solid var(--border-color)',
                                                                    padding: '20px 0 30px 0',
                                                                }}>
                                                                    <h3 style={{
                                                                        fontWeight: 600,
                                                                        fontSize: '1.55rem',
                                                                        marginBottom: 12,
                                                                        color: '#4b4b4b'
                                                                    }}>Thông tin đơn hàng</h3>
                                                                    <span

                                                                        style={{
                                                                            fontWeight: 600,
                                                                            color: '#4b4b4b',
                                                                            fontSize: '1.3rem'
                                                                        }}
                                                                    >- Tên người đặt hàng:
                                                                        <span style={{
                                                                            fontWeight: 500,
                                                                            color: '#434343',
                                                                            fontSize: '1.25rem',
                                                                            letterSpacing: '1px'
                                                                        }}>&nbsp;{dataUserCheckout.checkout.split('; ')[0]}</span>
                                                                    </span>
                                                                    <span
                                                                        className="mt--12"
                                                                        style={{
                                                                            fontWeight: 600,
                                                                            color: '#4b4b4b',
                                                                            fontSize: '1.3rem'
                                                                        }}
                                                                    >- Số điện thoại:
                                                                        <span style={{
                                                                            fontWeight: 500,
                                                                            color: '#434343',
                                                                            fontSize: '1.25rem',
                                                                            letterSpacing: '1px'
                                                                        }}>&nbsp;{dataUserCheckout.checkout.split('; ')[1]}</span>
                                                                    </span>
                                                                    <span
                                                                        className="mt--12"
                                                                        style={{
                                                                            fontWeight: 600,
                                                                            color: '#4b4b4b',
                                                                            fontSize: '1.3rem'
                                                                        }}
                                                                    >- Ngày đặt hàng:
                                                                        <span style={{
                                                                            fontWeight: 500,
                                                                            color: '#434343',
                                                                            fontSize: '1.25rem',
                                                                            letterSpacing: '1px'
                                                                        }}>&nbsp;{dataUserCheckout.checkout.split('; ')[7]}</span>
                                                                    </span>
                                                                    <span
                                                                        className="mt--12"
                                                                        style={{
                                                                            fontWeight: 600,
                                                                            color: '#4b4b4b',
                                                                            fontSize: '1.3rem'
                                                                        }}
                                                                    >- Vận chuyển bởi:
                                                                        <span style={{
                                                                            fontWeight: 500,
                                                                            color: '#434343',
                                                                            fontSize: '1.25rem'
                                                                        }}>&nbsp;{dataUserCheckout.checkout.split('; ')[4]}</span>
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            fontWeight: 600,
                                                                            color: '#434343',
                                                                            fontSize: '1.3rem'
                                                                        }}
                                                                        className="mt--12">- Phương thức thanh toán:
                                                                        <span style={{
                                                                            fontWeight: 500,
                                                                            color: '#434343',
                                                                            fontSize: '1.25rem'
                                                                        }}>
                                                                            &nbsp;{dataUserCheckout.checkout.split('; ')[5]}
                                                                        </span>
                                                                    </span>
                                                                    {handleSubTotal !==
                                                                        parseInt(dataUserCheckout.checkout.split('; ')[6].split(',').join('').slice(0, -1)) &&
                                                                        <span
                                                                            style={{
                                                                                fontWeight: 600,
                                                                                color: '#434343',
                                                                                fontSize: '1.3rem'
                                                                            }}
                                                                            className="mt--12">- Mã giảm giá:
                                                                            <span style={{
                                                                                fontWeight: 500,
                                                                                color: '#434343',
                                                                                fontSize: '1.25rem',
                                                                                position: 'relative',
                                                                                letterSpacing: '1px'
                                                                            }}>
                                                                                &nbsp;- {(handleSubTotal - parseInt(dataUserCheckout.checkout.split('; ')[6].split(',').join('').slice(0, -1))).toLocaleString('en-vi')}
                                                                                <span className="VND" style={{
                                                                                    position: 'absolute',
                                                                                    top: '-1px',
                                                                                    right: '-9px',
                                                                                    fontSize: '1.15rem'
                                                                                }}>₫</span>
                                                                            </span>
                                                                        </span>}
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                        borderTop: '1px solid var(--border-color)',
                                                                        paddingTop: '20px',
                                                                    }}
                                                                >
                                                                    <h4
                                                                        style={{
                                                                            color: '#4b4b4b',
                                                                            fontSize: '1.55rem',
                                                                            fontWeight: 600,
                                                                            display: "inline-block"
                                                                        }}>Vui lòng chuẩn bị trước số tiền: </h4>
                                                                    <span
                                                                        className="cart-item__prices-total"
                                                                        style={{
                                                                            position: 'relative',
                                                                            textAlign: 'right',
                                                                            margin: '22px 19px 6px',
                                                                            display: 'inline - block',
                                                                            fontWeight: 500,
                                                                            fontSize: '1.6rem',
                                                                            letterSpacing: '1px',
                                                                            color: '#4b4b4b'
                                                                        }}
                                                                    >
                                                                        {dataUserCheckout.checkout.split('; ')[6].slice(0, -1)}
                                                                        <span className="VND" style={{
                                                                            position: 'absolute',
                                                                            top: '-1px',
                                                                            right: '-10px',
                                                                            fontSize: '1.3rem'
                                                                        }}>₫</span>
                                                                    </span>
                                                                </div>

                                                            </div>
                                                        </>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            padding: '0 20px 32px 0',
                                                        }}
                                                    >

                                                        {!isCancelCheckout &&
                                                            <button
                                                                className="btn btn-checkout__cancel"
                                                                onClick={handleCancelCheckout}
                                                            >
                                                                Hủy
                                                            </button>
                                                        }

                                                        <button
                                                            className="btn btn-checkout-account"
                                                            onClick={handleIsSuccessCheckout}
                                                        >
                                                            Đã nhận được hàng
                                                        </button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    }

                                    {(dataUserCheckout?.product_boughts) ?
                                        <div className="warraper-products-bought">
                                            <div className="products-bought">
                                                {dataUserCheckout?.product_boughts &&
                                                    <>
                                                        <span className="products-bought__heading">Sản phẩm đã mua</span>
                                                        <ul className="checkout__cart-lists border-last-child">
                                                            {uniqueProductBoughts.map((bought, index) => (
                                                                <li key={index} className="checkout__cart-item">
                                                                    <Link
                                                                        onClick={() => localStorage.setItem('productDetail', JSON.stringify(bought.id))}
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between',
                                                                            padding: '8px 15px 15px 0',
                                                                            width: '100%'
                                                                        }}
                                                                        to={`/products/${(bought.name).split(' ').join('-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                                                    >

                                                                        <div className='cart-item__wrap'>
                                                                            <div className="cart-item__img">
                                                                                <img src={bought.img.split(', ')[0]} alt={bought.name} />
                                                                            </div>
                                                                            <div className="cart-item__desc">
                                                                                <h3 className="cart-item__name"
                                                                                    style={{
                                                                                        width: '100%'
                                                                                    }}
                                                                                >
                                                                                    {bought.name}</h3>
                                                                                <span className="cart-item__color">Màu tự nhiên</span>
                                                                            </div>
                                                                        </div>
                                                                        <span className="cart-item__prices" style={{ letterSpacing: 1 }}>
                                                                            {bought.discount ?
                                                                                (bought.prices - (bought.prices * (parseInt(bought.discount)) / 100)).toLocaleString("en-VI") :
                                                                                parseInt(bought.prices).toLocaleString("en-VI")
                                                                            }
                                                                            <span className="VND">₫</span>
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        :

                                        <span className="products-bought__not">
                                            Bạn chưa đặt mua sản phẩm.
                                        </span>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}

export default memo(Account)