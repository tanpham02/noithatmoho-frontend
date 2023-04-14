import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import headerEn from '../locale/en/header-en.json'
import headerVi from '../locale/vi/header-vi.json'
import navEn from '../locale/en/nav-en.json'
import navVi from '../locale/vi/nav-vi.json'

// Set up translations
i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: headerEn,
      navigation: navEn
    },
    vi: {
      header: headerVi,
      navigation: navVi
    },
  },

  lng: localStorage.getItem('lang') , // lang khởi tạo là vi
  fallbackLng: 'vi', // nếu không handle được thì mặc định nó sẽ lấy lang vi
  ns: ['header', 'navigation'] // namespace
});
