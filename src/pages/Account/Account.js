import { useState, useEffect, useCallback } from "react"
import Header from "../../Components/Header/Header"
import Account from "../../Components/Account/Account"
import BannerService from "../../Components/BannerService/BannerService"
import Footer from "../../Components/Footer/Footer"
import axios from "axios"


const AccountPage = ({ localeLogos, bannerServices, accountInfos }) => {
    const [isReload, setIsReload] = useState(false)
    const [data, setData] = useState([])
    const [userFullName, setUserFullName] = useState('')
    useEffect(() => {
        document.title = "Tài khoản"
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    },[])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://noithatmoho-backend.up.railway.app/api/users')
            const data = res.data
            setData(data)
        }
        fetchData()
    }, [])

    const handleReload = useCallback((data) => {
        setIsReload(data)
    }, [])

    useEffect(() => {
        const userId = parseInt(JSON.parse(localStorage.getItem('idUser')))
        const x = data.find(output => output.id === userId)
        if (x) {
            setUserFullName(x.full_name)
        }
    }, [data])
    return (
        <>
            <Header localeLogos={localeLogos} userFullName={userFullName} accountInfos={accountInfos} />
            <Account accountInfos={accountInfos} onReload={handleReload} />
            <BannerService bannerServices={bannerServices} />
            <Footer />
        </>
    )
}

export default AccountPage