import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import spotifyIcon from "../../assets/spotifyIcon.png";

const Player = () => {
  const { currentPlayer } = useSelector((state: RootState) => state.podcast);

  if (!currentPlayer) {
    return (
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "20vw",
            sm: "15vw",
            md: "15vw",
            xl: "15vw",
          },
          "@media (max-width:321px)": {
            height: "25vw",
          },
          "@media (min-width:321px) and (max-width:376px)": {
            height: "20vw",
          },
          "@media (min-width:376px) and (max-width:600px)": {
            height: "18vw",
          },
          "@media (min-width:1600px)": {
            height: "10vw",
          },
          bgcolor: "#91B4C1",
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={spotifyIcon}
          sx={{ position: "absolute", width: "1.35rem", top: 10, right: 10 }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">尚未選擇單集</Typography>
        </Box>
      </Box>
    );
  }

  const { id } = currentPlayer;

  return (
    <>
      {/* 嵌入 Spotify 播放器 */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "0.1rem",
        }}
      >
        <iframe
          src={`https://open.spotify.com/embed/episode/${id}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </Box>
    </>
  );
};

export default Player;
