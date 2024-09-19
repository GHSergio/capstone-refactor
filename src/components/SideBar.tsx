import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Logo from "../assets/Logo.png";
import SideBarItem from "./SideBarItem";
import SidebarAddItem from "./SidebarAddItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentCategoryId } from "../slice/userSlice";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  // 從 userSlice 獲取播放清單和當前選中的清單 ID
  const { userCategories, currentCategoryId } = useSelector(
    (state: RootState) => state.user
  );

  // console.log("播放列表:", userCategories);
  // 如果 playlists 為空或未定義，顯示提示
  if (!userCategories || userCategories.length === 0) {
    return (
      <Box sx={{ padding: "1.5rem" }}>
        <Typography>無法獲取播放分類清單</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F6F7F8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
      }}
    >
      {/* Logo 區域 */}
      <Box sx={{}}>
        <img src={Logo} alt="Logo" style={{ width: "150px" }} />
      </Box>

      {/* 分隔線 */}
      <Divider sx={{ width: "100%", my: "2rem" }} />

      {/* Spotify 播放清單 */}
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
        {/* 新增分類的按鈕 */}
        <SidebarAddItem />
      </Box>
    </Box>
  );
};

export default Sidebar;
