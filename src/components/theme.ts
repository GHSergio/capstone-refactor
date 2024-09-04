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
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: {
  //       body: {
  //         "&::-webkit-scrollbar": {
  //           width: "0.5rem", // 滾動條寬度
  //         },
  //         "&::-webkit-scrollbar-track": {
  //           backgroundColor: "#f1f1f1",
  //           borderRadius: "0.5rem", // 背景圓角
  //         },
  //         "&::-webkit-scrollbar-thumb": {
  //           backgroundColor: "#C1C9D3",
  //           borderRadius: "0.5rem", // 滑塊圓角
  //         },
  //         "&::-webkit-scrollbar-thumb:hover": {
  //           backgroundColor: "#555", // 滑塊懸停顏色
  //           cursor: "pointer",
  //         },
  //       },
  //     },
  //   },
  // },
});

export default theme;
