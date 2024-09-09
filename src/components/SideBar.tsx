import React from "react";
import { Box, Divider } from "@mui/material";
import Logo from "../assets/Logo.png";
import SideBarItem from "./SideBarItem";
import SidebarAddItem from "./SidebarAddItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentListId } from "../slice/podcastSlice";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { lists, currentListId } = useSelector(
    (state: RootState) => state.podcast
  );

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

      {/* 清單區 */}
      <Box sx={{ width: "100%" }}>
        {lists.map((list) => (
          <SideBarItem
            key={list.id}
            text={list.name}
            isActive={currentListId === list.id}
            onClick={() => dispatch(setCurrentListId(list.id))}
          />
        ))}
        {/* 收藏清單 */}
        <SideBarItem
          text="收藏清單"
          isActive={currentListId === "favorites"}
          onClick={() => dispatch(setCurrentListId("favorites"))}
        />
        {/* 新增分類的按鈕 */}
        <SidebarAddItem />
      </Box>
    </Box>
  );
};

export default Sidebar;
