import React from "react";
import Logo from "../logo.svg";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div
      className="HomeNav"
      style={{
        gridArea: "HomeNav",
        position: "relative",
      }}
    >
      <img
        src={Logo}
        alt="logo"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
      />

      <div
        style={{
          filter: "invert(1)",
          padding: "10px",
          height: "120px",
          width: "120px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <Link to="/home">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
