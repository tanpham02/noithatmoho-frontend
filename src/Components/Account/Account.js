import { useState, useEffect } from "react"
import { Link, json } from "react-router-dom"
import axios from "axios"
import './Account.css'
import { ID_USER } from "../CheckOut/CheckOut"

const Account = ({ accountInfos, onReload }) => {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [dataUser, setDataUser] = useState({})
    const [userId, setUserId] = useState()
    const [isUpdate, setIsUpdate] = useState(false)
    const [dataUserCheckout, setDataUserCheckout] = useState({})
    const [boughtProducts, setBoughtProducts] = useState([])
    const [isSuccessCheckout, setIsSuccessCheckout] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null);
    const [avatar, setAvatar] = useState()



    useEffect(() => {
        const idUser = JSON.parse(localStorage.getItem('idUser'))
        setUserId(idUser)
        async function fetchDataUser() {
            const res = await axios.get(`http://localhost:9080/api/users/${idUser}`)
            const data = await res.data
            setDataUser({ ...data })
        }
        fetchDataUser()
    }, [isUpdate])



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
        async function getCheckout() {
            const res = await axios.get(`http://localhost:9080/api/users/${ID_USER}`)
            const data = await res.data
            setDataUserCheckout(data)
        }
        getCheckout()
    }, [])

    useEffect(() => {
        if (dataUserCheckout.checkout) {
            const outputs = dataUserCheckout.checkout.split('; ')
            const index = outputs.findIndex(output => output.includes('['))
            setBoughtProducts(JSON.parse(outputs[index]))
        }
    }, [dataUserCheckout.checkout])


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
            avatar
        }

        console.log(updateUser)
        axios.put(`http://localhost:9080/api/users/${userId}`, updateUser)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        window.alert('Cập nhật thông tinh thành công!')
        setIsUpdate(true)
        // window.location.reload()
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
            localStorage.setItem('isLogin', JSON.stringify(false))
            window.location.replace('/')
        }
    }

    const handleIsSuccessCheckout = () => {
        localStorage.setItem('isSuccessCheckout', JSON.stringify(true))
        window.location.reload()
    }

    useEffect(() => {
        setIsSuccessCheckout(JSON.parse(localStorage.getItem('isSuccessCheckout')))
    }, [])



    return (
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


                        {!isSuccessCheckout && <div className="warraper-products-bought">
                            <div className="products-bought">

                                {boughtProducts.length ?
                                    <>
                                        <span className="products-bought__heading">Đơn hàng của bạn</span>
                                        <ul className="checkout__cart-lists">
                                            {boughtProducts.map((bought, index) => (
                                                <li key={index} className="checkout__cart-item">
                                                    <div className='cart-item__wrap'>
                                                        <div className="cart-item__img">
                                                            <img src={bought.img.split(',')[0]} alt={bought.name} />
                                                            <span key={index} className='cart-item__quantity'>{bought.quantity}</span>
                                                        </div>
                                                        <div className="cart-item__desc">
                                                            <h3 className="cart-item__name">{bought.name}</h3>
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
                                                </li>
                                            ))}

                                        </ul>
                                        <div style={{
                                            padding: '5px 0 20px 15px'
                                        }}>
                                            <h4 style={{
                                                color: '#4b4b4b',
                                                fontSize: '1.55rem',
                                                fontWeight: 500
                                            }}>Vui lòng chuẩn bị trước số tiền: </h4>
                                            <span
                                                className="cart-item__prices-total"
                                                style={{
                                                    position: 'relative',
                                                    right: '-84.5%',
                                                    bottom: '16px',
                                                    margin: '22px 6px',
                                                    display: 'inline - block',
                                                    fontWeight: 400
                                                }}
                                            >
                                                {dataUserCheckout.checkout.split('; ')[6].slice(0, -1)}
                                                <span className="VND">₫</span>
                                            </span>
                                        </div>
                                        <button
                                            className="btn btn-checkout"
                                            style={{
                                                position: 'relative',
                                                right: '-78%',
                                                bottom: '16px',
                                                margin: '20px 0'
                                            }}
                                            onClick={handleIsSuccessCheckout}
                                        >
                                            Đã nhận được hàng!
                                        </button>
                                    </>
                                    :
                                    <span className="products-bought__not">
                                        Bạn chưa đặt mua sản phẩm.
                                    </span>
                                }
                            </div>
                        </div>}


                        {isSuccessCheckout && <div className="warraper-products-bought">
                            <div className="products-bought">
                                {boughtProducts.length ?
                                    <>
                                        <span className="products-bought__heading">Sản phẩm đã mua</span>
                                        <ul className="checkout__cart-lists border-last-child">
                                            {boughtProducts.map((bought, index) => (
                                                <li key={index} className="checkout__cart-item">
                                                    <div className='cart-item__wrap'>
                                                        <div className="cart-item__img">
                                                            <img src={bought.img.split(',')[0]} alt={bought.name} />
                                                        </div>
                                                        <div className="cart-item__desc">
                                                            <h3 className="cart-item__name">{bought.name}</h3>
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
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                    :
                                    <span className="products-bought__not">
                                        Bạn chưa đặt mua sản phẩm.
                                    </span>
                                }
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Account