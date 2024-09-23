import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Slide, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Logo from "../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentCategoryId } from "../slice/userSlice";
import SideBarItem from "./sidebar/SideBarItem";
import SidebarAddItem from "./sidebar/SidebarAddItem";
import User from "./footer/User";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { userCategories, currentCategoryId } = useSelector(
    (state: RootState) => state.user
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#F6F7F8" }}>
        <Toolbar>
          {/* 漢堡按鈕 */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <img src={Logo} alt="Logo" style={{ width: "120px" }} />
          </Box>

          {/* User */}
          <Box>
            <User />
          </Box>
        </Toolbar>
      </AppBar>

      {/* 自定義下拉菜單 */}
      <Slide direction="down" in={menuOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: "56px",
            left: 0,
            width: "100%", 
            maxWidth: "100vw",
            height: "50%", 
            backgroundColor: "#FFF",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1200,
            padding: "1rem",
            overflowY: "auto", 
          }}
        >
          {/* 新增分類的按鈕 */}
          <Box sx={{ width: "150px", marginBottom: "1rem" }}>
            <SidebarAddItem />
          </Box>

          {/* 分類清單 */}
          <Box sx={{ width: "100%" }}>
            {userCategories?.map((category) => (
              <SideBarItem
                key={category?.id}
                text={category?.name}
                isActive={currentCategoryId === category?.id}
                onClick={() => dispatch(setCurrentCategoryId(category?.id))}
              />
            ))}
            {/* 收藏清單 */}
            <SideBarItem
              text="收藏清單"
              isActive={currentCategoryId === "favorites"}
              onClick={() => dispatch(setCurrentCategoryId("favorites"))}
            />
          </Box>
        </Box>
      </Slide>
    </>
  );
};

export default Navbar;
