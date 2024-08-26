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
  // typography: {
  //   fontFamily:
  //     '"Roboto", "Helvetica", "Arial","Noto Sans TC" "Poppins",sans-serif',
  //   h5: {
  //     fontFamily: '"Noto Sans TC", sans-serif',
  //     fontWeight: 700,
  //   },
  //   body2: {
  //     fontFamily: '"Poppins", sans-serif',
  //     fontWeight: 400,
  //   },
  // },
});

export default theme;
