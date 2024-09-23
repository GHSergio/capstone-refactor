import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  Avatar,
  // Button,
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
          width: { xs: "4rem", sm: "7rem", md: "8rem", lg: "9rem" },
          bgcolor: "#FAFAFA",
          boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "5rem",
          // display: { xs: "none", sm: "flex" },
          position: "relative",
        }}
      >
        {/* 使用者資訊 */}
        <Box
          sx={{
            width: "90%",
            height: { xs: "1.25rem", sm: "2rem" },
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
            }}
          >
            {userProfile?.display_name}
          </Typography>

          {/* 下拉按鈕 */}
          <IconButton
            onClick={handleDropdownClick}
            sx={{
              width: { xs: "0.3rem", sm: "0.5rem" },
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
              sx={{ fontSize: { xs: "0.7rem", sm: "1.5rem", md: "2rem" } }}
            />
          </IconButton>

          {/* 下拉菜單 */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
            // PaperProps={{
            //   sx: {
            //     width: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
            //   },
            // }}
          >
            <Box
              onClick={handleLogout}
              sx={{
                padding: 0.5,
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
                sx={{ fontSize: { xs: "0.3rem", sm: "0.7rem", md: "0.9rem" } }}
              >
                登出
              </Typography>
            </Box>
          </Menu>
        </Box>

        {/* <Box
          sx={{
            width: "16px",
            height: "16px",
            position: "absolute",
            top: "50%",
            right: 15,
            transform: "translate(0,-50%)",
          }}
          component="img"
          src={dropdown}
        ></Box> */}
      </Box>
    </>
  );
};

export default User;
