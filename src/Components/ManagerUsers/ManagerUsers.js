import "./ManagerUsers.scss"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState, useEffect, memo, useContext, useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { themeProvider } from '../../context/ProviderTheme/ProviderTheme'
import { THEME_DARK } from "../../reducers/actions"
import { API_SERVER_MYDUNG, API_SERVER_TANPHAM } from "../.."

const ManagerUsers = () => {
    const [dataUsers, setDataUSers] = useState([])
    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const themePage = useContext(themeProvider)
    const [state] = themePage
    const { currentTheme } = state

    const checkOutToast = useCallback(() =>
        toast.info('Hoàn tất xóa người dùng', {
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
        if (search.length) {
            const dataSearch = dataUsers.filter(data => data.full_name.toLowerCase().includes(search.toLowerCase().trim()))
            setDataSearch(dataSearch)
            return
        }
        setDataSearch(dataUsers)
        return
    }, [dataUsers, search])

    useEffect(() => {
        setIsLoading(true)
        async function getData() {
            try {
                const res = await axios.get(`${API_SERVER_TANPHAM}/api/users`)
                const datas = await res.data
                setDataUSers(datas)
                setIsLoading(false)

            } catch (err) {
                const res = await axios.get(`${API_SERVER_MYDUNG}/api/users`)
                const datas = await res.data
                setDataUSers(datas)
                setIsLoading(false)
            }
        }
        getData()

    }, [])

    const handleDelete = (id) => {
        async function deleteUser() {
            try {
                await axios.delete(`${API_SERVER_TANPHAM}/api/users/${id}`)
                checkOutToast()
                setTimeout(() => {
                    window.location.reload()
                }, 2800)

            } catch (err) {
                await axios.delete(`${API_SERVER_MYDUNG}/api/users/${id}`)
                checkOutToast()
                setTimeout(() => {
                    window.location.reload()
                }, 2800)
            }
        }
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?') === true) {
            deleteUser()
            return
        }
    }

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 110
        },
        {
            field: "full_name",
            headerName: "Tên",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.avatar ?

                            <img className="userListImg" src={params.row.avatar} alt="" /> :
                            <div style={{
                                width: '32px',
                                height: '32px',
                                lineHeight: '32px',
                                borderRadius: '50%',
                                textAlign: 'center',
                                background: '#d8d8d8',
                                color: '#afafaf',
                                fontSize: '1.2rem',
                                marginRight: '10px'
                            }}
                                className="checkout__info-avata"
                            >
                                <i style={{ color: '#fff' }} className="fa-regular fa-user"></i>
                            </div>
                        }
                        {params.row.full_name}
                    </div >
                )
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 265
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 420,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 170,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/manager-users/detail/${params.row.id}`}>
                            <button
                                className="userListEdit"
                            >
                                Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            style={{
                                fontSize: '2rem'
                            }}
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                )
            },
        },
    ]





    return (
        <>
            <div className='header-search manager'>
                <input
                    className="header-search__input"
                    type='search'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Tìm kiếm..."
                    name="name"
                />
                <button
                    className="btn-search"
                    type="search"
                >
                    <i className="fa-solid fa-magnifying-glass"></i>

                </button>
            </div>

            <h4 style={{
                fontSize: '2rem',
                color: 'var(--gray-color)',
                opacity: '0.9',
                marginLeft: '2rem',
                fontWeight: '800',
            }}
                className={`manager-user__title ${currentTheme === THEME_DARK && 'active'}`}
            >
                Quản lý người dùng
            </h4 >


            <Link to="/manager-users/create-user"
                style={{
                    margin: '0px 20px 20px 0px',
                    width: '6%',
                    position: 'relative',
                    right: '-92.9%',
                }}>
                <button className="userAddButton" style={{
                    backgroundColor: 'teal',
                    color: '#fff',
                    padding: '7px',
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    borderRadius: '4px',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                }}>Create</button>
            </Link >

            <div className="userList">
                {isLoading ?
                    <div className="users-lds-ring"><div></div><div></div><div></div><div></div></div> :
                    <DataGrid
                        rows={dataSearch}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                    // checkboxSelection
                    />
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default memo(ManagerUsers)