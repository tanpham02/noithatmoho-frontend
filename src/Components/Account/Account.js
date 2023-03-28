import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import './Account.css'

const Account = ({ accountInfos, onReload }) => {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [dataUser, setDataUser] = useState({})
    const [userId, setUserId] = useState()
    const [isUpdate, setIsUpdate] = useState(false)

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
        }

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


    useEffect(() => {
        if (dataUser.full_name !== undefined) {
            localStorage.setItem('fullNameAccount', JSON.stringify(dataUser.full_name))
            if(isUpdate) {
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
            window.location.replace('/')
        }
    }

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
                        <form id="form-account">
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
                </div>
            </div>
        </div>
    )
}

export default Account