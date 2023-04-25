import { memo } from "react"
import './Loading.scss'

const Loading = () => {
    return <div class="lds-dual-ring"></div>
}

export default memo(Loading)