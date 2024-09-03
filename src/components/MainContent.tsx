import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainContent = () => {
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
            sx={{
              fontFamily: "Noto Sans TC",
              fontWeight: "700",
              fontSize: "1.5rem",
            }}
          >
            {getGreeting()}
          </Typography>
        </Box>

        {/* 動態內容區域 */}
        <Box>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainContent;
