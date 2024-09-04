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
          borderRadius: "1rem",
          marginTop: "5rem",
        }}
      >
        <Player />
      </Box>
    </>
  );
};

export default Footer;
