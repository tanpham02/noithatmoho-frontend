import { useState, useEffect, memo, useCallback } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CreateUser.scss'

const CreateUser = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [passWord, setPassWord] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
    const [isAdmin, setAdmin] = useState('')

    const [regexPass, setRegexPass] = useState(false)
    const [regexPhone, setRegexPhone] = useState(false)

    const [existPhone, setExistPhone] = useState(false)
    const [existEmail, setExistEmail] = useState(false)
    const [dataUsers, setDataUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:9080/api/users')
            const datas = await res.data
            setDataUsers(datas)
        }
        fetchData()
    }, [])

    const checkOutToast = useCallback(() =>
        toast.info('Thêm mới người dùng thành công', {
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

    const handleCreateUser = (e) => {
        e.preventDefault()

        const dataUser = {
            full_name: fullName,
            email: email,
            password: passWord,
            phone_number: phoneNumber,
            birthday: birthday,
            address: address,
            is_admin: isAdmin ? parseInt(isAdmin) : 0
        }

        const regexNumber = /^\d+$/
        const regexP = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

        dataUsers?.find(user => {
            if (user.email === email.trim()) {
                setExistEmail(true)
            }
            if (user.phone_number === phoneNumber.trim()) {
                setExistPhone(true)
            }
            return setIsLoading(false)
        })


        if (regexNumber.test(phoneNumber) === false && regexP.test(passWord) === false) {
            setRegexPass(true)
            setRegexPhone(true)
            return setIsLoading(false)
        }

        if (regexP.test(passWord) === false) {
            setRegexPass(true)
            return setIsLoading(false)
        }

        if (regexNumber.test(phoneNumber) === false) {
            setRegexPhone(true)
            return setIsLoading(false)
        }

        setIsLoading(true)
        async function createUser() {
            const res = await axios.post('http://localhost:9080/api/users', dataUser)
            setIsLoading(false)
            checkOutToast()
            setTimeout(() => {
                window.location.replace('/manager-users')
            }, 2500)
            return res.data
        }

        if (regexNumber.test(phoneNumber) && regexP.test(passWord)) {
            setRegexPass(false)
            setRegexPhone(false)
            createUser()
            return setIsLoading(false)
        }
    }

    const handleInputPhoneNumber = () => {
        setRegexPhone(false)
        setExistPhone(false)
    }


    return (
        <div className="newUser">
            <h1 className="newUserTitle">Thêm mới người dùng</h1>
            <form className="newUserForm" onSubmit={handleCreateUser} >
                <div className="newUserItem">
                    <label>Tên đầy đủ</label>
                    <input
                        type="text"
                        name='name'
                        placeholder="Tên đầy đủ"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onInput={() => setExistEmail(false)}
                    />
                    {existEmail && <span className='errorMsg'>Email đã được sử dụng</span>}
                </div>
                <div className="newUserItem">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        name='password'
                        placeholder="Mật khẩu"
                        required
                        value={passWord}
                        onChange={(e) => setPassWord(e.target.value)}
                        onInput={() => setRegexPass(false)}
                    />
                    {regexPass && <span className='errorMsg'>Mật khẩu phải từ 8 ký tự, chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 kí tự đặc biệt</span>}
                </div>
                <div className="newUserItem">
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        name='phone'
                        placeholder="Số điện thoại"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onInput={handleInputPhoneNumber}
                    />
                    {regexPhone ?
                        <span className='errorMsg'>Số điện thoại phải là chữ số</span> :
                        existPhone && <span className='errorMsg'>Số điện thoại đã được sử dụng</span>
                    }
                </div>
                <div className="newUserItem">
                    <label>Ngày sinh</label>
                    <input
                        type="text"
                        name='birthday'
                        placeholder="dd/mm/yyyy"
                        required
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        name='address'
                        placeholder="Địa chỉ"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Vai trò</label>
                    <input
                        type="text"
                        name='role'
                        placeholder="0 | 1"
                        value={isAdmin}
                        onChange={(e) => setAdmin(e.target.value)}
                    />
                    <span className='isZero'>Có thể bỏ trống nếu là 0</span>
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
        </div>
    )

}

export default memo(CreateUser)