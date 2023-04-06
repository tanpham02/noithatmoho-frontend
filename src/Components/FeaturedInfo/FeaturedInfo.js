import { useState, useEffect, useMemo } from "react";
import axios from 'axios'
import { ArrowDownward, ArrowUpward } from "@material-ui/icons"
import './FeaturedInfo.scss'

const  FeaturedInfo = () => {


  const [userDatas, setUseData] = useState([])
  useEffect(() => {
    async function getData() {
      const res = axios.get('http://localhost:9080/api/users')
      const data = (await res).data
      setUseData(data)
    }
    getData()
  }, [])





  const handleTotalRevenue = useMemo(() => {
    const totalRevenue = userDatas.reduce((total, next) => {
      if (next.checkout) {
        const totalCheckout = parseInt(next.checkout.split('; ')[6].split(',').join('').slice(0, -1))
        return total + totalCheckout
      }
      return total + 0


    }, 0)
    return totalRevenue
  }, [userDatas])



  return (
    <div className="featured">
      <div className="featured__item">
        <span className="featured__title">Doanh thu</span>
        <div className="featured__money-container">
          <span className="featured__money">{`VND ${handleTotalRevenue.toLocaleString('EN-VI')}`}</span>
          <span className="featured__money-rate">
            -11.4 <ArrowDownward className="featured-icon negative" />
          </span>
        </div>
        <span className="featured__sub">So sánh với tháng trước</span>
      </div>
      <div className="featured__item">
        <span className="featured__title">Sales</span>
        <div className="featured__money-container">
          <span className="featured__money">$4,415</span>
          <span className="featured__money-rate">
            -1.4 <ArrowDownward className="featured-icon negative" />
          </span>
        </div>
        <span className="featured__sub">Compared to last month</span>
      </div>
      <div className="featured__item">
        <span className="featured__title">Cost</span>
        <div className="featured__money-container">
          <span className="featured__money">$2,225</span>
          <span className="featured__money-rate">
            +2.4 <ArrowUpward className="featured-icon" />
          </span>
        </div>
        <span className="featured__sub">Compared to last month</span>
      </div>
    </div>
  )
}

export default FeaturedInfo
