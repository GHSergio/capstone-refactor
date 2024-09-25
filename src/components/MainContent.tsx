import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ListPage from "../pages/ListPage";
import FavoritePage from "../pages/FavoritePage";
import User from "./footer/User";

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
        <Box
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            display: { xs: "none", sm: "block" },
          }}
        >
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
            height: "80vh",
            padding: "1rem",
            margin: { xs: "6rem auto 0 auto", sm: "5rem auto 0 auto" },
          }}
        >
          {currentCategoryId === "favorites" ? <FavoritePage /> : <ListPage />}
        </Box>
      </Box>

      {/* User */}
      <Box
        sx={{
          position: "absolute",
          top: "40px",
          right: "60px",
          display: { xs: "none", sm: "block" },
        }}
      >
        <User />
      </Box>
    </>
  );
};

export default MainContent;
