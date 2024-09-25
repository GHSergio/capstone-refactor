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
      "@media (max-width:320px)": {
        fontSize: "0.9rem",
      },
      "@media (min-width:375px)": {
        fontSize: "0.9rem",
      },
      "@media (min-width:425px)": {
        fontSize: "0.9rem",
      },
      "@media (min-width:600px)": {
        fontSize: "0.8em",
      },
      "@media (min-width:900px)": {
        fontSize: "1.1rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:1600px)": {
        fontSize: "2rem",
      },
    },
    body1: {
      fontWeight: 400,
      "@media (max-width:320px)": {
        fontSize: "0.8rem",
      },
      "@media (min-width:375px)": {
        fontSize: "0.8rem",
      },
      "@media (min-width:600px)": {
        fontSize: "0.8em",
      },
      "@media (min-width:900px)": {
        fontSize: "1rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "1.2rem",
      },
      "@media (min-width:1600px)": {
        fontSize: "1.5rem",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    // searchBar
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#F5F5F5",
          borderRadius: "1rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // 移除邊框顏色
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // 移除 hover 狀態下的邊框顏色
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // 移除 focused 狀態下的邊框顏色
          },
        },
      },
    },
    // scrollbar
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar": {
            width: "0.5rem",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#C1C9D3",
            borderRadius: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
            cursor: "pointer",
          },
        },
      },
    },
  },
});

export default theme;
