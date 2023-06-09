import { memo } from "react"
import { Link } from "react-router-dom"
import { types } from '../Header/Header'
import { useTranslation } from "react-i18next"
import './Footer.scss'

const Footer = () => {
    const { t } = useTranslation(['navigation', 'header', 'footer'])
    return (
        <footer className="footer">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col-4 pr-not-last">
                        <h3 className="footer__title" style={{ textTransform: 'uppercase' }}>{t('Furniture', { ns: 'header' })}</h3>
                        <div className="footer__content mt--22">
                            <p>
                                {t('Introduced Brands', { ns: 'footer' })}
                            </p>
                        </div>
                        <div className="footer__logo">
                            <Link to="/" className="footer__logo-link">
                                <img src="/assets/img/footer/logo_bct.png" alt="Bộ Công Thương" className="logo-bct" />
                            </Link>
                            <Link to="/" className="footer__logo-link">
                                <img src="/assets/img/footer/dmca_protected.png" alt="DMCA.com Protection Status" />
                            </Link>

                        </div>
                    </div>
                    <div className="grid__col-4 pr--22">
                        <h3 className="footer__title" style={{ textTransform: 'uppercase' }}>{t('Service')}</h3>
                        <ul className="footer__lists mt--22">
                            {types
                                .filter(typeFilter => typeFilter["groupType-id"] === 4)
                                .map(type => type.names.map((policy, index) => (
                                    <li key={index} className="footer-item">
                                        <Link to={policy.href} title={t(policy.name)} className="footer-item__link">{t(policy.name)}</Link>
                                    </li>
                                )))
                            }
                        </ul>
                    </div>
                    <div className="grid__col-4 pr-not-last">
                        <h3 className="footer__title" style={{ textTransform: 'uppercase' }}>{t('Contact Info', { ns: 'header' })}</h3>
                        <ul className="footer__lists contact mt--22">
                            <li className="footer__item address">
                                <i className="address-icon footer-item_icon fa-solid fa-location-dot"></i>
                                <div>
                                    <div className="footer__item-child">Showroom: 162 HT17, P. Hiệp Thành, Q. 12, TP. HCM</div>
                                    <div className="footer__item-child">Experience Store 1: S05.03-S18 phân khu The Rainbow | Vinhomes Grand Park, TP. Thủ Đức</div>
                                    <div className="footer__item-child">Experience Store 2: S3.03-Sh15 phân khu Sapphire | Vinhomes Smart City, Hà Nội</div>
                                </div>

                            </li>
                            <li className="footer__item cskh">
                                <i className="phonenumber-icon footer__item-icon fa-solid fa-phone"></i>
                                <div>
                                    <div className="footer__item-child">037 280 0762 (Hotline/Zalo)</div>
                                    <div className="footer__item-child">{`035 665 1058 (${t('Delivery Teams', { ns: 'footer' })})`}</div>
                                </div>
                            </li>
                            <li className="footer__item orther">
                                <i className="email-icon fa-solid fa-envelope"></i>
                                <div>
                                    <div className="footer__item-child">phamvantan1311@gmail.com</div>
                                    <div className="footer__item-child">{t('Introduced Company', { ns: 'footer' })}</div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div className="grid__col-4 pr-not-last">
                        <div className="footer__logo-img mt--22">
                            <img src="/assets/img/footer/fan_page.png" alt="Fan Page" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <p>Copyright © 2023 {t('Furniture', { ns: 'header' })} MOHO.</p>
            </div>
        </footer>
    )
}

export default memo(Footer)