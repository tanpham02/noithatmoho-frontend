import { memo, useEffect } from "react"

import CheckOut from "../../Components/CheckOut/CheckOut"
const CheckOutPage = ({ datas }) => {

    useEffect(() => {
        document.title= 'Nội Thất MOHO - Thanh toán đơn hàng'
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <CheckOut datas={datas} />
}

export default memo(CheckOutPage)