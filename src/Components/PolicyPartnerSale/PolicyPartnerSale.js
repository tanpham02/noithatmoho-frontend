import { memo } from "react"
import './PolicyPartnerSale.css'
const PolicyPartnerSale = () => {

    

    return (
        <div className="policy-partner-sale">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='policy-partner-sale__heading'>Chính Sách Đối Tác Bán Hàng</h2>
                        <div className="policy-partner-sale__content">
                            <div className="partner-sale__content-item text-justify mb--10">
                                <h4 className="mb--10">ĐỐI TƯỢNG</h4>
                                <span>
                                    Áp dụng cho tất cả các loại hình doanh nghiệp trong mọi lĩnh vực, bao gồm nhưng không giới hạn các công ty thiết kế nội thất, thi công xây dựng, chủ cửa hàng, chủ các cơ sở dịch vụ như quán café, quán ăn,...
                                </span>
                            </div>
                            <div className="partner-sale__content-item">
                                <h4 className="mb--10">PHẠM VI</h4>
                                <span>
                                    - Áp dụng cho tất cả sản phẩm mang thương hiệu MOHO; không bao gồm các sản phẩm đồ trang trí của thương hiệu khác đang được MOHO phân phối
                                </span> <br/>
                                <span>
                                    - Áp dụng cho tất cả các khu vực thuộc khu vực bán hàng và giao hàng của MOHO
                                </span> <br/>
                            </div>
                            <div className="partner-sale__content-item text-justify mb--10">
                                <h4 className="mb--10">QUYỀN LỢI</h4>
                                <span>
                                    - Hưởng mức hoa hồng bán hàng:
                                    <strong>&nbsp;15%</strong>
                                </span> <br/>
                                <span>
                                    - Được nhận giấy chứng nhận là đối tác bán hàng của MOHO
                                </span> <br/>
                                <span>
                                    - Được hỗ trợ toàn bộ chính sách giao hàng, lắp đặt, bảo hành và bảo trì theo chính sách của MOHO
                                </span> <br/>
                                <span>
                                    - Được hỗ trợ các ấn phẩm truyền thông từ MOHO
                                </span> <br/>
                                <span>
                                    - Được hỗ trợ kiến thức sản phẩm và cung cấp các sản phẩm trưng bày tại cửa hàng của đối tác
                                </span> <br/>
                            </div>
                            <div className="partner-sale__content-item text-justify mb--10">
                                <h4 className="mb--10">TRÁCH NHIỆM</h4>
                                <span>
                                    - Đối tác phải đảm bảo tuân thủ chặt chẽ chính sách giá bán của MOHO, bán đúng giá niêm yết theo website của MOHO, không được bán phá giá sản phẩm
                                </span> <br/>
                            </div>
                            <div className="partner-sale__content-item text-justify mb--10">
                                <h4 className="mb--10">LƯU Ý </h4>
                                <span>
                                    Áp dụng cho tất cả các loại hình doanh nghiệp trong mọi lĩnh vực, bao gồm nhưng không giới hạn các công ty thiết kế nội thất, thi công xây dựng, chủ cửa hàng, chủ các cơ sở dịch vụ như quán café, quán ăn,...
                                </span> <br/>
                                <span>
                                    - Mức hoa hồng bán hàng 15% không được áp dụng đồng thời với các chương trình khuyến mại khác
                                </span> <br/>
                                <span>
                                    - Mức hoa hồng bán hàng 15% được tính dựa trên giá trị đơn hàng đã giao thành công và khách hàng đã thanh toán đầy đủ giá trị đơn hàng
                                </span> <br/>
                                <span>
                                    - Mức hoa hồng bán hàng 15% được tính dựa vào giá trị đơn hàng không bao gồm thuế VAT
                                </span> <br/>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(PolicyPartnerSale)