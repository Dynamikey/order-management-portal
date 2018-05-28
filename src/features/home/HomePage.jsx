import React from "react";

const HomePage = ({history}) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo.png"
              alt="logo"
            />
            <div className="content">Order Management Portal</div>
          </h1>
          <div onClick={() => history.push('/orders')} className="ui huge white inverted button">
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        Developed by{" "}
        <a href="http://www.linkedin.com/in/zhaomichael/" title="Michael Zhao">
          Michael Zhao
        </a>
      </div>
    </div>
  );
};

export default HomePage;
