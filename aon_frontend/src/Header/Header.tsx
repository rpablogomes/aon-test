import React from "react";
import { useNavigate } from "react-router-dom";

import "./Header.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src="https://www.aon.com/getmedia/b92e8b10-9efa-4a2e-a807-ac160deefdeb/new-aon-logo.svg"
        alt="Aon Logo"
        className="header-logo"
      />
      <button className="home-button" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </header>
  );
};

export default Header;
