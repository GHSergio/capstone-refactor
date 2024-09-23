import React from "react";
import {
  ListItem as MUIListItem,
  // ListItemText,
  IconButton,
  useTheme,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  setCurrentAction,
  setIsActionModalOpen,
} from "../../slice/podcastSlice";

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
        width: "100%",
        display: "flex",
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
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: theme.palette.secondary.main,
          fontSize: { xs: "70%", sm: "90%" },
        }}
      >
        新增分類
      </Typography>
    </MUIListItem>
  );
};

export default SidebarAddItem;
