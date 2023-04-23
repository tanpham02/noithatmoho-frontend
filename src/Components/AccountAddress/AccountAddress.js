import axios from 'axios'
import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import './AccountAddress.scss'
const AccountAddress = ({ accountInfos }) => {
    const [showFormUpdate, setShowFormUpdate] = useState(false)
    const [datas, setDatas] = useState([])
    const [user, setUser] = useState({})
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errMess, setErrMess] = useState(false)

    useEffect(() => {
        async function getUser() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
            const data = await res.data
            setDatas(data)
        }
        getUser()
    }, [])

    useEffect(() => {
        const result = datas.find(data => data.id === parseInt(JSON.parse(localStorage.getItem('idUser'))))
        if (result) {
            setUser({ ...result })
        }
    }, [datas])

    const handleClickOption = (index) => {
        if (index === 2) {
            localStorage.removeItem('fullNameAccount')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('idUser')
            localStorage.removeItem('selectedFilePath')
            window.location.replace('/')
        }
    }

    useEffect(() => {
        if (address.length || phoneNumber.length) {
            setErrMess(false)
        }
    }, [address, phoneNumber])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (address === '' && phoneNumber === '') {
            setErrMess(true)
        } else {
            const dataUpdate = {
                ...user,
                address,
                phone_number: phoneNumber
            }
            axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${parseInt(JSON.parse(localStorage.getItem('idUser')))}`,
                dataUpdate)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            window.alert('Cập nhật thông tin thành công!')
            window.location.reload()
        }
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleChangePhone = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleClearAddress = (e) => {
        window.alert('Bạn có chắc chắn muốn xóa địa chỉ này?')
        const dataDelete = {
            ...user,
            address: '',
            phone_number: null
        }

        axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${parseInt(JSON.parse(localStorage.getItem('idUser')))}`,
        dataDelete)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        window.location.reload()
    }

    return (
        <div className='account'>
            <div className='grid'>
                <div className='grid__row'>
                    <h2 className="account__title">Thông tin địa chỉ</h2>
                    <div className='grid__col-2-3'>
                        <h4 className="account__heading-body">TÀI KHOẢN</h4>
                        <ul className="account__body-lists">
                            {accountInfos.filter((account, index) => (index !== 0))
                                .map((acc, index) => (
                                    <li key={index} className='account__body-item' onClick={() => handleClickOption(index)}>
                                        <i className="fa-regular fa-circle-dot"></i>
                                        <Link style={{
                                            color: 'Thông tin địa chỉ' === acc.name ? '#000' : '',
                                            fontWeight: 'Thông tin địa chỉ' === acc.name ? '600' : ''
                                        }} to={acc.path}>{acc.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='grid__col-2-7'>
                        <div className='user-address'>
                            <div className='user-address__heading'>
                                <div className='user-address__heading-main'>
                                    <h4 className='user-address__name'>{user.full_name || user.phone_number}</h4>
                                    <span> (Địa chỉ mặt định)</span>
                                </div>
                                <div className='user-address__icon'>
                                    <i className="fa-solid fa-pen-to-square user-address__edit-icon" onClick={() => setShowFormUpdate(true)}></i>
                                    <i className="fa-solid fa-xmark user-address__times-icon" onClick={handleClearAddress}></i>
                                </div>
                            </div>
                            <div className='user-address__contents'>
                                {errMess && <span className='errorMsg'>Vui lòng nhập thông tin địa chỉ trước khi cập nhật!</span>}

                                {!showFormUpdate && (
                                    <>
                                        <h4 className='user-address__name'>{user.full_name}</h4>
                                        <div className='user-address__wrapper'>
                                            < div className='user-address__info'>
                                                <span className='user-address__address-name'>Địa chỉ:</span>
                                                <span className='user-address__address'> {user.address ? user.address : ''}</span>
                                            </div>
                                            <div className='user-address__info'>
                                                <span className='user-address__phone'>Số điện thoại: </span>
                                                <span className='user-address__phone-number'> {user.phone_number ? user.phone_number : ''}</span>
                                            </div>

                                        </div>
                                    </>

                                )}
                                {showFormUpdate && (<form id="form-account user-address">
                                    <div className="form-group user-address">
                                        <i className="form-group__icon fa-solid fa-location-dot"></i>
                                        <input
                                            type='email'
                                            placeholder="Địa chỉ"
                                            id="form-account__address"
                                            name="form-account__address"
                                            value={address}
                                            onChange={handleChangeAddress}
                                        />
                                    </div>

                                    <div className="form-group user-address">
                                        <i className="form-group__icon fa-solid fa-phone"></i>
                                        <input
                                            type='text'
                                            placeholder="Số điện thoại"
                                            id="form-account__phone-number"
                                            name="form-account__phone-number"
                                            value={phoneNumber}
                                            onChange={handleChangePhone}
                                        />
                                    </div>


                                    <button type="submit" onClick={handleSubmit} className="btn acount-btn">Cập nhật</button>
                                    <button type="button" onClick={() => window.location.reload()}  className="btn acount-btn cancel">Hủy bỏ</button>
                                </form>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default memo(AccountAddress)