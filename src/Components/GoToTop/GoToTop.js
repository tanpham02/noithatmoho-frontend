import { memo } from "react"
import './GoToTop.scss'
const GoToTop = () => {
    const handleScroll = () => {
        window.scroll(0, 0)
    }

    return (
        <>
            <button 
                className="goto-top"
                onClick={handleScroll}
            >
                <i className="fa-solid fa-angle-up goto-top__icon"></i>
            </button>
        </>
    )
}

export default memo(GoToTop)