import Player from "./Player";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        width={312}
        height={596}
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "16px 16px 40px 0px #C7C7C73D",
          filter: "blur(24%)",
          opacity: 0.7,
          borderRadius: "1rem",
          marginTop: "6rem",
        }}
      >
        <Player />
      </Box>
    </>
  );
};

export default Footer;
