import { memo } from "react"
import './PolicyExchangeReturn.css'
const PolicyExchangeReturn = () => {

    

    return (
        <div className="policy-exchange-return">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='policy-exchange-return__heading'>Chính Sách Đổi Trả</h2>
                        <div className="policy-exchange-return__content">
                            <div className="text-justify">
                                <strong>1. Chính sách đổi hàng:&nbsp;</strong>
                                <span>
                                    trong vòng 3 ngày tính từ ngày giao hàng thành công, không tính chủ nhật và các ngày lễ, tết; quý khách hàng được đổi sản phẩm miễn phí khi
                                </span> 
                                <strong>&nbsp;đủ 2 điều kiện:</strong> <br />
                                <span className="mt--12 mb--10"> 
                                    - Sản phẩm bị hư hỏng do lỗi chất liệu
                                    (không bao gồm yếu tố màu sắc do mỗi đợt sản xuất màu gỗ, vân gỗ và mắt gỗ có thể chênh lệch đôi chút vì đặc tính tự nhiên của gỗ),
                                    lỗi kỹ thuật và lỗi lắp đặt từ phía MOHO.
                                </span> <br />
                                <span className="mb--10">- Đổi sang sản phẩm khác bằng giá trị hoặc có giá trị cao hơn sản phẩm đã giao.</span>

                                <span className="mb--10">Sau 3 ngày tính từ ngày giao hàng thành công, MOHO sẽ áp dụng sang chính sách bảo hành cho các sản phẩm bị hư hỏng do lỗi chất liệu, lỗi kỹ thuật và lỗi lắp đặt từ phía MOHO, không áp dụng đổi sang sản phẩm khác.</span>
                            </div>

                            <div className="text-justify">
                                <strong>2. Chính sách trả hàng:&nbsp;</strong>
                                <span className="inline">
                                    quý khách hàng chỉ được trả hàng tại thời điểm giao hàng nếu sản phẩm không đúng như thông tin đặt hàng do quý khách hàng đặt nhầm hoặc thay đổi ý kiến, nhưng phải thanh toán phí giao hàng cho MOHO là 300,000đ và chi phí lắp đặt tùy theo sản phẩm cho các khu vực miễn phí giao hàng và lắp đặt.
                                </span> <br />

                                <span className="mt--12 mb--10">
                                    - Quyết định của Nội Thất MOHO là quyết định cuối cùng và có thể thay đổi mà không cần thông báo trước.
                                </span> <br />

                                <span>- Chính sách này không áp dụng cho các sản phẩm trong danh mục Đồ Trang Trí.</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(PolicyExchangeReturn)