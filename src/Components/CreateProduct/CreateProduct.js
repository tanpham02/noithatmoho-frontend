import './CreateProduct.scss'

const CreateProduct = () => {
    return (
        <div className="newUser">
            <h1 className="newUserTitle">Thêm mới sản phẩm</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Tên sản phẩm</label>
                    <input type="text" name='name' placeholder="Tên sản phẩm" />
                </div>
                <div className="newUserItem">
                    <label>Giá sản phẩm</label>
                    <input type="text" name='Giá' placeholder="Giá sản phẩm" />
                </div>
                <div className="newUserItem">
                    <label>Giảm giá</label>
                    <input type="text" name='discount' placeholder="_%" />
                </div>
                <div className="newUserItem">
                    <label>Số lượng kho</label>
                    <input type="text" name='quantity_stock' placeholder="Số lượng kho" />
                </div>
                <div className="newUserItem">
                    <label>Số lượng đã bán</label>
                    <input type="text" name='quantity_sold' placeholder="Số lượng đã bán" />
                </div>
                <div className="newUserItem">
                    <label>Kích thước</label>
                    <input type="text" name='size' placeholder="Kích thước" />
                </div>
                <div className="newUserItem">
                    <label></label>
                    <input type="file" name='image_url'/>
                </div>
                <button className="btn newUserButton">Create</button>
            </form>
        </div>
    )

}

export default CreateProduct