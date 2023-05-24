import {
    useState,
    useEffect,
    useMemo,
    memo
} from "react"
import './AllProducts.scss'
import { useTranslation } from 'react-i18next'


const AllProductsFilter = ({
    dataAlls,
    filterPrices,
    filterCategories,
    filterSort,
    onGetData
}) => {
    const [dataFilters, setDataFilters] = useState([])
    const [category, setCategory] = useState('')
    const [checkedCategory, setCheckedCategory] = useState()
    const [checkedPrice, setCheckedPrice] = useState()
    const [price, setPrice] = useState('')
    const [dataSort, setDataSort] = useState([])
    const [filterValues, setFilterValues] = useState([])
    const { t } = useTranslation(['navigation', 'products'])
    const [sort, setSort] = useState(`${t('Increase')}`)

    useEffect(() => {
        setFilterValues([category, price])
    }, [category, price])

    const handleChangeCategory = (index, e) => {
        setCheckedCategory(index)
        setCategory(e.target.value)
    }

    const handleChangePrice = (index, e) => {
        setCheckedPrice(index)
        setPrice(e.target.value)
    }

    useEffect(() => {
        let result
        if (sort !== '') {
            if (sort === `${t('Increase')}`) {
                result = dataAlls.sort((a, b) => a.prices - b.prices)
            } if (sort === `${t('Decrease')}`) {
                result = dataAlls.sort((a, b) => b.prices - a.prices)
            } if (sort === `A-Z`) {
                result = dataAlls.sort((a, b) => a.name.localeCompare(b.name))
            } if (sort === `Z-A`) {
                result = dataAlls.sort((a, b) => b.name.localeCompare(a.name))
            }
        }
        setDataSort([...result])
    }, [dataAlls, sort])
    useEffect(() => {
        const results = dataSort.filter(data => {
            let cate
            let pri
            if (category && price) {
                if (category) {
                    if (t(data.name, { ns: 'products' }).toLowerCase().includes(category.toLowerCase())) {
                        cate = data // nếu return nó sẽ không lọt xuống dưới vì ta đang set 2 trường hợp
                    }
                }
                if (price || cate) {
                    if (data.prices > 5000000 && price === 'over-5000000') {
                        pri = data
                    }
                    if ((data.prices > 2000000 && data.prices < 5000000) && price === '2000000 - 5000000') {
                        pri = data
                    }
                    if ((data.prices > 1000000 && data.prices < 1500000) && price === '1000000 - 1500000') {
                        pri = data
                    }
                    if ((data.prices > 500000 && data.prices < 1000000) && price === '500000 - 1000000') {
                        pri = data
                    }
                    if (data.prices < 500000 && price === 'under-500000') {
                        pri = data
                    }
                }
                return cate && pri
            }
            if (category) {
                if (t(data.name, { ns: 'products' }).toLowerCase().includes(category.toLowerCase())) {
                    return data
                }
            }

            if (price) {
                if (data.prices > 5000000 && price === 'over-5000000') {
                    return data
                }
                if ((data.prices > 2000000 && data.prices < 5000000) && price === '2000000 - 5000000') {
                    return data
                }
                if ((data.prices > 1000000 && data.prices < 1500000) && price === '1000000 - 1500000') {
                    return data
                }
                if ((data.prices > 500000 && data.prices < 1000000) && price === '500000 - 1000000') {
                    return data
                }
                if (data.prices < 500000 && price === 'under-500000') {
                    return data
                }
            }
        })
        setDataFilters([...results])
    }, [dataSort, category, price])


    const handleShowValueFilter = useMemo(() => {
        const results = filterValues.map((filterValue, index) => {
            let prices
            if (filterValue.includes(' - ')) {
                const x = filterValue.split(' - ')
                prices = `${parseInt(x[0]).toLocaleString('en-VI')}₫ - ${parseInt(x[1]).toLocaleString('en-VI')}₫`
            }

            if (!filterValue.includes(' - ') && filterValue === 'under-500000') {
                prices = `${t('Under')} ${parseInt('500000').toLocaleString('en-VI')}₫`
            }

            if (!filterValue.includes(' - ') && filterValue === 'over-5000000') {
                prices = `${t('Over')} ${parseInt('5000000').toLocaleString('en-VI')}₫`
            }

            if (filterValue !== '') {
                return (
                    <strong key={index}>{
                        filterValue.includes('0') ? prices : `${t('Category')}: ${filterValue}`
                    }
                        <i onClick={() => handleRemoveFilterValue(index)} className="fa-solid fa-xmark filter-values__icon"></i>
                    </strong>
                )
            }
        })
        return results
    }, [filterValues])

    const handleRemoveFilterValue = (index) => {
        filterValues.splice(index, 1)
        setFilterValues([...filterValues])
        filterValues.find(filterValue => {
            if (filterValue === category) {
                setCheckedPrice(null)
                setPrice('')
            }
            if (filterValue === price) {
                setCheckedCategory(null)
                setCategory('')
            }
        })
    }

    onGetData(dataFilters.length ? dataFilters : dataSort)

    return (
        <>
            <div className="filter px--16">
                <div className="filter__heading">
                    <i className="fa-sharp fa-solid fa-filter"></i>
                    <h3 className="filter__name">{t('Filters')}</h3>
                </div>
                <div className="filter__category">
                    {t('Category')}
                    <i className="fa-solid fa-angle-down category-icon"></i>
                    <ul className="filter-lists">
                        {filterCategories.map((category, index) => (
                            <li key={index} className="filter__item">
                                <input
                                    type='checkbox'
                                    id={`filter__item-check-${index + 1}`}
                                    value={category}
                                    className="filter__item-input"
                                    onChange={(e) => handleChangeCategory(index, e)}
                                    checked={checkedCategory === index}
                                />
                                <label htmlFor={`filter__item-check-${index + 1}`} className="filter__item-label">
                                    <span className="filter__item-input-pseudo"></span>
                                    {category}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="filter__prices">
                    {t('Product Price')}
                    <i className="fa-solid fa-angle-down"></i>
                    <ul className="filter-lists">
                        {filterPrices.map((valuePrice, index) => (
                            <li key={index} className="filter__item">
                                <input
                                    type='checkbox'
                                    id={`p-${index + 1}`}
                                    className="filter__item-input"
                                    value={valuePrice.value}
                                    onChange={(e) => handleChangePrice(index, e)}
                                    checked={checkedPrice === index}
                                />
                                <label htmlFor={`p-${index + 1}`} className="filter__item-label">
                                    <span className="filter__item-input-pseudo"></span>
                                    {valuePrice.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <select
                    className="filter-sort"
                    onChange={(e) => setSort(e.target.value)}
                >
                    {filterSort.map((category, index) => (
                        <option
                            key={index}
                            className="filter__item"
                            value={category.value}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

            </div>

            {(filterValues[0] || filterValues[1]) ?
                <div className="filter-values">
                    {handleShowValueFilter}
                    <span onClick={() => window.location.reload()} className="remove-all">{t('Remove all')}</span>
                </div> : ''}


        </>
    )
}

export default memo(AllProductsFilter)