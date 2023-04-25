import "./ManagerUsers.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, memo, useContext } from "react";
import axios from 'axios'
import { themeProvider } from '../../context/ProviderTheme/ProviderTheme'
import { THEME_DARK } from "../../reducers/actions";

const ManagerUsers = () => {
    const [dataUsers, setDataUSers] = useState([])
    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    const themePage = useContext(themeProvider)
    const [state] = themePage
    const { currentTheme } = state

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
        async function getData() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
            const datas = await res.data
            setDataUSers(datas)
        }
        getData()
    }, [])

    const handleDelete = (id) => {
        async function deleteUser() {
            await axios.delete(`https://noithatmoho-backend.up.railway.app/api/users/${id}`)
            window.alert('Xoá người dùng thành công!')
            window.location.reload()
        }
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?') === true) {
            deleteUser()
            return
        }
    }


    useEffect(() => {
        const muiContainer = document.querySelectorAll('.MuiDataGrid-root .MuiDataGrid-columnsContainer .MuiDataGrid-columnHeaderTitle')
        if (currentTheme === THEME_DARK) {
            muiContainer && muiContainer.forEach(cell => cell.classList.add('active'))
        } else {
            muiContainer && muiContainer.forEach(cell => cell.classList.remove('active'))
        }
    })


    useEffect(() => {
        const muiConCell = document.querySelectorAll('.MuiDataGrid-cell')
        currentTheme && muiConCell?.forEach(cell => {
            if (currentTheme === THEME_DARK) {
                cell.classList.add('active')
                console.log('Active')
            } else {
                console.log(currentTheme === THEME_DARK)
                cell.classList.remove('active')
                console.log('nonActive')
            }
        })
    }, [])


    useEffect(() => {
        const muiConBtn = document.querySelectorAll('.MuiIconButton-root')
        muiConBtn && muiConBtn.forEach(cell => {
            if (currentTheme === THEME_DARK) {
                cell.classList.add('active')
                return
            } else {
                cell.classList.remove('active')
                return
            }
        })
    })


    useEffect(() => {
        const muiPagination = document.querySelector('.MuiTablePagination-caption')
        if (currentTheme === THEME_DARK) {
            muiPagination?.classList.add('active')
            return
        } else {
            muiPagination?.classList.remove('active')
            return
        }
    })

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 95
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
                                <i className="fa-regular fa-user"></i>
                            </div>
                        }
                        {params.row.full_name}
                    </div >
                );
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
            width: 180,
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
                );
            },
        },
    ];





    return (
        <>
            <div className='header-search manager'>
                <input
                    className="header-search__input"
                    type='search'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
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

                <DataGrid
                    rows={dataSearch}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                // checkboxSelection
                />
            </div>
        </>
    );
}

export default memo(ManagerUsers)