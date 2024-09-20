import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import spotifyIcon from "../../assets/spotifyIcon.png";

const Player = () => {
  const { currentPlayer } = useSelector((state: RootState) => state.podcast);

  if (!currentPlayer) {
    return (
      <Box
        // mt={5}
        sx={{
          width: "100%",
          height: "18vh",
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
      <Box sx={{ width: "100%", height: "18vh" }}>
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
