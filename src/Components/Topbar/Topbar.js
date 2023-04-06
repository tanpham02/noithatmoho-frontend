
import { Link } from "react-router-dom";
import "./Topbar.scss";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

const Topbar = () => {

  

  return (
    <div className="top-bar">
      <div className="top-bar__wrapper">
        <div className="top-left">
          <Link to='/admin' className="logo">MOHO Administrator</Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar
