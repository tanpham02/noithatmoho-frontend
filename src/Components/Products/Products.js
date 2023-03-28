import { memo, useState, useMemo } from "react"
import './Products.css'

const Products = ({ datas }) => {

    const [indexShow, setIndexShow] = useState()

    const imgUrls = useMemo(() => {
        const imgs = datas.map(data => data.image_url)
        const listImgs = imgs.map((imgLists, index) => imgLists.split(', '))
        const result = listImgs.map((img_urls, index) => img_urls)
        return result
    }, [datas])

    const handleMouseEnter = (index) => {
        if(index) {
            setIndexShow(index)
        }
    }
    const handleMouseLeave = (dataIndex) =>{
        setIndexShow(dataIndex - 10000000000000)
    }
   
    return (
        <>
            {datas.map((data, dataIndex) => (
                <div key={dataIndex} className="grid__col-4">
                    <div
                        key={dataIndex}
                        onMouseEnter={() => handleMouseEnter(dataIndex)}
                        onMouseLeave={() => handleMouseLeave(dataIndex)}
                        className="product-item"
                    >
                        <h2 className="product-item__title">{data.name}</h2>
                        {imgUrls.map((imgs, imgIndex) => dataIndex === imgIndex &&
                            <img 
                                key={imgIndex} 
                                src={indexShow === imgIndex ? imgs[1] || imgs[0] : imgs[0]} 
                                alt={data.name} 
                                className="product-item__img" 
                            />

                            // DETAIL PRODUCTS
                            // <div>
                            //     {imgs.map((img, index) => <img src={img} alt={data.name}/>)}
                            // </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}

export default memo(Products)