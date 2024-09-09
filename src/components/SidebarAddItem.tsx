import React from "react";
import {
  ListItem as MUIListItem,
  ListItemText,
  IconButton,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setCurrentAction, setIsActionModalOpen } from "../slice/podcastSlice";

const SidebarAddItem: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleAddCategory = () => {
    dispatch(setCurrentAction("add"));
    dispatch(setIsActionModalOpen(true));
  };

  return (
    <MUIListItem
      onClick={handleAddCategory}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.main}`,
        borderRadius: "1rem",
        margin: "0.5rem 0",
        cursor: "pointer",
        padding: "0.2rem",
      }}
    >
      <IconButton sx={{ color: theme.palette.secondary.main }}>
        <AddIcon />
      </IconButton>
      <ListItemText
        primary="新增分類"
        sx={{
          textAlign: "center",
          color: theme.palette.secondary.main,
        }}
      />
    </MUIListItem>
  );
};

export default SidebarAddItem;
