import './ManagerProducts.scss'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

const ManagerProducts = () => {
    const [dataProducts, setDataProducts] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:9080/api/products')
            const datas = await res.data
            setDataProducts(datas)
        }
        getData()
    }, [])

    const handleDelete = (id) => {
        setDataProducts(dataProducts.filter((item) => item.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "Tên",
            width: 300,
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
        { field: "quantity_stock", headerName: "Số lượng nhập vào", width: 180 },
        {
            field: "quantity_sold",
            headerName: "Số lượng đã bán",
            width: 180,
        },
        {
            field: "prices",
            headerName: "Giá",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
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

    return (

        <>
            <Link to="/manager-products/create-product"
                style={{
                    margin: '0px 20px 20px 0px',
                    width: '6%',
                    position: 'relative',
                    right: '-93.8%'
                }}>
                <button className="productAddButton" style={{
                    backgroundColor: 'teal',
                    color: '#fff',
                    padding: '7px',
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    borderRadius: '4px',
                    outline: 'none',
                    border: 'none'
                }}>Create</button>
            </Link >

            <div className="productList">
                <DataGrid
                    rows={dataProducts}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                // checkboxSelection
                />
            </div>
        </>
    )
}

export default ManagerProducts