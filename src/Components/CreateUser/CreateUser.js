import { useState } from 'react'
import axios from 'axios'
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

        async function createUser() {
            const res = await axios.post('https://noithatmoho-backend.up.railway.app/api/users', dataUser)
            window.alert('Thêm người dùng thành công')
            window.location.replace('/manager-users')
            return res
        }
        createUser()

        const regexNumber = /[0-9]/
        const regexP = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (regexNumber.test(phoneNumber) && regexP.test(passWord)) {
            setRegexPass(false)
            setRegexPhone(false)
            createUser()
        }

        if (regexNumber.test(phoneNumber) && regexP.test(passWord) === false) {
            setRegexPass(true)
            return
        }

        if (regexP.test(passWord) && regexNumber.test(phoneNumber) === false) {
            setRegexPhone(true)
            return
        }
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
                    />
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
                    {regexPass && <span className='errorMes'>Mật khẩu phải từ 8 ký tự, ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số, 1 kí tự đặc biệt</span>}
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
                        onInput={() => setRegexPhone(false)}
                    />
                    {regexPhone && <span className='errorMsg'>Số điện thoại phải là chữ số</span>}
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
                <button type='submit' className="btn newUserButton">Create</button>
            </form>
        </div>
    )

}

export default CreateUser