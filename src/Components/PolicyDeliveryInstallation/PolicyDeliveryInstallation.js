import { memo } from "react"
import './PolicyDeliveryInstallation.css'

const PolicyDeliveryInstallation = () => {


    return (
        <div className="policy-delivery-installation">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='policy-delivery-installation__heading'>Chính Sách Giao Hàng & Lắp Đặt</h2>
                        <div className="policy-delivery-installation__content">
                            <div className="mb--10 text-justify">
                                <span>MOHO miễn phí giao hàng & lắp đặt tại tất cả quận huyện thuộc TP. HCM, TP. Thủ Đức, Hà Nội, Biên Hòa và một số khu vực tại Bình Dương&nbsp;</span>
                                <strong>trong vòng 3 ngày từ 9h00 đến 16h00 từ thứ 2 đến chủ nhật</strong>
                                <span>, không tính các ngày lễ, tết.</span>
                            </div>

                            <span className="mb--10">+ Tất cả quận huyện thuộc TP. HCM, TP. Thủ Đức, Hà Nội: miễn phí giao hàng & lắp đặt</span> <br/>
                            <span className="mb--10">+ Khu đô thị Ecopark, Xuân Quan, Văn Giang, Hưng Yên: miễn phí giao hàng & lắp đặt</span> <br/>
                            <span className="mb--10">+ Biên Hòa: miễn phí giao hàng & lắp đặt</span> <br/>
                            <span className="mb--10">+ Dĩ An: miễn phí giao hàng & lắp đặt</span> <br/>
                            <span className="mb--10">+ Thuận An: miễn phí giao hàng & lắp đặt</span> <br/>
                            <span className="mb--10">+ Thủ Dầu Một: miễn phí giao hàng & lắp đặt</span> <br/>
                            <span className="mb--10">+ Tân Uyên: miễn phí giao hàng & lắp đặt</span> <br/>
                            <span className="mb--10">+ Bắc Tân Uyên: 200,000đ</span> <br/>
                            <span className="mb--10">+ Bàu Bàng: 250,000đ</span> <br/>
                            <span className="mb--10">+ Bến Cát: 250,000đ</span> <br/>
                            <span className="mb--10">+ Phú Giáo: 500,000đ</span> <br/>
                            <span className="mb--10">+ Dầu Tiếng: 600,000đ</span> <br/>
                        </div>
                        <span className="mb--10 text-justify">- Qúy khách hàng vui lòng sắp xếp thời gian nhận hàng theo lịch nhận hàng đã xác nhận
                            với MOHO. Nếu quý khách hàng có việc bận đột xuất không thể nhận hàng theo lịch nhận hàng 
                            đã xác nhận, quý khách hàng vui lòng thông báo cho MOHO ít nhất 24 tiếng trước khi giao hàng. 
                            MOHO sẽ sắp xếp lại lịch nhận hàng tối đa là 1 lần, sau đó nếu quý khách hàng tiếp tục dời 
                            lịch nhận hàng MOHO sẽ không thể giao hàng và xin phép được hủy đơn hàng của quý khách hàng.
                        </span> <br />
                        <span className="mb--10 text-justify">- MOHO chỉ lắp đặt các sản phẩm theo đúng tiêu chuẩn sản phẩm của MOHO. 
                            MOHO không lắp đặt theo yêu cầu riêng của quý khách hàng như khoan tường, gắn sản phẩm lên tường,… 
                        </span> <br />
                        <span className="mb--10">
                            - Quyết định của Nội Thất MOHO là quyết định cuối cùng và có thể thay đổi mà không cần thông báo trước. 
                        </span> <br/>
                        <span className="mb--10">
                        - Chính sách này không áp dụng cho các sản phẩm trong danh mục Đồ Trang Trí.
                        </span> <br />
                        <strong className="color-black">Mọi thông tin chi tiết vui lòng liên hệ hotline đội giao hàng MOHO: <a style={{textDecoration: 'underline', color: '#434343'}}  href="tel:+84372800762">0372800762.</a></strong>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(PolicyDeliveryInstallation)