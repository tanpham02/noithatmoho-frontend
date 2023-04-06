import { memo } from "react"
import './CustomerLoyal.scss'
const CustomerLoyal = () => {
    return (
        <div className="customer-loyal">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='customer-loyal__heading'>Khách Hàng Thân Thiết – MOHOmie</h2>
                        <div className="customer-loyal__content">
                            <div className="customer-loyal__content-item mb--10 text-justify">
                                <strong>“MOHOmie – Become MOHO’s homies”</strong>
                                <span>. Đối với MOHO, mỗi quý khách hàng đều là “người thân” – “homie” của MOHO, người mà MOHO luôn trân quý.</span>
                            </div>

                            <div className="customer-loyal__content-item mb--10 text-justify">
                                <strong className="mb--10">1. Cách tích điểm:</strong> <br/>
                                <span className="mb--10 mt--12">
                                - 100,000đ tương đương với 1 điểm. Điểm sẽ tự động được tích khi đơn hàng đã thanh toán thành công.
                                </span>
                                <span>
                                - Khi tích đủ 20 điểm tương đương với 2,000,000đ; quý khách hàng sẽ trở thành Khách Hàng Thân Thiết – MOHOmie của MOHO.
                                </span>
                            </div>

                            <div className="customer-loyal__content-item text-justify">
                                <strong>2. Hạng khách hàng:</strong> <br />
                                <span className="mt--12">
                                - MOHOmie Bronze (Hạng Đồng): tích lũy điểm đạt 20 điểm tương đương với 2,000,000đ.
                                </span> <br />
                                <span className="mb--10">
                                - MOHOmie Silver (Hạng Bạc): tích lũy điểm đạt 50 điểm tương đương với 5,000,000đ.
                                </span>
                                <span className="mt--12 mb--10">
                                - MOHOmie Gold (Hạng Vàng): tích lũy điểm đạt 150 điểm tương đương với 15,000,000đ.
                                </span> <br />
                                <span className="mb--10">
                                - MOHOmie Diamond (Hạng Kim Cương): tích lũy điểm đạt 500 điểm tương đương với 50,000,000đ.
                                </span>
                            </div>

                            <div className="customer-loyal__content-item text-justify">
                                <strong>3. Ưu đãi:</strong> <br />
                                <span className="mt--12">- MOHOmie Bronze (Hạng Đồng): hạng khởi tạo, chưa có ưu đãi.</span> <br />
                                <span className="mb--10 mt--12">- MOHOmie Silver (Hạng Bạc): giảm giá 5% cho tất cả đơn hàng.</span>
                                <span className="mb--10">- MOHOmie Gold (Hạng Vàng): giảm giá 7% cho tất cả đơn hàng.</span> <br />
                                <span className="mb--10">- MOHOmie Diamond (Hạng Kim Cương): giảm giá 10% cho tất cả đơn hàng.</span>
                            </div>

                            <div className="customer-loyal__content-item text-justify">
                                <strong>4. Lưu ý:</strong> <br/>
                                <span className="mt--12">- Ưu đãi giảm giá của hạng khách hàng không áp dụng đồng thời với các chương trình khuyến mại khác.</span> <br />
                                <span className="mb--10 mt--12">- Điểm tích lũy sẽ bị xóa sau 365 ngày quý khách hàng không phát sinh đơn hàng mới hoặc có phát sinh đơn hàng mới nhưng không giao hàng thành công đơn hàng đó.</span>
                                <span className="mb--10">- Quyết định của Nội Thất MOHO là quyết định cuối cùng và có thể thay đổi mà không cần thông báo trước. </span> <br />
                                <span className="">- Chính sách này không áp dụng cho các sản phẩm trong danh mục Đồ Trang Trí.</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(CustomerLoyal)