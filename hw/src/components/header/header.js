import React from "react";

import "./header.css";

const Header = ({ getComponent }) => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#">StarDB</a>
      </h3>
      <ul className="d-flex">
        <li onClick={() => getComponent("People")}>
          <a href="#">People</a>
        </li>
        <li onClick={() => getComponent("Planets")}>
          <a href="#">Planets</a>
        </li>
        <li onClick={() => getComponent("Starships")}>
          <a href="#">Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
