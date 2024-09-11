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
  createUserPlaylist,
  editUserPlaylistName,
  deleteUserPlaylist,
} from "../../slice/userSlice";
import CloseIcon from "@mui/icons-material/Close";

const ActionModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isActionModalOpen, currentAction } = useSelector(
    (state: RootState) => state.podcast
  );
  const { currentListId, playlists } = useSelector(
    (state: RootState) => state.user
  );

  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    dispatch(setIsActionModalOpen(false));
    dispatch(setCurrentAction(null));
    setInputValue("");
  };

  const handleConfirm = () => {
    if (!currentListId) {
      return;
    }

    if (currentAction === "add") {
      // 新增分類的邏輯
      dispatch(createUserPlaylist(inputValue));
    } else if (currentAction === "edit" && currentListId) {
      // 編輯分類的邏輯
      dispatch(
        editUserPlaylistName({ playlistId: currentListId, newName: inputValue })
      );
    } else if (currentAction === "delete") {
      // 刪除分類的邏輯
      if (currentListId) {
        dispatch(deleteUserPlaylist(currentListId));
      }
    }
    handleClose();
  };

  const currentList = playlists?.find((list) => list.id === currentListId);

  return (
    <Modal open={isActionModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          height: "35%",
          bgcolor: "#FFFFFF",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            {currentAction === "edit" && "編輯名稱"}
            {currentAction === "add" && "新增名稱"}
            {currentAction === "delete" && "刪除分類"}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 15 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ marginY: "1rem" }} />

        {/* Main */}
        <Box sx={{ flexGrow: 1 }}>
          {currentAction === "edit" && (
            <TextField
              fullWidth
              label={currentList?.name}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentList?.name || ""}
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
            <Typography>您確定要刪除 {currentList?.name} 分類嗎？</Typography>
          )}
        </Box>

        <Divider sx={{ marginY: "1rem" }} />

        {/* Footer */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              padding: "0 3.5rem",
              borderRadius: "0.5rem",
              color: "#111111",
            }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            // disabled={currentAction !== "delete" && !inputValue.trim()}
            disabled={!inputValue && currentAction !== "delete"}
            sx={{
              padding: "0 3.5rem",
              borderRadius: "0.5rem",
              color: "#FFFFFF",
            }}
          >
            {currentAction === "delete" ? "刪除" : "保存"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ActionModal;
