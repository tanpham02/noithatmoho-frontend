import "./ManagerUsers.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

const ManagerUsers = () => {
    const [dataUsers, setDataUSers] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:9080/api/users')
            const datas = await res.data
            setDataUSers(datas)
        }
        getData()
    }, [])

    const handleDelete = (id) => {
        setDataUSers(dataUsers.filter((item) => item.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "full_name",
            headerName: "Tên",
            width: 160,
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
        { field: "email", headerName: "Email", width: 230 },
        {
            field: "phone_number",
            headerName: "Số điện thoại",
            width: 100,
        },
        {
            field: "birthday",
            headerName: "Ngày sinh",
            width: 100,
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 360,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/manager-users/detail/${params.row.id}`}>
                            <button className="userListEdit" style={{ backgroundColor: 'teal' }}>Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Link to="/manager-users/create-user"
                style={{
                    margin: '0px 20px 20px 0px',
                    width: '6%',
                    position: 'relative',
                    right: '-91.8%'
                }}>
                <button className="userAddButton">Create</button>
            </Link>
            <div className="userList">

                <DataGrid
                    rows={dataUsers}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                // checkboxSelection
                />
            </div>
        </>
    );
}

export default ManagerUsers