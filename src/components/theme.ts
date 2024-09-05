import { createTheme } from "@mui/material/styles";

const brandColor = "#FF7F50";
const secondaryColor = "#30A9DE";
const positiveColor = "#4CAF50";
const negativeColor = "#FF5050";
const cautionColor = "#F6AE2D";
const imageCarouselBackGround = "#23262F";

// 擴展 PaletteOptions 類型
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      imageCarouselBackGround: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      imageCarouselBackGround?: string;
    };
  }
}

// 自定義主題
const theme = createTheme({
  palette: {
    primary: {
      main: brandColor,
    },
    secondary: {
      main: secondaryColor,
    },
    success: {
      main: positiveColor,
    },
    error: {
      main: negativeColor,
    },
    warning: {
      main: cautionColor,
    },
    custom: {
      imageCarouselBackGround: imageCarouselBackGround,
    },
  },
  typography: {
    fontFamily: "Noto Sans TC",
    h6: {
      fontWeight: 700,

      fontSize: "1.25rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
});

export default theme;
