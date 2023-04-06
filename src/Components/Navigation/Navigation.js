import { useTranslation } from 'react-i18next'
import { useState, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './Navigation.scss'


const Navigation = ({ groupTypes, types, products }) => {
    const { t } = useTranslation(['navigation'])
    const [navLv2s, setNavLv2s] = useState([])
    const [listIdNavLv2, setListIdNavLv2] = useState([])
    const [showIcon, setShowIcon] = useState([])

    useMemo(() => handleNavLv2(groupTypes, types), [groupTypes, types])
    useMemo(() => handleShowIcon(types, products), [types, products])


    function handleNavLv2(groupTypes, types) {
        groupTypes.forEach(groupType => {
            types.find(type => {
                if (type['groupType-id'] === groupType.id) {
                    setNavLv2s(prev => [...prev, type])
                    setListIdNavLv2(prev => [...prev, type['groupType-id']])
                }
            })
        })
    }


    function handleShowIcon(types, products) {
        types.forEach(type => {
            const result = products.filter(product => {
                const output = type.names.filter(name => name.name === product['type-name'])
                return output
            })
            for (const name of result) {
                setShowIcon(prev => [...prev, name['type-name']])
            }
        })
    }


    return (
        <div className="nav">
            <nav className="nav__main">
                <ul className="nav__lists">
                    {groupTypes.map((groupType, index) => (
                        <li
                            className="nav__item"
                            key={index}
                        >
                            <Link to={groupType.href ?? '#'}>
                                {groupType.desc && <span className="nav__desc">{groupType.desc}</span>}
                                {t(groupType.name)}
                                {showIcon &&
                                    <>
                                        <i
                                            className={`fa-solid fa-angle-down nav__item-icon ${listIdNavLv2.includes(groupType.id) ?
                                                'active' : ''}`}>
                                        </i>
                                        <ul className="nav__lists-lv2">
                                            {navLv2s.map(navLv2 => {
                                                if (navLv2['groupType-id'] === groupType.id)
                                                    return navLv2.names.map((name, nameIndex) => (
                                                        <li
                                                            key={nameIndex}
                                                            className="nav__item-lv2"
                                                        >
                                                            <Link to={name.href || "#"} className="nav__item-link-lv2">
                                                                {t(name.name)}

                                                                {
                                                                    showIcon.includes(name.name) &&
                                                                    <i className="fa-solid fa-angle-right nav__item-icon-lv2"></i>
                                                                }

                                                                <ul className='nav__lists-lv3'  >
                                                                    {products.map(product => {
                                                                        if (name.name === product['type-name']) {
                                                                            return product.value.map((prod, index) => (
                                                                                <li
                                                                                    className="nav__item-lv3"
                                                                                    key={index}
                                                                                >
                                                                                    <Link
                                                                                        className="nav__item-link-lv3"
                                                                                        to={prod.href || "#"}
                                                                                    >
                                                                                        {t(prod.name)}
                                                                                    </Link>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    })}
                                                                </ul>
                                                            </Link>
                                                        </li>
                                                    ))
                                            })}
                                        </ul>
                                    </>
                                }
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default memo(Navigation)