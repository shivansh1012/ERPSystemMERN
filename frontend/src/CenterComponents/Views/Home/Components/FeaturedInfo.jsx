import "./featuredInfo.css";

export default function FeaturedInfo(props) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{props.title1}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.value1}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">{props.title2}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.value2}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">{props.title3}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.value3}</span>
        </div>
      </div>
    </div>
  );
}