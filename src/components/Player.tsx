import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import spotifyIcon from "../assets/spotifyIcon.png";

const Player = () => {
  const { currentPlayer } = useSelector((state: RootState) => state.podcast);

  if (!currentPlayer) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#91B4C1",
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">尚未選擇單集</Typography>
      </Box>
    );
  }

  const { id, name, image, description, release_date, duration_ms } =
    currentPlayer;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#91B4C1",
          borderRadius: "1rem",
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
            width: "85%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <Box
            mt={5}
            component="img"
            src={image}
            sx={{
              width: "184px",
              height: "184px",
              borderRadius: "0.5rem",
            }}
          ></Box>
          {/* Title & Release */}
          <Box mt={2}>
            <Typography sx={{ fontSize: "0.9rem" }}>{name}</Typography>
            <Typography sx={{ fontSize: "0.7rem" }}>{release_date}</Typography>
          </Box>
          {/* Player */}
          <Box mt={1}>操控區</Box>
        </Box>
      </Box>
    </>
  );
};

export default Player;
