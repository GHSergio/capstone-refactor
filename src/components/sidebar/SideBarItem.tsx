import React, { useState } from "react";
import {
  ListItem as MUIListItem,
  IconButton,
  Menu,
  // MenuItem,
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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTooltipOpen(false);
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

  const handleTooltipOpen = () => {
    if (!anchorEl) {
      setTooltipOpen(true); // 只有當 Menu 沒有打開時才顯示 Tooltip
    }
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const menuItemStyled = {
    fontWeight: "bold",
    fontSize: {
      xs: "100%",
      sm: "90%",
      md: "100%",
      lg: "100%",
      xl: "110%",
    },
    padding: {
      xs: "8px 8px",
      sm: "8px 8px",
      md: "8px 8px",
      lg: "100%",
      xl: "8px 10px",
    },
    "@media (max-width:321px)": {
      fontSize: "60%",
      padding: "8px 6px",
    },
    "@media (min-width:321px) and (max-width:376px)": {
      fontSize: "70%",
      padding: "8px 6px ",
    },
    "@media (min-width:376px) and (max-width:599px)": {
      fontSize: "90%",
      padding: "8px 6px ",
    },
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
        margin: {
          xs: "0.2rem 0",
          sm: "0.3rem 0",
          md: "0.4rem 0",
          xl: "0.5rem 0",
        },
        // fontSize: "1rem",
      }}
    >
      {/* 使用 Box + Typography 控制字體大小 */}
      <Tooltip
        title={<Typography sx={{ fontSize: "1rem" }}>{text}</Typography>}
      >
        <Box sx={{ width: "60%" }}>
          <Typography
            variant="h5"
            sx={{
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            {text}
          </Typography>
        </Box>
      </Tooltip>

      <Tooltip
        title={<Typography sx={{ fontSize: "1rem" }}>操作分類</Typography>}
        arrow
        open={tooltipOpen}
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
      >
        <Box>
          {text !== "收藏清單" && (
            <>
              <IconButton onClick={handleClickDropdown}>
                <MoreVertIcon
                  sx={{
                    color: isActive ? "#FEFEFE" : "inherit",
                    // fontSize: "1rem",
                    // fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.2rem" },

                    padding: 0,
                  }}
                />
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
              >
                <Box sx={{ ...menuItemStyled }} onClick={handleEdit}>
                  編輯名稱
                </Box>
                <Divider />
                <Box sx={{ ...menuItemStyled }} onClick={handleDelete}>
                  刪除分類
                </Box>
                <Divider />
                <Box sx={{ ...menuItemStyled }} onClick={handleAddShows}>
                  新增Podcast
                </Box>
              </Menu>
            </>
          )}
        </Box>
      </Tooltip>
    </MUIListItem>
  );
};

export default SideBarItem;
