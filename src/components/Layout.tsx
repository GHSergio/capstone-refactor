import React from "react";
import { Box } from "@mui/material";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box
          width={260}
          height="100%"
          sx={{ boxShadow: "0px 0px 2px 2px #C7C7C73D" }}
        >
          <SideBar />
        </Box>

        {/* <Box height="100%" sx={{ flex: 1, display: "flex", flexDirection: "column" }}> */}

        <Box height="100%" sx={{ flex: 1 }}>
          <MainContent />
        </Box>

        <Box width={372} height="100%">
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
