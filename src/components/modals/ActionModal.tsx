import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  setIsActionModalOpen,
  setCurrentAction,
} from "../../slice/podcastSlice";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../slice/userSlice";
import CloseIcon from "@mui/icons-material/Close";

const ActionModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isActionModalOpen, currentAction } = useSelector(
    (state: RootState) => state.podcast
  );
  const { currentCategoryId, userCategories } = useSelector(
    (state: RootState) => state.user
  );

  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    dispatch(setIsActionModalOpen(false));
    dispatch(setCurrentAction(null));
    setInputValue("");
  };

  const handleConfirm = () => {
    if (!currentCategoryId) {
      return;
    }

    if (currentAction === "add") {
      // 新增分類的邏輯
      dispatch(createCategory(inputValue));
    } else if (currentAction === "edit" && currentCategoryId) {
      // 編輯分類的邏輯
      dispatch(
        updateCategory({
          categoryId: currentCategoryId,
          newName: inputValue,
        })
      );
    } else if (currentAction === "delete") {
      // 刪除分類的邏輯
      if (currentCategoryId) {
        dispatch(deleteCategory(currentCategoryId));
      }
    }
    handleClose();
  };

  const currentList = userCategories?.find(
    (list) => list.id === currentCategoryId
  );

  const buttonStyled = {
    padding: { xs: "", sm: "0 1rem", md: "0 2rem", lg: "0 3.5rem" },
    borderRadius: "0.5rem",
  };

  const textStyled = {
    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.8rem", lg: "1rem" },

    "@media (max-width:320px)": {
      fontSize: "0.3rem",
    },
    "@media (min-width:321px) and (max-width:376px)": {
      fontSize: "0.4rem",
    },
    "@media(min-width:376px) and (max-width:600px)": {
      fontSize: "0.5rem",
    },
  };

  const searchStyled = {
    fontSize: {
      xs: "0.4rem",
      sm: "0.6rem",
      md: "0.8rem",
      lg: "1rem",
    },
  };

  return (
    <Modal open={isActionModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "60%", sm: "40%" },
          height: "45%",
          bgcolor: "#FFFFFF",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          p: { xs: 1.5, md: 2, lg: 3 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                xs: "0.6rem",
                sm: "0.8rem",
                md: "1rem",
                lg: "1.25rem",
              },
            }}
          >
            {currentAction === "edit" && "編輯名稱"}
            {currentAction === "add" && "新增名稱"}
            {currentAction === "delete" && "刪除分類"}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 5 }}
          >
            <CloseIcon
              sx={{
                fontSize: {
                  xs: "0.6rem",
                  sm: "0.8rem",
                  md: "1rem",
                  lg: "1.25rem",
                },
              }}
            />
          </IconButton>
        </Box>

        <Divider sx={{ marginY: { xs: "0.5rem", md: "1rem" } }} />

        {/* Main */}
        <Box sx={{ flex: 1, p: 0 }}>
          {currentAction === "edit" && (
            <TextField
              fullWidth
              placeholder={currentList?.name || ""}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // 調整input內部樣式
              InputProps={{
                sx: {
                  "& input": {
                    paddingY: {
                      xs: "0.2rem",
                      sm: "0.4rem",
                      md: "0.6rem",
                      lg: "1rem",
                    },
                    ...searchStyled,
                  },
                  "& input::placeholder": {
                    ...searchStyled,
                    color: "gray",
                  },
                },
              }}
            />
          )}

          {currentAction === "add" && (
            <TextField
              fullWidth
              label="新增分類名稱"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="請輸入分類名稱"
            />
          )}

          {currentAction === "delete" && (
            <Typography sx={{ ...searchStyled }}>
              您確定要刪除 {currentList?.name} 分類嗎？
            </Typography>
          )}
        </Box>

        <Divider sx={{ marginY: { xs: "0.5rem", md: "1rem" } }} />

        {/* Footer */}
        <Box p={0} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              mr: { xs: 1, md: 2 },
              p: 0,
              color: "#111111",
              ...buttonStyled,
            }}
          >
            <Typography sx={{ ...textStyled }}>取消</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            disabled={!inputValue.trim() && currentAction !== "delete"}
            sx={{
              color: "#FFFFFF",
              ...buttonStyled,
            }}
          >
            <Typography sx={{ ...textStyled }}>
              {" "}
              {currentAction === "delete" ? "刪除" : "保存"}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ActionModal;
