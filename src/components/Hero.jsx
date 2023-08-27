import React from "react";
import logo from "../logo2.svg";
import "../css/buttons.css";

function Hero() {
  return (
    <>
      <div
        className="mainCon"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          paddingLeft: "100px",
          paddingRight: "180px",
          marginLeft: "100px",
          marginRight: "600px",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,rgba(0,0,0,1) 60%,#212325 100%)",
        }}
      >
        <div
          className="mainTitle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            marginRight: "96px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              filter: "invert(1)",
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              maxHeight: "500px",
            }}
          />
        </div>

        <div>
          <div
            className="mainSubTitle"
            style={{
              fontSize: "2rem",
              // fontWeight: "bold",
              color: "white",
              textShadow:
                "2px 2px 4px #000000, 0 0 35px #000000, 0 0 5px #000000 ",
              marginTop: "10px",
            }}
          >
            Find my style helps you find your next tattoo. Explore a wide range
            of artist and their work to find the perfect tattoo for you.
          </div>
        </div>
        <div
          className="btn from-center"
          onClick={() => {
            setTimeout(() => {
              window.location.href = "/home";
            }, 700);
          }}
        >
          <div>Find Your Style</div>
        </div>
      </div>
    </>
  );
}

export default Hero;
