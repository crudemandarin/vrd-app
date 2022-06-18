import React from "react";

import { Link, Outlet } from "react-router-dom";

import "./styles.css";
import "./app-styles.css";

import dc2Logo from "../dc2-logo.webp";

const App = () => {
  return (
    <>
      <header>
        <div className="header-banner">
          <div className="flex">
            <img src={dc2Logo} alt="DC2 Logo" />
            <div className="flex align-items-center mx-2">
              <div>
                <h1 className="dc2-title">E.T.R. Demonstration</h1>
                <h2 className="dc2-subtitle">Demand Control 2</h2>
              </div>
            </div>
          </div>

          <div className="flex align-items-center">
            <p>My Account</p>
          </div>
        </div>

        <nav>
          <Link to="/dashboard">
            <div className="nav-item active">Dashboard</div>
          </Link>
          <Link to="/trade-logs">
            <div className="nav-item">Logs</div>
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default App;
