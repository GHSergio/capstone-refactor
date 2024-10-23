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
      {/* 大螢幕 */}
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#F6F7F8",
          display: { xs: "none", sm: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 5px 2px rgba(0,0,0,0.2)",
          height: {
            xs: "4vw",
            sm: "8vw",
            md: "6vw",
            lg: "5vw",
          },

          "@media(min-width:1600px)": {
            height: "5vw",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              textAlign: "center",
              fontSize: "1rem",
            }}
          >
            <img src={Logo} alt="Logo" style={{ width: "220px" }} />
          </Box>

          {/* User */}
          <Box>
            <User />
          </Box>
        </Toolbar>
      </AppBar>

      {/* 小螢幕 */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#F6F7F8",
          display: { xs: "block", sm: "none" },
          "@media (max-width:320px)": {
            height: "18vw",
          },
          "@media (min-width:321px) and (max-width:376px)": {
            height: "16vw",
          },
          "@media (min-width:376px) and (max-width:600px)": {
            height: "14vw",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
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
