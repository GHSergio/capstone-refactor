import { Box, Typography } from "@mui/material";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import dropdown from "../assets/dropdown.png";

const User = () => {
  const { userProfile } = useSelector((state: RootState) => state.user);

  console.log(userProfile);
  // 檢查 userProfile 是否存在
  const display_name = userProfile?.display_name ?? "未知"; // 如果 userProfile 為 undefined，顯示預設文字
  const images = userProfile?.images?.[0]?.url || ""; // 如果沒有圖片，顯示空字串

  return (
    <>
      <Box
        sx={{
          width: "184px",
          height: "48px",
          bgcolor: "#FAFAFA",
          boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "5rem",
          display: "flex",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              width: "48px",
              height: "48px",
              borderRadius: "5rem",
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            {images && <img src={images} alt={display_name} />}{" "}
            {/* 如果有圖片則顯示 */}
          </Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "0.8rem", marginLeft: "1rem" }}
          >
            {display_name}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "16px",
            height: "16px",
            position: "absolute",
            top: "50%",
            right: 15,
            transform: "translate(0,-50%)",
          }}
          component="img"
          src={dropdown}
        ></Box>
      </Box>
    </>
  );
};

export default User;
