import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <picture>
          <source media="(max-width: 750px)" srcSet="/bannn_mobile.png" />
          <img src="/banner4.png" alt="Banner" className="header-banner" />
        </picture>
      </div>
    </div>
  );
};

export default Header;
