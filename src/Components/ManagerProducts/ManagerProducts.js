import './ManagerProducts.scss'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import axios from 'axios'

const ManagerProducts = () => {
    const [dataProducts, setDataProducts] = useState([])
    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:9080/api/products')
            const datas = await res.data
            setDataProducts(datas)
        }
        getData()
    }, [])

    const handleDelete = (id) => {
        async function deletePro() {
            const res = await axios.delete(`http://localhost:9080/api/products/${id}`)
            window.alert('Đã xóa sản phẩm thành công!')
            window.location.reload()
            return res
        }
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?') === true) {
            deletePro()
        }
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 120
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
            width: 200,
        },
        {
            field: "prices",
            headerName: "Giá",
            width: 200,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 200,
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


    return (

        <>
            <div className='header-search'>
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

            <div className="productList">
                <DataGrid
                    rows={dataSearch}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                // checkboxSelection
                />
            </div>
        </>
    )
}

export default memo(ManagerProducts)