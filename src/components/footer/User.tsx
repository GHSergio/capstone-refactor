import React, { useState } from "react";
import {
  Box,
  Typography,
  // IconButton,
  Menu,
  Avatar,
  // Tooltip,
} from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const User = () => {
  const { userProfile } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // console.log(userProfile);

  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // 清空localStorage
    localStorage.clear();
    // 重定向到登錄頁面
    navigate("/login");
  };

  // 取得名稱的第一個字母，並將其轉為大寫
  const displayInitial =
    userProfile?.display_name?.charAt(0).toUpperCase() || "";

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FAFAFA",
          boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "5rem",
        }}
      >
        {/* 使用者資訊 */}
        {/* <Box
          sx={{
            width: "100%",
            height: { xs: "1.5rem", sm: "2rem" },
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
          }}
        > */}
        <Avatar
          component="button"
          onClick={handleDropdownClick}
          src={userProfile?.images?.[0]?.url || undefined}
          alt={userProfile?.display_name || ""}
          sx={{
            width: {
              xs: "1.2rem",
              sm: "1.8rem",
              md: "1.8rem",
              lg: "2rem",
              xl: "2.5rem",
            },
            height: {
              xs: "1.2rem",
              sm: "1.8rem",
              md: "1.8rem",
              lg: "2rem",
              xl: "2.5rem",
            },
            fontSize: {
              xs: "0.7rem",
              sm: "1.5rem",
              md: "1.3rem",
              lg: "1.5rem",
              xl: "2rem",
            },
            borderRadius: "5rem",
            boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
            bgcolor: userProfile?.images?.[0]?.url ? "transparent" : "#4CAF50",
            color: "#fff",
            cursor: "pointer",

            "@media (max-width:320px)": {
              fontSize: "0.9rem",
              width: "30px",
              height: "30px",
            },
            "@media (min-width:321px) and (max-width:376px)": {
              fontSize: "1rem",
              width: "40px",
              height: "40px",
            },
            "@media(min-width:376px) and (max-width:599px)": {
              fontSize: "1rem",
              width: "40px",
              height: "40px",
            },
          }}
        >
          {/* 當沒有照片時，顯示名稱的第一個字母 */}
          {!userProfile?.images?.[0]?.url && displayInitial}
        </Avatar>

        {/* User displayName */}
        {/* <Tooltip title={userProfile?.display_name} arrow>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.6rem",
                  md: "0.8rem",
                  lg: "0.8rem",
                  xl: "0.8rem",
                },
                marginLeft: {
                  xs: "0.3rem",
                  sm: "0.4rem",
                  md: "0.5rem",
                  lg: "1rem",
                  xl: "1rem",
                },
                "@media (max-width:320px)": {
                  fontSize: "0.4rem",
                },
                "@media (min-width:321px) and (max-width:376px)": {
                  fontSize: "0.4rem",
                },
                "@media (min-width:376px) and (max-width:599px)": {
                  fontSize: "0.4rem",
                },
                WebkitLineClamp: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userProfile?.display_name}
            </Typography>
          </Tooltip> */}
        {/* 下拉按鈕 */}
        {/* <IconButton
            onClick={handleDropdownClick}
            sx={{
              width: { xs: "0.3rem", sm: "0.5rem", xl: "1.2rem" },

              position: "absolute",
              top: "50%",
              right: { xs: 0, sm: 10 },
              transform: "translate(0,-50%)",
              ":hover": {
                bgcolor: "none",
              },
            }}
          >
            <ArrowDropDownIcon
              sx={{
                fontSize: {
                  xs: "0.7rem",
                  sm: "1.2rem",
                  md: "1.5rem",
                  lg: "2rem",
                  xl: "2rem",
                },
                "@media (max-width:320px)": {
                  fontSize: "0.7rem",
                },
                "@media (min-width:321px) and (max-width:376px)": {
                  fontSize: "0.7rem",
                },
                "@media (min-width:376px) and (max-width:599px)": {
                  fontSize: "0.7rem",
                },
              }}
            />
          </IconButton> */}
        {/* 下拉菜單 */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
          MenuListProps={{
            sx: {
              padding: 0,
            },
          }}
        >
          <Box
            onClick={handleLogout}
            sx={{
              padding: { xs: "0.3rem", sm: "0.5rem", md: "0.7rem" },
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.7rem", md: "0.7rem" },
                "@media (max-width:320px)": {
                  fontSize: "0.7rem",
                },
                "@media (min-width:321px) and (max-width:376px)": {
                  fontSize: "0.7rem",
                },
                "@media(min-width:376px) and (max-width:599px)": {
                  fontSize: "0.7rem",
                },
              }}
            >
              登出
            </Typography>
          </Box>
        </Menu>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default User;
