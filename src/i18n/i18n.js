import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HEADER_EN from '../locale/en/header-en.json'
import HEADER_VI from '../locale/vi/header-vi.json'

import NAV_EN from '../locale/en/nav-en.json'
import NAV_VI from '../locale/vi/nav-vi.json'

import FOOTER_EN from '../locale/en/footer-en.json'
import FOOTER_VI from '../locale/vi/footer-vi.json'

// Set up translations
i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: HEADER_EN,
      navigation: NAV_EN,
      footer: FOOTER_EN
    },
    vi: {
      header: HEADER_VI,
      navigation: NAV_VI,
      footer: FOOTER_VI
    },
  },

  lng: localStorage.getItem('lang') ?? 'vi' , // lang khởi tạo là vi
  fallbackLng: 'vi', // nếu không handle được thì mặc định nó sẽ lấy lang vi
  ns: ['header', 'navigation', 'footer'] // namespace
});
