import { memo } from "react"
import './BannerService.scss'

const BannerService = ({ bannerServices }) => {
    return (
        <div className="banner-service">
            <div className="grid" style={{ height: '100%' }}>
                <div className="grid__row" style={{ height: '100%' }}>
                    {bannerServices.map((bannerService, index) => (
                        <div className="grid__col-4 container-banner-service" key={index} style={{ height: '100%' }} >
                            <img
                                src={bannerService.url}
                                alt={bannerService.name}
                            />
                            <span className="banner-service__title">{bannerService.name}</span>
                            <span className="banner-service__desc">Miễn Phí</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(BannerService)