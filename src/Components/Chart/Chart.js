import { memo } from "react"
import "./Chart.scss"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts"

import { userData, productData } from "../../mockDatas"

function Chart({ THEME_DARK, currentTheme }) {
  return (
    <div className="chart">
      <div>
        <h3 style={{ textAlign: 'center' }} className={`chartTitle ${currentTheme === THEME_DARK && 'active'}`}>DOANH THU - LỢI NHUẬN</h3>
        <BarChart
          width={550}
          height={400}
          data={productData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Doanh thu" fill="#27678f" />
          <Bar dataKey="Lợi nhuận" fill="#008080" />
        </BarChart>
      </div>
      <div>
        <h3
          style={{ textAlign: 'center', marginLeft: 30 }}
          className={`chartTitle ${currentTheme === THEME_DARK && 'active'}`}
        >
          TỔNG SỐ LƯỢNG ĐƠN HÀNG - GIAO DỊCH THÀNH CÔNG
        </h3>
        <ResponsiveContainer width={600} height={400}>
          <LineChart
            width={550}
            height={300}
            data={userData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Đơn hàng" stroke="#ee693b" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Giao dịch" stroke="#27678f" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default memo(Chart)
