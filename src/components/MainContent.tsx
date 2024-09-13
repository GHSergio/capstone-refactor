import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ListPage from "../pages/ListPage";
import FavoritePage from "../pages/FavoritePage";

const MainContent = () => {
  const { currentCategoryId } = useSelector((state: RootState) => state.user);
  const getGreeting = (): string => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      return "早安";
    } else if (hour < 18) {
      return "午安";
    } else {
      return "晚安";
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {/* 問候 */}
        <Box sx={{ position: "absolute", top: "2rem", left: "1.5rem" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.5rem",
            }}
          >
            {getGreeting()}
          </Typography>
        </Box>

        {/* 動態內容區域 */}
        <Box
          sx={{
            width: "100%",
            padding: "1rem",
            margin: "5rem auto 0 auto",
            overflowY: "auto",
            height: "100%",
          }}
        >
          {currentCategoryId === "favorites" ? <FavoritePage /> : <ListPage />}
        </Box>
      </Box>
    </>
  );
};

export default MainContent;
