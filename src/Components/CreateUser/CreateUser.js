import './CreateUser.scss'

const CreateUser = () => {
    return (
        <div className="newUser">
            <h1 className="newUserTitle">Thêm mới người dùng</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Tên đầy đủ</label>
                    <input type="text" name='name' placeholder="Tên đầy đủ" />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" name='email' placeholder="Email" />
                </div>
                <div className="newUserItem">
                    <label>Mật khẩu</label>
                    <input type="password" name='password' placeholder="Mật khẩu" />
                </div>
                <div className="newUserItem">
                    <label>Số điện thoại</label>
                    <input type="text" name='phone' placeholder="Số điện thoại" />
                </div>
                <div className="newUserItem">
                    <label>Ngày sinh</label>
                    <input type="text" name='birthday' placeholder="dd/mm/yyyy" />
                </div>
                <div className="newUserItem">
                    <label>Địa chỉ</label>
                    <input type="text" name='address' placeholder="Địa chỉ" />
                </div>
                <div className="newUserItem">
                    <label>Vai trò</label>
                    <input type="text" name='role' placeholder="0 | 1" />
                </div>
                <button className="btn newUserButton">Create</button>
            </form>
        </div>
    )

}

export default CreateUser