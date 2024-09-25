import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Logo from "../../assets/Logo.png";
import SideBarItem from "./SideBarItem";
import SidebarAddItem from "./SidebarAddItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setCurrentCategoryId } from "../../slice/userSlice";

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
        <Typography variant="h6">無法獲取播放分類清單</Typography>
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
        flexDirection: { xs: "row", sm: "column" },
        alignItems: "center",
        padding: "1.5rem",
      }}
    >
      {/* Logo 區域 */}
      <Box sx={{ width: "80%" }}>
        <img src={Logo} alt="Logo" style={{ width: "100%" }} />
      </Box>

      {/* 分隔線 */}
      <Divider
        sx={{
          width: "100%",
          my: "1.5rem",
          display: { sx: "none", sm: "block" },
        }}
      />

      {/* 新增分類的按鈕 */}
      <Box
        sx={{
          width: { xs: "80%", sm: "90%", md: "80%", lg: "70%", xl: "60%" },
          "@media(min-width:1600px)": {
            width: "40%",
          },
        }}
      >
        <SidebarAddItem />
      </Box>

      {/* 分類清單 */}
      <Box
        sx={{
          width: "100%",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: { xs: "0.2rem", sm: "0.3rem", md: "0.4rem", xl: "0.5rem" },
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "0.5rem",
          },
        }}
      >
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
  );
};

export default Sidebar;
