import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ImageCarousel from "../components/LoginPage/ImageCarousel";
import Logo from "../assets/Logo.png";

const LoginPage: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    setIsPaused(true); // 停止自動輪播
  };

  const handleMouseLeave = () => {
    setIsPaused(false); // 恢復自動輪播
  };

  return (
    // 最外層
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        margin: "0 auto",
        textAlign: "center",
        boxShadow: "0 0 5px 2px rgba(0,0,0,0.7)",
      }}
    >
      {/* 左邊區域 */}
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo 區域 */}
        <Box
          textAlign="center"
          sx={{
            width: {
              xs: "40vw",
              sm: "35vw",
              md: "30vw",
              lg: "25vw",
              // xl: "25vw",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              width: {
                xs: "40vw",
                sm: "35vw",
                md: "30vw",
                lg: "25vw",
              },
              fontFamily: "Montserrat",
              fontSize: {
                xs: "0.3rem",
                sm: "0.6rem",
                md: "0.8rem",
                lg: "1.2rem",
                xl: "1.8rem",
              },
              color: "#111111",
              marginTop: "0.5rem",
              letterSpacing: "0.03rem",
            }}
          >
            Connecting Stories That Matter
          </Typography>
        </Box>

        {/*  按鈕 */}
        <Box
          sx={{
            mt: {
              xs: "0.5rem",
              sm: "1rem",
              md: "1.5rem",
              lg: "2rem",
              // xl: "2.5rem",
            },
          }}
        >
          <Button
            sx={{
              width: {
                xs: "45vw",
                sm: "40vw",
                md: "35vw",
                lg: "30vw",
                // xl: "25vw",
              },
              fontSize: {
                xs: "0.35rem",
                sm: "0.6rem",
                md: "0.8rem",
                lg: "1.2rem",
                xl: "2rem",
              },
              color: "#F3F5F6",
              backgroundColor: "#1ED760",
              borderRadius: {
                xs: "0.35rem",
                sm: "0.6rem",
                md: "0.8rem",
                lg: "1rem",
                xl: "1.5rem",
              },
              padding: {
                xs: "0.4rem",
                sm: "0.6rem",
                md: "0.8rem",
                lg: "1.2rem",
                xl: "2rem",
              },
              "&:hover": {
                backgroundColor: "#1ED760",
              },
            }}
          >
            使用 SPOTIFY 帳號登入
          </Button>
        </Box>

        {/* 底部註冊連結 */}
        <Box
          textAlign="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: {
              xs: "0.2rem",
              sm: "0.4rem",
              md: "0.6rem",
              lg: "0.8rem",
              xl: "1.5rem",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Noto Sans TC",
              fontSize: {
                xs: "0.35rem",
                sm: "0.6rem",
                md: "0.8rem",
                lg: "1.2rem",
                xl: "2rem",
              },
            }}
          >
            沒有帳號嗎？
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Noto Sans TC",
              fontWeight: "700",
              fontSize: {
                xs: "0.35rem",
                sm: "0.6rem",
                md: "0.8rem",
                lg: "1.2rem",
                xl: "2rem",
              },
            }}
          >
            <a
              href="https://open.spotify.com/"
              style={{ textDecoration: "none", color: "#3E3E3E" }}
            >
              註冊帳號
            </a>
          </Typography>
        </Box>
      </Box>

      {/* 右邊圖片輪播區域 */}
      <Box
        sx={{
          position: "relative",
          width: "50%",
          height: "100vh",
          backgroundColor: "#23262F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ImageCarousel isPaused={isPaused} />
      </Box>
    </Box>
  );
};

export default LoginPage;
