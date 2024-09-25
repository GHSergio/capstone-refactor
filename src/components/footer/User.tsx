import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  Avatar,
  Tooltip,
} from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
          width: {
            xs: "4rem",
            sm: "7rem",
            md: "8rem",
            lg: "9rem",
          },
          "@media(min-width:1600px)": {
            width: "12rem",
          },
          bgcolor: "#FAFAFA",
          boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "5rem",
          position: "relative",
        }}
      >
        {/* 使用者資訊 */}
        <Box
          sx={{
            width: "90%",
            height: { xs: "1.25rem", sm: "2rem" },
            "@media(min-width:1600px)": {
              height: "3rem",
            },
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Avatar
            src={userProfile?.images?.[0]?.url || undefined}
            alt={userProfile?.display_name || ""}
            sx={{
              width: { xs: "1.25rem", sm: "2rem" },
              height: { xs: "1.25rem", sm: "2rem" },
              "@media(min-width:1600px)": {
                width: "3rem",
                height: "3rem",
              },
              borderRadius: "5rem",
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
              bgcolor: userProfile?.images?.[0]?.url
                ? "transparent"
                : "#4CAF50", // 綠色背景
              color: "#fff", // 文字顏色設為白色
              fontSize: { xs: "0.5rem", sm: "1.2rem" }, // 調整文字大小
            }}
          >
            {/* 當沒有照片時，顯示名稱的第一個字母 */}
            {!userProfile?.images?.[0]?.url && displayInitial}
          </Avatar>

          {/* User displayName */}
          <Tooltip title={userProfile?.display_name} arrow>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: "0.35rem",
                  sm: "0.6rem",
                  md: "0.7rem",
                  lg: "0.8rem",
                },
                marginLeft: {
                  xs: "0.3rem",
                  sm: "0.4rem",
                  md: "0.5rem",
                  lg: "1rem",
                },
                "@media(min-width:1600px)": {
                  fontSize: "1.15rem",
                  marginLeft: "1rem",
                },
                WebkitLineClamp: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userProfile?.display_name}
            </Typography>
          </Tooltip>
          {/* 下拉按鈕 */}
          <IconButton
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
                },
                "@media(min-width:1600px)": { fontSize: "2.5rem" },
              }}
            />
          </IconButton>
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
                sx={{ fontSize: { xs: "0.3rem", sm: "0.5rem", md: "0.7rem" } }}
              >
                登出
              </Typography>
            </Box>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default User;
