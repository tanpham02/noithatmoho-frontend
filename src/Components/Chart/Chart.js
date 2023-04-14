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

import { userData, productData } from "../../dummyData"

function Chart() {
  return (
    <div className="chart">
      <div>
        <h3 className="chartTitle">Phân tích doanh số bán hàng</h3>
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
          style={{ marginLeft: 53 }}
          className="chartTitle"
        >
          Phân tích tổng số lượng khách hàng đăng kí, đơn hàng và giao dịch
        </h3>
        <ResponsiveContainer width={600} height={400}>
          <LineChart
            width={500}
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
            <Line type="monotone" dataKey="Khách hàng" stroke="#ee693b" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Đơn hàng" stroke="#27678f" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Giao dịch" stroke="#008080" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default memo(Chart)
