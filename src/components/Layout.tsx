import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      {" "}
      <div>
        <h1> 這是Layout</h1>
        {/* <Navbar />
        <Footer /> */}
      </div>
      <Outlet />
      <div>
        <h1>這是Layout</h1>
      </div>
    </div>
  );
};

export default Layout;
