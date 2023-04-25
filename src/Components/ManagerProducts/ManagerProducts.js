import './ManagerProducts.scss'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, memo, useContext } from "react";
import axios from 'axios'
import { themeProvider } from '../../context/ProviderTheme/ProviderTheme'
import { THEME_DARK } from '../../reducers/actions'
import { CircularProgress } from '@material-ui/core';

const ManagerProducts = () => {
    const [dataProducts, setDataProducts] = useState([])
    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    const themePage = useContext(themeProvider)
    const [state] = themePage
    const { currentTheme } = state

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function getData() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/products')
            const datas = await res.data
            setDataProducts(datas)
            setIsLoading(false)
        }
        getData()
    }, [])

    const handleDelete = (id) => {
        async function deletePro() {
            await axios.delete(`https://noithatmoho-backend.up.railway.app/api/products/${id}`)
            window.alert('Đã xóa sản phẩm thành công!')
            window.location.reload()
        }
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?') === true) {
            deletePro()
            return
        }
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 110
        },
        {
            field: "name",
            headerName: "Tên",
            width: 450,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.image_url ?

                            <img className="userListImg" src={params.row.image_url.split(', ')[0]} alt="" /> :
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
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "quantity_sold",
            headerName: "Số lượng đã bán",
            width: 220,
        },
        {
            field: "prices",
            headerName: "Giá",
            width: 150,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 180,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/manager-products/detail/" + params.row.id}>
                            <button className="productListEdit" style={{
                                backgroundColor: 'teal'
                            }}>Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        if (search.length) {
            const dataSearch = dataProducts.filter(data => data.name.toLowerCase().includes(search.toLowerCase().trim()))
            setDataSearch(dataSearch)
            return
        }
        setDataSearch(dataProducts)
        return
    }, [dataProducts, search])






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
            } else {
                cell.classList.remove('active')
            }
        })
    })


    useEffect(() => {
        addActiveBtn()
    }, [])
    async function addActiveBtn() {
        const muiConBtn = document.querySelectorAll('.MuiIconButton-root')
        muiConBtn && muiConBtn.forEach(btn => {
            if (currentTheme === THEME_DARK) {
                btn.classList.add('active')
                return
            } else {
                btn.classList.remove('active')
                return
            }
        })
    }


    useEffect(() => {
        addActiveBtnDis()
    }, [])
    async function addActiveBtnDis() {
        const btnDisabled = document.querySelectorAll('.MuiIconButton-root.Mui-disabled')
        btnDisabled && btnDisabled.forEach(btnDis => {
            if (currentTheme === THEME_DARK) {
                btnDis.classList.add('active')
                return
            } else {
                btnDis.classList.remove('active')
                return
            }
        })
    }

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
                Quản lý sản phẩm
            </h4 >
            <Link to="/manager-products/create-product"
                style={{
                    margin: '0px 20px 20px 0px',
                    width: '6%',
                    position: 'relative',
                    right: '-92.9%',
                }}>
                <button className="productAddButton" style={{
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

            {isLoading ?
                <CircularProgress /> :
                <div className="productList">
                    <DataGrid
                        rows={dataSearch}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                    // checkboxSelection
                    />
                </div>
            }
        </>
    )
}   

export default memo(ManagerProducts)