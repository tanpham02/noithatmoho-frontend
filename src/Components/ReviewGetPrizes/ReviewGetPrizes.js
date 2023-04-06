import { memo } from "react"
import './ReviewGetPrizes.scss'
const ReviewGetPrizes = () => {

    

    return (
        <div className="review-get-prizes">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col">
                        <h2 className='review-get-prizes__heading'>Review Hay Nhận Quà Ngay - MOHOment</h2>
                        <div className="review-get-prizes__content">
                            <div className="review-get-prizes__content-item">
                                <h3 className="inline">I. CHƯƠNG TRÌNH:&nbsp;</h3>
                                <strong className="content-item__desc">Review Hay Nhận Quà Ngay - Share your MOHOment</strong>
                                <span className="mt--12 mb--10">
                                    Cùng MOHO chia sẻ cảm nhận về những sản phẩm nội thất MOHO để giúp những khách
                                    mua hàng sau có cơ hội hiểu rõ hơn về sản phẩm, dễ dàng lựa chọn đúng sản phẩm
                                    phù hợp với nhu cầu và không gian nhà ở của mình.
                                </span>
                            </div>
                            <div className="review-get-prizes__content-item mb--10">
                                <h3 className="inline">II. ĐỐI TƯỢNG THAM GIA:&nbsp;</h3>
                                <span className="color-black">
                                    Quý khách hàng đã mua sản phẩm của MOHO.
                                </span>
                            </div>
                            <div className="review-get-prizes__content-item mb--10">
                                <h3 className="inline">III. THỜI GIAN:&nbsp;</h3>
                                <span className="color-black inline">
                                    Không giới hạn thời gian
                                </span>
                            </div>

                            <div className="review-get-prizes__content-item">
                                <h3 className="inline">IV. CÁCH THỨC THAM GIA:&nbsp;</h3>
                                <span className="color-black">
                                    quý khách hàng có thể tham gia bằng 02 cách:
                                </span> <br />

                                <strong className="mt--12 mb--10" style={{ display: 'inline-block' }}>1. Cách thức 01:&nbsp;</strong>
                                <span className="inline">
                                    Quý khách hàng truy cập vào website
                                    <a href="/">moho.com.vn&nbsp;</a>
                                    và thực hiện các bước sau:
                                </span> <br />

                                <span className="mb--10">- Bước 1: Vào trang sản phẩm đã mua.</span> <br />
                                <span className="mb--10">- Bước 2: Chọn mục đánh giá trên thanh mô tả.</span> <br />
                                <span className="mb--10">- Bước 3: Điền thông tin, đánh giá số sao và viết đánh giá cho sản phẩm. </span> <br />

                                <strong className="mt--12 mb--10" style={{ display: 'inline-block' }}>2. Cách thức 02:&nbsp;</strong>
                                <span className="inline">
                                    Quý khách hàng viết đánh giá và đăng tải kèm hình ảnh hoặc video lên các trang mạng xã hội như
                                    Facebook, Instragram,… theo các bước sau:
                                </span>

                                <span className="mb--10">- Bước 1: Theo dõi các kênh mạng xã hội của MOHO </span> <br />
                                <span className="mb--10">- Bước 2: Viết đánh giá và đăng lên các trang mạng xã hội </span> <br />
                                <span className="mb--10">
                                    - Bước 3: Tag MOHO @mohofurniture vào các bài viết của mình và kèm theo các hashtags
                                    <strong>&nbsp;#moho, #noithatmoho, #mohofurniture, #review </strong>
                                </span>
                            </div>

                            <div className="review-get-prizes__content-item flex-item">
                                <h3>V. GIẢI THƯỞNG:&nbsp;</h3>
                                <div className="flex-item__child">
                                    <span className="mb--10">
                                        TẤT CẢ REVIEW HỢP LỆ SẼ ĐƯỢC MOHO GỬI TẶNG
                                    </span>
                                    <span className="flex-item__color-primary mb--10">TÚI VẢI CANVAS THIẾT KẾ ĐỘC QUYỀN TỪ MOHO</span>

                                    <img src="/assets/img/prizes-review/noi-that-moho-furniture-tui-vai-canvas.png" alt="Túi Vải MOHO Canvas" />
                                </div>
                            </div>

                            <div className="review-get-prizes__content-item">
                                <h3 className="mt--12 mb--10">VI. LƯU Ý:&nbsp;</h3>
                                <span className="mb--10">
                                    - Bài đánh giá hợp lệ là bài đánh giá thực hiện đầy đủ các bước và có tối thiểu 50 chữ kèm theo 01 hoặc nhiều hình ảnh/video.
                                </span>
                                <span className="mb--10">- Không dùng từ ngữ thô tục, xúc phạm, bôi xấu nhãn hàng; hạn chế sử dụng chữ viết tắt, không có dấu câu đầy đủ.</span>
                                <span className="mb--10">- Không spam, quảng cáo, lôi kéo mua bán các sản phẩm, dịch vụ khác, đăng link có nội dung đồi truỵ, và chứa các mã độc, virus…</span>
                                <span>- Tất cả nội dung và hình ảnh đánh giá của quý khách hàng khi tham gia chương trình có thể được sử dụng trong các chiến dịch truyền thông của MOHO. </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(ReviewGetPrizes)