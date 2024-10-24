import React from "react";
import {
  ListItem as MUIListItem,
  IconButton,
  useTheme,
  Typography,
  Box,
  Tooltip,
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
    <Box
      onClick={handleAddCategory}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.secondary.main,
        cursor: "pointer",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: theme.palette.secondary.main,
          fontSize: { xs: "70%", sm: "100%", md: "100%", lg: "120%" },
          "@media (min-width:1600px)": {
            fontSize: "150%",
          },
        }}
      >
        你的清單
      </Typography>
      <Tooltip
        title={<Typography sx={{ fontSize: "1rem" }}>新增清單</Typography>}
        arrow
      >
        <IconButton
          sx={{
            color: theme.palette.secondary.main,
            padding: 0,
          }}
        >
          <AddIcon
            sx={{
              fontSize: { xs: "70%", sm: "70%", md: "100%", lg: "100%" },
              "@media (min-width:1600px)": {
                fontSize: "150%",
              },
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SidebarAddItem;
