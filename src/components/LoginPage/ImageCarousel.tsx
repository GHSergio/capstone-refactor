import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

interface ImageCarouselProps {
  isPaused: boolean;
}

const images = [image1, image2, image3];
const contents = [
  { title: "鼓舞人心的故事", text: "從非凡的人生故事和成功經歷中獲得靈感" },
  {
    title: "輕鬆分類與管理",
    text: "一目了然的分類，讓收藏的 Podcast 保持整潔",
  },
  {
    title: "Spotify 快速同步",
    text: "透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽",
  },
];

const ImageCarousel: React.FC<ImageCarouselProps> = ({ isPaused }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <>
      {/* Blurred Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 60, sm: 70, md: 80, lg: 90, xl: 100 },
          width: "32vw",
          maxWidth: "900px",
          borderRadius: "0.8rem",
          overflow: "hidden",
          filter: "blur(41.8502px)",
          opacity: 0.7,
        }}
      >
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`carousel-image-${currentIndex}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Sharp Foreground Image */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 60, sm: 70, md: 80, lg: 90, xl: 100 },
          width: "30vw",
          maxWidth: "900px",
          borderRadius: "0.8rem",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`carousel-image-${currentIndex}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Title and Description */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 160, sm: 260, md: 380, lg: 492 },
          "@media(min-width:1600px)": {
            top: 950,
          },
          width: "35vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", marginTop: "90px" }}>
          <Typography
            variant="h5"
            color="white"
            sx={{
              fontSize: {
                xs: "0.6rem",
                sm: "1.2rem",
                md: "1.6rem",
                lg: "2rem",
              },
              // "@media(min-width:1600px)": {
              //   fontSize: "3rem",
              // },
              fontFamily: "Noto Sans TC",
              fontWeight: 700,
            }}
          >
            {contents[currentIndex].title}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{
              fontSize: {
                xs: "0.3rem",
                sm: "0.5rem",
                md: "0.7rem",
                lg: "0.9rem",
              },
              // "@media(min-width:1600px)": {
              //   fontSize: "1.5rem",
              // },
              marginTop: { xs: "0.5rem", lg: "1.2rem" },
              fontFamily: "Poppins",
            }}
          >
            {contents[currentIndex].text}
          </Typography>
        </Box>
      </Box>

      {/* Control Box */}
      <Box
        sx={{
          position: "absolute",
          width: "48vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handlePrev}>
          <ArrowBackIosIcon
            sx={{
              color: "white",
              fontSize: {
                xs: "0.6rem",
                sm: "0.8rem",
                md: "1.2rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          />
        </IconButton>

        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon
            sx={{
              color: "white",
              fontSize: {
                xs: "0.6rem",
                sm: "0.8rem",
                md: "1.2rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          />
        </IconButton>
      </Box>

      {/* 控制器指示器 */}
      <Box
        sx={{
          display: "flex",
          gap: "1.25vw",
          position: "absolute",
          bottom: { xs: 50, sm: 70, md: 120, lg: 137 },
          // "@media(min-width:1600px)": {
          //   bottom: 230,
          // },
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: {
                xs: "0.6rem",
                sm: "0.8rem",
                md: "1rem",
                lg: "2rem",
                xl: "2.5rem",
              },
              height: {
                xs: "2px",
                sm: "4px",
                md: "6px",
                lg: "8px",
                xl: "12px",
              },
              backgroundColor: currentIndex === index ? "white" : "gray",
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default ImageCarousel;
