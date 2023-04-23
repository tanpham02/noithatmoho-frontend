import { useState, useEffect, memo } from "react"
import { Link } from 'react-router-dom'
import './Chat.scss'
const Chat = () => {

    const [showOptions, setShowOptiops] = useState(false)
    const [showChatMain, setShowChatMain] = useState(false)

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.chat-main__options')) {
                setShowOptiops(false)
            }

            if (!e.target.closest('.chat-btn')) {
                setShowChatMain(false)
            }
        }
        window.addEventListener('mousedown', handleClick)

        return () => window.removeEventListener('mousedown', handleClick)
    }, [])



    return (
        <>
            <button
                className={`chat-btn ${showChatMain ? 'active' : ''}`}
                onClick={() => setShowChatMain(!showChatMain)}
            >
                <svg width="36" height="36" viewBox="0 0 36 36">
                    <path fill="white" d="M1 17.99C1 8.51488 8.42339 1.5 18 1.5C27.5766 1.5 35 8.51488 35 17.99C35 27.4651 27.5766 34.48 18 34.48C16.2799 34.48 14.6296 34.2528 13.079 33.8264C12.7776 33.7435 12.4571 33.767 12.171 33.8933L8.79679 35.3828C7.91415 35.7724 6.91779 35.1446 6.88821 34.1803L6.79564 31.156C6.78425 30.7836 6.61663 30.4352 6.33893 30.1868C3.03116 27.2287 1 22.9461 1 17.99ZM12.7854 14.8897L7.79161 22.8124C7.31238 23.5727 8.24695 24.4295 8.96291 23.8862L14.327 19.8152C14.6899 19.5398 15.1913 19.5384 15.5557 19.8116L19.5276 22.7905C20.7193 23.6845 22.4204 23.3706 23.2148 22.1103L28.2085 14.1875C28.6877 13.4272 27.7531 12.5704 27.0371 13.1137L21.673 17.1847C21.3102 17.4601 20.8088 17.4616 20.4444 17.1882L16.4726 14.2094C15.2807 13.3155 13.5797 13.6293 12.7854 14.8897Z"></path>
                </svg>

                {showChatMain ?
                    <div
                        className="chat-main"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="chat-main__heading">
                            <div className="chat-main__logo">
                                <img src='/assets/img/logo/logo.png' alt="Logo" />
                            </div>
                            <div className="chat-main__options">
                                <div style={{ marginRight: '14px' }}>
                                    <i
                                        className="fa-solid fa-ellipsis"
                                        onClick={() => setShowOptiops(!showOptions)}
                                    ></i>
                                    {showOptions && <ul className="chat-main__option-lists" onClick={e => e.stopPropagation()}>
                                        <li className="chat-main__option-item">
                                            <Link to='https://www.facebook.com/profile.php?id=100089540666592'>Visit Facebook Page</Link>
                                        </li>
                                        <li className="chat-main__option-item">
                                            <Link to='https://www.facebook.com/business/goals/add-live-chat-to-website-with-messenger'>
                                                Add Messenger to your website
                                            </Link>
                                        </li>
                                    </ul>}
                                </div>
                                <i
                                    class="fa-solid fa-minus"
                                    onClick={() => setShowChatMain(false)}
                                ></i>
                            </div>
                        </div>
                        <h3 className="chat-main__title">Chat with Nội Thất MOHO</h3>
                        <span class='chat-main__description'>Xin chào quý khách, MOHO có thể giúp được gì cho quý khách?</span>
                        <div className="chat-main__footer">
                            <button className="btn chat-main__btn">Start chat</button>
                            <div className="chat-main__text">
                                <img
                                    src="/assets/img/chat/messager.png"
                                    alt="Messenger" />
                                <span className="chat-main__text-footer">Powered by Messenger</span>
                            </div>
                        </div>
                    </div> :
                    <div
                        className="chat-main"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="chat-main__heading">
                            <div className="chat-main__logo">
                                <img src='/assets/img/logo/logo.png' alt="Logo" />
                            </div>
                            <div className="chat-main__options">
                                <div style={{ marginRight: '14px' }}>
                                    <i
                                        className="fa-solid fa-ellipsis"
                                        onClick={() => setShowOptiops(!showOptions)}
                                    ></i>
                                    {showOptions && <ul className="chat-main__option-lists" onClick={e => e.stopPropagation()}>
                                        <li className="chat-main__option-item">
                                            <Link to='https://www.facebook.com/profile.php?id=100089540666592'>Visit Facebook Page</Link>
                                        </li>
                                        <li className="chat-main__option-item">
                                            <Link to='https://www.facebook.com/business/goals/add-live-chat-to-website-with-messenger'>
                                                Add Messenger to your website
                                            </Link>
                                        </li>
                                    </ul>}
                                </div>
                                <i
                                    class="fa-solid fa-minus"
                                    onClick={() => setShowChatMain(false)}
                                ></i>
                            </div>
                        </div>
                        <h3 className="chat-main__title">Chat with Nội Thất MOHO</h3>
                        <span class='chat-main__description'>Xin chào quý khách, MOHO có thể giúp được gì cho quý khách?</span>
                        <div className="chat-main__footer">
                            <button className="btn chat-main__btn">Start chat</button>
                            <div className="chat-main__text">
                                <img
                                    src="https://z-p3-scontent.fsgn13-3.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=6825c5&amp;_nc_ohc=bwzBftFbw58AX-VgJZ2&amp;_nc_ht=z-p3-scontent.fsgn13-3.fna&amp;oh=00_AfD4eGn_2pkcQbpJJuWtit3R8qRvHiSBd09JGilq8gFz5Q&amp;oe=64445B3D"
                                    alt="Messenger" />
                                <span className="chat-main__text-footer">Powered by Messenger</span>
                            </div>
                        </div>
                    </div>

                }
            </button>
        </>
    )
}

export default memo(Chat)