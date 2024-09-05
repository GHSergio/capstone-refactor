import React, { useState } from "react";
import {
  ListItem as MUIListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  setIsActionModalOpen,
  setIsSearchModalOpen,
} from "../slice/podcastSlice";

interface SideBarItemProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  text,
  isActive,
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const { isActionModalOpen } = useSelector(
    (state: RootState) => state.podcast
  );

  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAction = () => {
    setIsActionModalOpen(true);
  };

  return (
    <MUIListItem
      onClick={onClick}
      sx={{
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
      }}
    >
      <ListItemText primary={text} />
      <IconButton onClick={handleClickDropdown}>
        <MoreVertIcon sx={{ color: isActive ? "#FEFEFE" : "inherit" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>編輯名稱</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>刪除分類</MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(setIsSearchModalOpen(true))}>
          新增Podcast
        </MenuItem>
      </Menu>
    </MUIListItem>
  );
};

export default SideBarItem;
