import "./WidgetLg.scss";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widget-lg__button " + type}>{type}</button>;
  };
  return (
    <div className="widget-lg">
      <h3 className="widget-lg__title">Latest transactions</h3>
      <table className="widget-lg__table">
        <tr className="widget-lg__tr">
          <th className="widget-lg__th">Customer</th>
          <th className="widget-lg__th">Date</th>
          <th className="widget-lg__th">Amount</th>
          <th className="widget-lg__th">Status</th>
        </tr>
        <tr className="widget-lg__tr">
          <td className="widget-lg__user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widget-lg__img"
            />
            <span className="widget-lg__name">Susan Carol</span>
          </td>
          <td className="widget-lg__date">2 Jun 2021</td>
          <td className="widget-lg__amount">$122.00</td>
          <td className="widget-lg__status">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widget-lg__tr">
          <td className="widget-lg__user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widget-lg__img"
            />
            <span className="widget-lg__name">Susan Carol</span>
          </td>
          <td className="widget-lg__date">2 Jun 2021</td>
          <td className="widget-lg__amount">$122.00</td>
          <td className="widget-lg__status">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widget-lg__tr">
          <td className="widget-lg__user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widget-lg__img"
            />
            <span className="widget-lg__name">Susan Carol</span>
          </td>
          <td className="widget-lg__date">2 Jun 2021</td>
          <td className="widget-lg__amount">$122.00</td>
          <td className="widget-lg__status">
            <Button type="Pending" />
          </td>
        </tr>
        <tr className="widget-lg__tr">
          <td className="widget-lg__user">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widget-lg__img"
            />
            <span className="widget-lg__name">Susan Carol</span>
          </td>
          <td className="widget-lg__date">2 Jun 2021</td>
          <td className="widget-lg__amount">$122.00</td>
          <td className="widget-lg__status">
            <Button type="Approved" />
          </td>
        </tr>
      </table>
    </div>
  );
}
