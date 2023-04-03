import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useFormik } from "formik";
import axios from 'axios'
import * as Yup from "yup";

const RegisterEmail = () => {

    const [datas, setDatas] = useState([])
    const [errorEmail, setErrorEmail] = useState(false)
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            // phoneNumber: ''
            // confirmedPassword: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required').matches(/[a-zA-Z]/, 'Phải là chữ cái').min(2, 'Họ phải lớn hơn 2 ký tự'),
            lastName: Yup.string().required('Required').matches(/[a-zA-Z]/, 'Phải là chữ cái').min(4, 'Tên phải lớn hơn 4 ký tự'),
            email: Yup.string().required('Required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập email hợp lệ'),
            password: Yup.string().required('Required').matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Mật khẩu phải từ 8 ký tự, ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số, 1 kí tự đặc biệt'),
            // phoneNumber: Yup.string()
            // .required('Required')
            // .matches(
            //   /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            //   "Phải là số điện thoại"
            // ),
            // confirmedPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], "Phải khớp trường mật khẩu")
        }),
        onSubmit: (values) => {
            if (datas.length) {
                datas.every(data => {
                    let flag = false;
                    if ((data.email === formik.values.email)) {
                        setErrorEmail(true)
                        return flag;
                    }

                    if ((data.email !== formik.values.email) || !flag) {
                        if (formik.values.firstName || formik.values.lastName) {
                            const newValues = {
                                full_name: `${formik.values.firstName} ${formik.values.lastName}`,
                                email: formik.values.email,
                                password: formik.values.password,
                                vouchers: 'MOHO500K, MOHO50K, MOHO300K, MOHO200K, MOHO100K'
                            }
                            function createdUser() {
                                axios.post('http://localhost:9080/api/users', newValues)
                                    .then(res => console.log(res.data))
                                window.alert('Đăng kí thành công!')
                                window.location.replace('/')
                            }
                            createdUser()
                        }
                    }
                    return flag; // chạy 1 lần return luôn
                })
            }
        }
    })


    useEffect(() => {
        async function registerMail() {
            const res = await axios.get('http://localhost:9080/api/users')
            const dataUsers = await res.data
            setDatas([...dataUsers])
        }
        registerMail()
    }, [])



    return (
        <form id="form-register" onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor='firstName'></label>
                <input
                    type='text'
                    placeholder='Họ'
                    id='firstName'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
                {formik.errors.firstName && (
                    <span className="errorMsg"> {formik.errors.firstName} </span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor='lastName'></label>
                <input
                    type='text'
                    placeholder='Tên'
                    id='lastName'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                />
                {formik.errors.lastName && (
                    <span className="errorMsg"> {formik.errors.lastName} </span>
                )}
            </div>

            {/* <div className="form-group">
                <label htmlFor='phoneNumber'></label>
                <input
                    type='tel'
                    placeholder='Số điện thoại'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                />
                {formik.errors.phoneNumber && (
                    <span className="errorMsg"> {formik.errors.phoneNumber} </span>
                )}
            </div> */}

            <div className="form-group">
                <label htmlFor='email'></label>
                <input
                    type='email'
                    placeholder='Email'
                    id='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onInput={() => setErrorEmail(false)}
                />
                {errorEmail ?
                    <span className="errorMsg">Email đã được sử sử dụng</span> :
                    formik.errors.email && (
                        <span className="errorMsg"> {formik.errors.email} </span>
                    )}
            </div>

            <div className="form-group">
                <label htmlFor='password'></label>
                <input
                    type='password'
                    placeholder='Mật khẩu'
                    id='password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />

                {formik.errors.password && (
                    <span className="errorMsg"> {formik.errors.password} </span>
                )}
            </div>

            {/* <div className="form-group">
                <label htmlFor='confirmedPassword'></label>
                <input
                    type='password'
                    placeholder='Nhập lại mật khẩu'
                    id='confirmedPassword'
                    name='confirmedPassword'
                    value={formik.values.confirmedPassword}
                    onChange={formik.handleChange}
                />
                {formik.errors.confirmedPassword && (
                    <span className="errorMsg"> {formik.errors.confirmedPassword} </span>
                )}

            </div> */}

            <div className="policy">
                Website được bảo vệ bởi reCAPTCHA và
                <Link to="https://policies.google.com/privacy"> Chính sách bảo mật </Link>
                và <Link to="https://policies.google.com/terms">Điều khoản dịch vụ</Link> của Google.
            </div>

            <button type="submit" className="btn btn-register my--22" >ĐĂNG KÝ</button>
        </form>
    )
}

export default memo(RegisterEmail)