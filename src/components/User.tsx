import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  // Button,
} from "@mui/material";
import { RootState } from "../store/store";
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
          width: "184px",
          height: "48px",
          bgcolor: "#FAFAFA",
          boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "5rem",
          display: "flex",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          {/* 使用者資訊顯示 */}
          <Avatar
            src={userProfile?.images?.[0]?.url || undefined}
            alt={userProfile?.display_name || ""}
            sx={{
              width: "48px",
              height: "48px",
              borderRadius: "5rem",
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
              bgcolor: userProfile?.images?.[0]?.url
                ? "transparent"
                : "#4CAF50", // 綠色背景
              color: "#fff", // 文字顏色設為白色
              fontSize: "1.2rem", // 調整文字大小
            }}
          >
            {/* 當沒有照片時，顯示名稱的第一個字母 */}
            {!userProfile?.images?.[0]?.url && displayInitial}
          </Avatar>
          <Typography
            variant="h6"
            sx={{ fontSize: "0.8rem", marginLeft: "1rem" }}
          >
            {userProfile?.display_name}
          </Typography>

          {/* 下拉按鈕 */}
          <IconButton
            onClick={handleDropdownClick}
            sx={{
              width: "16px",
              height: "16px",
              position: "absolute",
              top: "50%",
              right: 15,
              transform: "translate(0,-50%)",
            }}
          >
            <ArrowDropDownIcon />
          </IconButton>

          {/* 下拉菜單 */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={handleLogout}>登出</MenuItem>
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
