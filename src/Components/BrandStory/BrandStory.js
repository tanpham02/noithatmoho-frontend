import { useEffect, memo } from 'react'
import './BrandStory.scss'

const BrandStory = () => {

    useEffect(() => {
        document.title = 'Giới Thiệu Về Nội Thất MOHO'
    }, [])

    return (
        <div className='brand-story'>
            <div className='grid'>
                <div className='grid__row'>
                    <div className='grid__col'>
                        <h2 className='brand-story__heading'>Brand Story</h2>
                        <div className="brand-story__content">
                            <span className='mb--10 text-justify'>Mỗi một chi tiết, mỗi một sản phẩm và hình ảnh đều là những dấu ấn, là câu chuyện mà MOHO muốn gửi gắm đến mỗi khách hàng. MOHO hi vọng trong từng bộ sưu tập, từng sản phẩm và dịch vụ của mình sẽ trở thành một phần trong tổ ấm của mỗi gia đình Việt, như một thông điệp
                                <strong>&nbsp;"mang yêu thương gửi trọn trong từng không gian sống"</strong>.
                                Hướng đến sự tiện ích, hiện đại tối giản và thân thiện môi trường là khát khao mà MOHO không ngừng theo đuổi.
                            </span>
                            <br />
                            <span className='text-justify'>Chính những khát khao lan toả biến nhà thực sự là
                                <strong>&nbsp;"tổ ấm"</strong>,
                                tháng 03/2020, thương hiệu nội thất MOHO được định hình và ra đời. Là một phần của Savimex với 35 kinh nghiệm trong sản xuất và xuất khẩu nội thất sang các thị trường khó tính như: Mỹ, Nhật, Hàn,... MOHO tiếp tục kế thừa và phát huy nhằm mang đến cho người Việt những sản phẩm nội thất
                                <strong> 100% made in Vietnam&nbsp;</strong>
                                theo tiêu chuẩn&nbsp;quốc tế, đảm bảo
                                <b>&nbsp;</b>
                                an toàn sức khoẻ với chi phí hợp lý.&nbsp;
                            </span>
                        </div>
                        <div className='brand-story__item-standard'>
                            <h4 className='item-standard__name'>HƯỚNG ĐẾN GIÁ TRỊ BỀN VỮNG</h4>
                        </div>

                        <span className='text-justify mb--10'>
                            “Tính bền vững” là một khái niệm định nghĩa sự phát triển về mọi mặt nhưng vẫn đảm bảo sự tồn tại phát triển ở trạng thái cân bằng.
                            &nbsp;Mang khái niệm “bền vững” vào trong sản phẩm - dịch vụ&nbsp;nội thất&nbsp;là bước đi tiên phong và đầy thách thức mà MOHO luôn không ngừng nỗ lực nhằm&nbsp;
                            lan toả, truyền&nbsp;cảm hứng về một lối sống tích cực, tiêu dùng bền vững hơn vì&nbsp;một&nbsp;tương lai của hành tinh xanh.&nbsp;
                        </span>

                        <div className='mb--10'>
                            <strong>Mục tiêu phát triển bền vững:</strong>
                        </div>

                        <div>
                            <span className='mb--10'>- Truyền cảm hứng về tiêu dùng bền vững đến mọi người tại Việt Nam.</span> <br />
                            <span className='mb--10'>- Sử dụng 100% nguồn nguyên liệu gỗ đạt chứng nhận <a style={{ textDecoration: 'underline' }} href='https://fsc.org/en/about-us'>chứng nhận FSC® - Forest Stewardship Council®.</a></span> <br />
                            <span className='mb--10'>- Bảo trì trọn đời sản phẩm nhằm kéo dài tuổi thọ và tính hữu dụng của sản phẩm trong thời gian dài. </span>
                        </div>

                        <div>
                            <strong className='color-primary mb--10'>Nội thất bền vững là gì và tại sao điều này lại quan trọng?</strong>
                            <span className='text-justify'>
                                "Mặc dù, khái niệm nội thất bền vững tại Việt Nam chưa thực sự phổ biến nhưng những khái niệm như sống xanh,
                                sử dụng vật liệu tái chế, thân thiện môi trường,... được khá nhiều khách hàng quan tâm hưởng ứng.
                                Có thể thấy, nhận thức về tầm quan trọng của việc bảo vệ môi trường đã dần được nâng cao.
                                Thông qua việc nỗ lực phát triển, đảm bảo 100% sản phẩm sử dụng các vật liệu bền vững, MOHO tin rằng sẽ góp phần nào thay đổi tích cực,
                                hướng tới mục tiêu là thương hiệu nội thất bền vững tiên phong hàng đầu tại Việt Nam trong tương lai."
                            </span>
                        </div>

                        <div className='brand-story__item-standard'>
                            <h4 className='item-standard__name'>THÂN THIỆN MÔI TRƯỜNG</h4>
                        </div>
                        <span className='mb--10 text-justify'>
                            MOHO với xuất phát điểm muốn lan toả thông điệp
                            <strong>&nbsp;"Sống xanh"</strong>,
                            mỗi một sản phẩm nội thất mà MOHO mang đến cho khách hàng đều là bắt nguồn từ nguyên liệu gỗ đạt chuẩn FSC - khai thác từ nguồn rừng có trồng lại.
                            MOHO hiểu rằng, là một doanh nghiệp nói chung, và là doanh nghiệp trong lĩnh vực nội thất nói riêng,
                            cần có trách nhiệm hơn với cộng đồng và môi trường xanh của chúng ta. Giá trị tốt đẹp này không chỉ riêng MOHO mà mỗi một khách hàng sử dụng&nbsp;
                            sản phẩm MOHO đều đóng góp và nhân rộng lên giá trị bền vững này.&nbsp;
                        </span>
                        <img src='/assets/img/brand-story/noi-that-moho-ben-vung.png' alt='Nội Thất MOHO Bền Vững' className='mb--10' />
                        <strong className='color-primary'>Nội thất MOHO đạt chứng nhận FSC - Bảo vệ và phát triển rừng</strong>

                        <div className='brand-story__item-standard'>
                            <h4 className='item-standard__name'>AN TOÀN SỨC KHOẺ</h4>
                        </div>

                        <div>
                            <span className='mb--10'>Đặt yếu tố<strong>&nbsp;sức khoẻ và an toàn</strong> khách hàng lên hàng đầu, các sản phẩm nội thất gỗ công nghiệp tại MOHO:</span> <br />
                            <span className='mb--10'>- Đạt chứng nhận chứng nhận giảm phát thải Formaldehyde – CARB P2, đảm bảo gỗ không độc hại.</span> <br />
                            <span className='mb--10'>- Ưu tiên sử dụng sơn gốc nước thay cho sơn gốc dầu.</span> <br />
                            <span className='mb--10'>- Trang bị bộ anti tip kit tránh tình trạng tủ bị lật, gây nguy hiểm, đặc biệt là những gia đình có trẻ nhỏ.</span>
                        </div>
                        <span className='mb--10 text-justify'>
                            Tại hầu hết các nước trên thế giới đều qui định nghiêm ngặt về tiêu chuẩn an toàn CARB - P2 đối với các sản phẩm gỗ công nghiệp,
                            cũng như các yếu tố an toàn trong quá trình sử dụng, MOHO tin rằng việc tiên phong về tiêu chuẩn sức khoẻ -
                            an toàn người dùng sẽ là điểm mạnh mang thương hiệu nội thất của người Việt vươn tầm quốc tế trong tương lai.
                        </span>
                        <img className='mb--10' src='/assets/img/brand-story/noi-that-moho-an-toan-suc-khoe.png' alt='Nội Thất MOHO An Toàn Sức Khỏe' />

                        <strong className='mb--10 color-primary'>Nội thất MOHO đạt chuẩn CARB-P2 an toàn cho sức khỏe</strong> <br />
                        <strong className='mb--10 color-primary'>Nội thất MOHO sử dụng sơn gốc nước bảo vệ an toàn cho sức khỏe người tiêu dùng</strong> <br />
                        <strong className='mb--10 color-primary'>Anti tip kit - Phụ kiện chống lật ngã tủ dùng trong nội thất</strong>

                        <div className='brand-story__item-standard'>
                            <h4 className='item-standard__name'>CHẤT LƯỢNG QUỐC TẾ</h4>
                        </div>
                        <div>
                            <span className='mb--10'>Sản xuất trực tiếp tại nhà máy Savimex với công nghệ hiện đại cùng đội ngũ thợ tay nghề cao.</span> <br />
                            <span className='mb--10'>- Nhà máy chế biến gỗ đầu tiên tại Việt Nam đạt chứng nhận hệ thống quản lý môi trường đạt chuẩn quốc tế ISO 14001.</span> <br />
                            <span className='mb--10'>- Rộng 10ha với hơn 1,500 công nhân viên giàu kinh nghiệm cùng máy móc công nghệ hiện đại.</span>
                        </div>
                        <img className='mb--10' src='/assets/img/brand-story/noi-that-moho-chat-luong-quoc-te.png' alt='Nội Thất MOHO Chất Lượng Quốc Tế' />

                        <div className='brand-story__item-standard'>
                            <h4 className='item-standard__name'>TINH TẾ TRONG TỪNG ĐƯỜNG NÉT</h4>
                        </div>

                        <span className='mb--10'>Chúng tôi tạo ra không gian sống tuyệt vời nhất, nơi chúng tôi gọi là “Nhà”.</span> <br />
                        <span className='text-justify'>"Điều tôi muốn xây dựng ở đây là mang đến những thiết kế cao cấp dành riêng cho người Việt.
                            Tôi muốn giúp khách hàng cá nhân hoá không gian sống thật sự phù hợp và lý tưởng. MOHO, chúng tôi làm tất cả vì khách hàng.
                            " Mr. Nicolai Lehn - Giám đốc thiết kế của MOHO.
                        </span>

                        <div className='item-standard__video'>
                            <video src="/assets/img/brand-story/tinh-te-trong-tung-duong-net.mp4" type="video/mp4" controls></video>
                        </div>


                        <div className='brand-story__item-standard'>
                            <h4 className='item-standard__name'>TRẢI NGHIỆM TỐT NHẤT</h4>
                        </div>
                        <span className='mb--10'>
                            Tham quan và trải nghiệm cửa hàng nội thất của MOHO với lối kiến trúc không gian mở hiện đại,
                            các sản phẩm nội thất được bố trí theo từng không gian và phong cách nội thất,
                            mang đến trải nghiệm mua sắm tuyệt vời cho khách hàng.
                        </span>
                        <img className='mb--10 item-standard__img-center' src='/assets/img/brand-story/cua-hang-noi-that-moho-furniture_1.png' alt='Cửa Hàng Nội Thất MOHO - ShowRoom' />
                        <div className='mb--14' style={{ textAlign: 'center' }}>
                            <span>
                                <strong>Showroom: </strong>
                                162 HT17, P. Hiệp Thành, Q. 12, TP. HCM
                            </span>
                        </div>
                        <img className='mb--10 item-standard__img-center' src='/assets/img/brand-story/cua-hang-noi-that-moho-furniture_2.png' alt='Cửa Hàng Nội Thất MOHO - ShowRoom' />
                        <div className='mb--10' style={{ textAlign: 'center' }}>
                            <span>
                                <strong>Experience Store 1: </strong>
                                S05.03-S18 phân khu The Rainbow | Vinhomes Grand Park, TP. Thủ Đức
                            </span>
                        </div>
                        <div className='mb--10' style={{ textAlign: 'center' }}>
                            <span className='text-justify'>
                                <strong>Experience Store 2: </strong>
                                S3.03-Sh15 phân khu Sapphire | Vinhomes Smart City, Hà Nội
                            </span>
                        </div>

                        <div className='brand-story__item-standard'>
                            <h4 className='item-standard__name'>CÁC CHỨNG NHẬN CỦA MOHO</h4>
                        </div>
                        <img className='mb--10' src='/assets/img/brand-story/noi-that-moho-chung-nhan-quoc-te_1.png' alt='Nội Thất MOHO Chứng Nhận Quốc Tế' />
                        <img src='/assets/img/brand-story/noi-that-moho-chung-nhan-quoc-te_2.png' alt='Nội Thất MOHO Chứng Nhận Quốc Tế' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default memo(BrandStory)