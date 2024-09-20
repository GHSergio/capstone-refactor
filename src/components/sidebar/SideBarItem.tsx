import React, { useState } from "react";
import {
  ListItem as MUIListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import {
  setIsSearchModalOpen,
  setIsActionModalOpen,
  setCurrentAction,
} from "../../slice/podcastSlice";

interface SideBarItemProps {
  text?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  text,
  isActive,
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    dispatch(setCurrentAction("edit"));
    dispatch(setIsActionModalOpen(true));
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(setCurrentAction("delete"));
    dispatch(setIsActionModalOpen(true));
    setAnchorEl(null);
  };

  const handleAddShows = () => {
    dispatch(setIsSearchModalOpen(true));
    setAnchorEl(null);
  };

  return (
    <MUIListItem
      onClick={onClick}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: isActive ? "#111111" : "transparent",
        color: isActive ? "#FEFEFE" : "inherit",
        borderRadius: "1rem",
        "&:hover": {
          backgroundColor: "#dddddd",
        },
        cursor: "pointer",
        margin: "0.5rem 0",
      }}
    >
      {/* 使用 Box + Typography 控制字體大小 */}
      <Tooltip title={text}>
        <Box sx={{ width: "60%" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "100%",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </Typography>
        </Box>
      </Tooltip>

      <Box>
        {text !== "收藏清單" && (
          <>
            <IconButton onClick={handleClickDropdown}>
              <MoreVertIcon sx={{ color: isActive ? "#FEFEFE" : "inherit" }} />
            </IconButton>

            {/* DropDown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              // transformOrigin={{
              //   vertical: "bottom",
              //   horizontal: "right",
              // }}
            >
              <MenuItem onClick={handleEdit}>編輯名稱</MenuItem>
              <Divider />
              <MenuItem onClick={handleDelete}>刪除分類</MenuItem>
              <Divider />
              <MenuItem onClick={handleAddShows}>新增Podcast</MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </MUIListItem>
  );
};

export default SideBarItem;
