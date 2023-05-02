import { memo, useEffect } from "react"
import Admin from "../../Components/Admin/Admin"
import { useTranslation } from 'react-i18next'

const AdminHome = ({ listPage }) => {
    const { t } = useTranslation(['header'])

    useEffect(() => {
        document.title = `Nội thất MOHO | ${t('Administrator')}`
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Admin listPage={listPage} />
        </>
    )
}

export default memo(AdminHome)

