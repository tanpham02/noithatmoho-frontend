import "./WidgetSm.scss";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
  return (
    <div className="widget-sm">
      <span className="widget-sm__title">New Join Members</span>
      <ul className="widget-sm__list">
        <li className="widget-sm__list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widget-sm__img"
          />
          <div className="widget-sm__user">
            <span className="widget-sm__user-name">Anna Keller</span>
            <span className="widget-sm__user-title">Software Engineer</span>
          </div>
          <button className="widget-sm__button">
            <Visibility className="widget-sm__icon" />
            Display
          </button>
        </li>
        <li className="widget-sm__list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widget-sm__img"
          />
          <div className="widget-sm__user">
            <span className="widget-sm__user-name">Anna Keller</span>
            <span className="widget-sm__user-title">Software Engineer</span>
          </div>
          <button className="widget-sm__button">
            <Visibility className="widget-sm__icon" />
            Display
          </button>
        </li>
        <li className="widget-sm__list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widget-sm__img"
          />
          <div className="widget-sm__user">
            <span className="widget-sm__user-name">Anna Keller</span>
            <span className="widget-sm__user-title">Software Engineer</span>
          </div>
          <button className="widget-sm__button">
            <Visibility className="widget-sm__icon" />
            Display
          </button>
        </li>
        <li className="widget-sm__list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widget-sm__img"
          />
          <div className="widget-sm__user">
            <span className="widget-sm__user-name">Anna Keller</span>
            <span className="widget-sm__user-title">Software Engineer</span>
          </div>
          <button className="widget-sm__button">
            <Visibility className="widget-sm__icon" />
            Display
          </button>
        </li>
        <li className="widget-sm__list-item">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widget-sm__img"
          />
          <div className="widget-sm__user">
            <span className="widget-sm__user-name">Anna Keller</span>
            <span className="widget-sm__user-title">Software Engineer</span>
          </div>
          <button className="widget-sm__button">
            <Visibility className="widget-sm__icon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
