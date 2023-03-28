import { memo } from "react"
import './PolicySale.css'

const PolicySale = () => {
    

    return (
        <div className="policy-sale">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='policy-sale__heading'>Chính Sách Bán Hàng</h2>
                        <div className="policy-sale__content">
                            <span className="mb--10 text-justify">
                                - Nếu quý khách hàng không thanh toán toàn bộ giá trị đơn hàng
                                trước khi giao hàng thì với các đơn hàng có giá trị trên 10,000,000đ;
                                quý khách hàng vui lòng đặt cọc 1,000,000đ. Phần giá trị còn lại của đơn hàng
                                quý khách hàng vui lòng thanh toán ngay lúc nhận hàng. Nếu quý khách hàng hủy đơn hàng,
                                MOHO sẽ không hoàn lại 1,000,000đ đã đặt cọc.
                            </span>
                            <span className="mb--10 text-justify">
                                - Trong trường hợp quý khách hàng không thanh toán ngay phần giá trị còn lại của đơn hàng khi nhận hàng,
                                MOHO sẽ thu hồi số sản phẩm tương ứng với số tiền chưa thanh toán và quý khách hàng vui lòng thanh toán phí giao hàng cho MOHO là 300,000đ cho các khu vực miễn phí giao hàng.
                            </span>
                            <span className="mb--10 text-justify">
                                - Các loại phí phát sinh theo quy định của ban quản lý tại địa điểm nhận hàng liên quan đến việc giao hàng bằng xe tải, sử dụng thang máy giao hàng,…
                                quý khách hàng vui lòng thanh toán trực tiếp với ban quản lý tại địa điểm nhận hàng của khách hàng.
                            </span>
                            <span className="mb--10 text-justify">
                                - Nếu quý khách hàng có nhu cầu xuất hóa đơn vui lòng thông báo cho MOHO ngay lúc đặt hàng.
                                Hóa đơn đã xuất không thể chỉnh sửa hoặc hủy và xuất lại. Sau thời điểm đặt hàng 24 tiếng MOHO sẽ không nhận xuất hóa đơn.
                                Hóa đơn xuất theo yêu cầu của quý khách hàng sẽ được gửi đến quý khách hàng trong vòng 7 ngày kể từ ngày giao hàng thành công,
                                không tính thứ 7, chủ nhật và các ngày lễ, tết.
                            </span>
                            <span className="mb--10 text-justify">
                                - Sau 24 tiếng kể từ khi đơn hàng được xác nhận, quý khách hàng không thể thay đổi
                                hoặc hủy đơn hàng sau khi đơn hàng đã được đóng gói và chuyển qua bộ phận vận chuyển.
                            </span>
                            <span className="mb--10 text-justify">
                                - Thời gian lưu kho cho 1 đơn hàng tối đa là 30 ngày kể từ ngày đặt hàng.
                                Qúy khách hàng có nhu cầu lưu kho trên 7 ngày vui lòng thanh toán trước 100% giá trị đơn hàng.
                                Nếu quý khách hàng hủy đơn hàng, quý khách hàng vui lòng thanh toán phí lưu kho cho MOHO là 10%
                                giá trị đơn hàng.
                            </span>
                            <span className="mb--10 text-justify">
                                - Quyết định của Nội Thất MOHO là quyết định cuối cùng và có thể thay đổi mà không cần thông báo trước.
                            </span>
                            <span>
                                - Chính sách này không áp dụng cho các sản phẩm trong danh mục Đồ Trang Trí.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(PolicySale)