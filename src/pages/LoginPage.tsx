import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ImageCarousel from "../components/LoginPage/ImageCarousel";
import Logo from "../assets/Logo.png";
import { loginWithSpotifyClick } from "../api/Author"; // 引入 Spotify Author 函數

const LoginPage: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    setIsPaused(true); // 停止自動輪播
  };

  const handleMouseLeave = () => {
    setIsPaused(false); // 恢復自動輪播
  };

  const handleLoginClick = () => {
    loginWithSpotifyClick(); // 觸發 Spotify 授權
  };

  const TypographyStyle = {
    fontSize: {
      xs: "0.3rem",
      sm: "0.6rem",
      md: "0.8rem",
      lg: "1rem",
    },
    "@media(min-width:1600px)": {
      fontSize: "1.8rem",
    },
  };

  return (
    // 最外層
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        boxShadow: "0 0 5px 2px rgba(0,0,0,0.7)",
        maxWidth: "1440px",
        maxHeight: "996px",
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
              xs: "30vw",
              sm: "28vw",
              md: "25vw",
              lg: "20vw",
            },
            "@media(min-width:1600px)": {
              width: "20vw",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              marginTop: "0.2rem",
              width: {
                xs: "40vw",
                sm: "35vw",
                md: "30vw",
                lg: "25vw",
              },
              fontFamily: "Montserrat",
              ...TypographyStyle,
              "@media (min-width:1600px)": {
                width: "25vw",
              },
              color: "#111111",
              letterSpacing: "0.03rem",
            }}
          >
            Connecting Stories That Matter
          </Typography>
        </Box>

        {/*  按鈕 */}
        <Box
          sx={{
            marginY: {
              xs: "0.2rem",
              sm: "0.6rem",
              md: "0.9rem",
              lg: "0.8rem",
            },
            "@media(min-width:1600px)": {
              marginY: "1.25rem",
            },
          }}
          onClick={handleLoginClick}
        >
          <Button
            sx={{
              width: {
                xs: "45vw",
                sm: "40vw",
                md: "35vw",
                lg: "30vw",
              },
              ...TypographyStyle,
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
              },
              "@media (min-width:1600px)": {
                padding: "2rem",
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
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              ...TypographyStyle,
            }}
          >
            沒有帳號嗎？
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              ...TypographyStyle,
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
