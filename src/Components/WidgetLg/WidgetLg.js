import { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import "./WidgetLg.scss";
import axios from 'axios';

const WidgetLg = ({ currentTheme, THEME_DARK }) => {

  const [userDatas, setUserData] = useState([])
  const [products, setProducts] = useState([])

  const cancelToast = useCallback(() =>
    toast.info('Hoàn tất hủy bỏ đơn hàng', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    }),
    [])

  const successToast = useCallback(() =>
    toast.info('Hoàn tất đơn hàng', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    }),
    [])

  useEffect(() => {
    async function getData() {
      const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
      const data = await res.data
      setUserData(data)
    }
    getData()
  }, [])

  useEffect(() => {
    async function getproducts() {
      const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/products')
      const data = await res.data
      setProducts(data)
    }
    getproducts()
  }, [])

  const handleIsSuccessCheckout = (idUser) => {
    const dataUserCheckout = userDatas.find(user => user.id === idUser)

    const newObj = dataUserCheckout.checkout.split('; ').reduce((acc, next, index) => {
      acc[index] = next
      return acc
    }, {})
    newObj['8'] = 'Successfully'
    const output = Object.values(newObj).join('; ')

    if (dataUserCheckout?.checkout) {
      const nextProduct = JSON.parse(dataUserCheckout.checkout?.split('; ')[2])

      const dateLocale = new Date().toLocaleDateString().split('/')
      const localeDay = dateLocale[0] + '/' + dateLocale[2]

      const dateLocaleDb = dataUserCheckout?.total_order && dataUserCheckout.total_order?.split(', ')[1].split('/')
      const localeDayDb = dataUserCheckout?.total_order && dateLocaleDb[0] + '/' + dateLocaleDb[2]

      const transactionHandle =
        dataUserCheckout?.checkout ? JSON.parse(dataUserCheckout.checkout?.split('; ')[6]?.split(',').join('')?.slice(0, -1)) : 0

      const transactions = Number(transactionHandle) + Number(dataUserCheckout?.transactions)



      if (localeDayDb === localeDay) {
        async function updateProBought() {
          await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${idUser}`, {
            ...dataUserCheckout,
            checkout: output,
            transactions: `${transactions}`
          })
          successToast()
          setTimeout(() => {
            window.location.reload()
          }, 2500)
          window.location.reload()
        }
        if (window.confirm('Khách đã nhận được hàng?') === true) {
          updateProBought()
        }
      }
    }
  }

  const handleCancelCheckout = (idUser) => {
    const dataUserCheckout = userDatas.find(user => user.id === idUser)

    let totalOrder = dataUserCheckout?.total_order ? parseInt(dataUserCheckout.total_order) - 1 : 0

    const newObj = dataUserCheckout.checkout.split('; ').reduce((acc, next, index) => {
      acc[index] = next
      return acc
    }, {})
    newObj['8'] = 'Fail'
    const output = Object.values(newObj).join('; ')

    const cancelCheckoutData = {
      ...dataUserCheckout,
      checkout: output,
      total_order: `${totalOrder}, ${dataUserCheckout.checkout.split('; ')[7]}`,
    }

    async function cancelCheckout() {
      const res = await axios.put(`https://noithatmoho-backend.up.railway.app/api/users/${idUser}`, cancelCheckoutData).then(res => {
        return dataUserCheckout?.checkout && JSON.parse(dataUserCheckout.checkout?.split('; ')[2]).forEach(checkoutData => {
          products.filter(async data => {
            if (data.id === checkoutData.id) {
              if (checkoutData.id === data.id) {
                const quantity_sold = data.quantity_sold && data.quantity_sold !== 0 ?
                  data.quantity_sold - checkoutData.quantity : 0
                const quantity_stock = data.quantity_stock + checkoutData.quantity
                const updatePro = {
                  ...data,
                  quantity_sold,
                  quantity_stock
                }
                await axios.put(`https://noithatmoho-backend.up.railway.app/api/products/${data.id}`, updatePro)
                  .then(res => console.log(res.data))
                  .catch(err => console.log(err))
              }
            }
          })
        })
      })
      cancelToast()
      setTimeout(() => {
        window.location.reload()
      }, 2500)
      return res.data
    }

    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?') === true) {
      cancelCheckout()
    }

  }

  return (
    <>
      <div className={`widget-lg ${currentTheme === THEME_DARK && 'active'}`}>
        <h3 className={`widget-lg__title ${currentTheme === THEME_DARK && 'active'}`}>Đơn hàng gần đây</h3>
        <table className="widget-lg__table">
          <tr className={`widget-lg__tr ${currentTheme === THEME_DARK && 'active'}`}>
            <th className="widget-lg__th">Tên khách hàng</th>
            <th className="widget-lg__th">Ngày</th>
            <th className="widget-lg__th">Tổng giá trị đơn hàng (VND)</th>
            <th className="widget-lg__th">Trạng thái</th>
          </tr>

          {userDatas && userDatas.map((user, index) =>
            (user.is_admin === 0 && user?.checkout) && (
              <tr className={`widget-lg__tr ${currentTheme === THEME_DARK && 'active'}`} key={index}>
                <td className="widget-lg__user" >
                  {user.avatar ?
                    <img
                      src={user.avatar}
                      alt={user.full_name}
                      className="widget-lg__img"
                    /> :
                    <span
                      style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#d8d8d8',
                        borderRadius: '50%',
                        marginRight: 10
                      }}>
                      <i style={{
                        fontSize: '1.5rem',
                        color: '#fff'
                      }} className="fa-regular fa-user"></i>
                    </span>
                  }
                  <span className="widget-lg__name">{user.full_name}</span>
                </td>

                <td className="widget-lg__date">{user.checkout?.split('; ')[7]}</td>

                <td className="widget-lg__amount"
                  style={{
                    position: 'relative'
                  }}
                >{
                    user?.checkout &&
                    parseInt(user.checkout?.split('; ')[6].split(',').join('').slice(0, -1)).toLocaleString('ev-vi')
                  }
                  <span className='VND'
                    style={{
                      position: 'absolute',
                      top: '12px',
                      fontSize: '1.1rem'
                    }}
                  >
                    ₫</span>
                </td>

                <td className="widget-lg__date" style={{ color: user.checkout?.split('; ')[8] === 'Pending' ? '#ee693b' : user.checkout?.split('; ')[8] === 'Fail' ? 'red' : '#27678f' }}>
                  {user.checkout?.split('; ')[8]}
                </td>

                {user.checkout?.split('; ')[8] === 'Pending' && <td className="widget-lg__date">
                  <button
                    style={{
                      marginRight: 4,
                      cursor: 'pointer',
                      border: "1px solid var(--gray-color)",
                      outline: 'none',
                      padding: '0 8px',
                      height: '28px',
                      borderRadius: '3px',
                      lineHeight: '28px',
                      background: '#fff',
                      color: 'var(--gray-color)',
                    }}
                    onClick={() => handleCancelCheckout(user.id)}
                  >
                    Hủy
                  </button>

                  <button
                    style={{
                      cursor: 'pointer',
                      outline: 'none',
                      border: 'none',
                      background: 'var(--primary-color-blue)',
                      color: '#fff',
                      padding: '0 6px',
                      height: '28px',
                      lineHeight: '28px',
                      borderRadius: '3px',
                    }}
                    onClick={() => handleIsSuccessCheckout(user.id)}
                  >
                    Đã nhận
                  </button>
                </td>}

              </tr>
            ))}
        </table>
      </div >
      <ToastContainer />

    </>
  )
}

export default memo(WidgetLg)
