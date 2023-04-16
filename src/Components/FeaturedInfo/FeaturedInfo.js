import { useMemo, memo} from "react";
import './FeaturedInfo.scss'

const FeaturedInfo = ({ userDatas, currentTheme, THEME_DARK }) => {

  const handleTotalRevenue = useMemo(() => {
    const totalRevenue = userDatas.reduce((total, next) => {

      const dateLocale = new Date().toLocaleDateString().split('/')
      const localeDay = dateLocale[0] + '/' + dateLocale[2]
      
      const dateLocaleDb = next?.total_order && next.total_order?.split(', ')[1].split('/')
      const localeDayDb = next?.total_order && dateLocaleDb[0] + '/' + dateLocaleDb[2]

      if (localeDayDb === localeDay) {
        return total + parseFloat(next.transactions)
      }
      return total + 0
    }, 0)
    return totalRevenue
  }, [userDatas])


  const handleTotalProfit = useMemo(() => {
    const totalProfit = userDatas.reduce((total, next) => {

      const dateLocale = new Date().toLocaleDateString().split('/')
      const localeDay = dateLocale[0] + '/' + dateLocale[2]

      const dateLocaleDb = next?.total_order && next.total_order?.split(', ')[1].split('/')
      const localeDayDb = next?.total_order && dateLocaleDb[0] + '/' + dateLocaleDb[2]

      if (localeDayDb === localeDay) {
        return total + parseFloat(next.transactions)
      }
      return total + 0
    }, 0)
    return totalProfit - (totalProfit * (55 / 100))
  }, [userDatas])


  const handleTotalOrder = useMemo(() => {
    const totalOrder = userDatas.reduce((total, next) => {
      const dateLocale = new Date().toLocaleDateString().split('/')
      const localeDay = dateLocale[0] + '/' + dateLocale[2]

      const dateLocaleDb = next?.total_order && next.total_order?.split(', ')[1].split('/')
      const localeDayDb = next?.total_order && dateLocaleDb[0] + '/' + dateLocaleDb[2]

      if (localeDayDb === localeDay) {
        return total + parseFloat(next.total_order?.split(', ')[0])
      }
      return total + 0
    }, 0)
    return totalOrder
  }, [userDatas])



  return (
    <div className="featured">
      <div className={`featured__item ${currentTheme === THEME_DARK && 'active'}`}
        style={{
          backgroundColor: 'teal'
        }}
      >
        <span className={`featured__title ${currentTheme === THEME_DARK && 'active'}`}>Doanh thu</span>
        <div className="featured__money-container">
          <span className="featured__money">{`VND ${handleTotalRevenue.toLocaleString('EN-VI')}`}</span>
        </div>
        <span className="featured__sub">{`Tháng ${new Date().toLocaleDateString().split('/')[0]}`}</span>
      </div>
      <div className={`featured__item ${currentTheme === THEME_DARK && 'active'}`}
        style={{
          backgroundColor: 'var(--primary-color-orange)'
        }}
      >
        <span className={`featured__title ${currentTheme === THEME_DARK && 'active'}`}>Đơn hàng</span>
        <div className="featured__money-container">
          <span className="featured__money">{handleTotalOrder}</span>
        </div>
        <span className="featured__sub">{`Tháng ${new Date().toLocaleDateString().split('/')[0]}`}</span>
      </div>
      <div className={`featured__item ${currentTheme === THEME_DARK && 'active'}`}
        style={{
          backgroundColor: 'var(--primary-color-blue)'
        }}
      >
        <span className={`featured__title ${currentTheme === THEME_DARK && 'active'}`}>Lợi nhuận</span>
        <div className="featured__money-container">
          <span className="featured__money">{`VND ${handleTotalProfit.toLocaleString('EN-VI')}`}</span>
        </div>
        <span className="featured__sub">{`Tháng ${new Date().toLocaleDateString().split('/')[0]}`}</span>
      </div>
    </div>
  )
}

export default memo(FeaturedInfo)
