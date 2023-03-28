import {  memo } from "react"
import './PolicyWarranty.css'
const PolicyWarranty = () => {

    

    return (
        <div className="policy-warranty">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='policy-warranty__heading'>Chính Sách Bảo Hành & Bảo Trì</h2>
                        <div className="policy-warranty__content">
                            <div className="warranty__content-item mb--10">
                                <strong>1. Thời hạn bảo hành:&nbsp;</strong>
                                <span>
                                    2 năm tính từ ngày giao hàng thành công.
                                </span>
                            </div>

                            <div className="warranty__content-item">
                                <strong>2. Phạm vi bảo hành:</strong>
                                <span className="mt--12 mb--10">
                                    - MOHO bảo hành miễn phí cho các sản phẩm bị hư hỏng do lỗi chất liệu (không bao gồm yếu tố màu sắc do mỗi đợt sản xuất màu gỗ, vân gỗ và mắt gỗ có thể chênh lệch đôi chút vì đặc tính tự nhiên của gỗ), lỗi kỹ thuật và lỗi lắp đặt từ phía MOHO.
                                </span> <br />
                                <span className="mb--10">
                                    - MOHO
                                    <strong>&nbsp;không bảo hành&nbsp;</strong>

                                </span>

                                <span className="mb--10">+ Thiệt hại do thiên tai, cháy nổ,… các trường hợp bất khả kháng.</span>
                                <span className="mb--10">+ Qúy khách hàng tự vận chuyển hoặc sử dụng đơn vị vận chuyển ngoài, tự lắp đặt, sửa chữa và thay đổi kết cấu ban đầu của sản phẩm.</span>
                                <span className="mb--10">+ Quý khách hàng sử dụng sản phẩm không đúng cách theo hướng dẫn sử dụng: để vật nặng vượt quá khả năng chịu lực của sản phẩm, sử dụng sản phẩm không đúng công năng như nhảy mạnh lên sản phẩm,..., để vật nóng trực tiếp lên sản phẩm, vệ sinh dùng hóa chất,…</span>
                                <span className="mb--10">+ Sản phẩm bị gãy, vỡ, trầy xước, biến dạng cơ học do lỗi của người sử dụng hoặc do các tác động ngoại lực, ngoại cảnh; hoặc sản phẩm bị ngập nước gây nở, cong vênh; sản phẩm bị tác động của hơi nước, độ ẩm cao hoặc nhiệt độ cao,...</span>
                                <span className="mb--10">+ Những hao mòn trong quá trình sử dụng của quý khách hàng theo thời gian như phai màu tự nhiên, oxy hóa của bề mặt sản phẩm, xù lông vải, xẹp lún,...</span>
                            </div>

                            <div className="warranty__content-item">
                                <strong>3. Chính sách bảo trì:&nbsp;</strong>
                                <span className="inline">đối với các sản phẩm không nằm trong phạm vi bảo hành hoặc hết thời hạn bảo hành 2 năm, MOHO vẫn nhận bảo trì trọn đời sản phẩm với chi phí hợp lý tùy theo tình trạng sản phẩm.</span> <br />
                                <span className="color-gray mb--10 mt--12">- Quyết định của Nội Thất MOHO là quyết định cuối cùng và có thể thay đổi mà không cần thông báo trước. </span>
                                <span className="color-gray font-bold mb--10">* Các chính sách này không áp dụng cho các sản phẩm trong danh mục Đồ Trang Trí</span> <br />
                                <span className="color-gray font-bold">** Bảo hành 01 năm khung ghế, mâm và cần cho Ghế Văn Phòng</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(PolicyWarranty)