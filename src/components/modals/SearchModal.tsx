import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  // Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  setIsSearchModalOpen,
  toggleSelectShow,
  clearSelectedShows,
  clearSearchResults,
  searchShows,
} from "../../slice/podcastSlice";
import { addShowToCategory, setAlert } from "../../slice/userSlice";
import { Show } from "../../slice/types";
import AlertComponent from "../AlertComponent";
const SearchModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isSearchModalOpen, selectedShows, searchResults } = useSelector(
    (state: RootState) => state.podcast
  );
  const { currentCategoryId } = useSelector((state: RootState) => state.user);

  const [searchTerm, setSearchTerm] = useState("");

  // console.log("searchResults:", searchResults);
  // console.log("當前分類: ", currentCategoryId);
  // console.log("被選中的shows: ", selectedShows);

  // 清空 搜尋結果 & 挑中的shows
  const handleSearchModalClose = () => {
    dispatch(setIsSearchModalOpen(false));
    dispatch(clearSelectedShows());
    dispatch(clearSearchResults());
  };

  // 將選中的 shows 逐個 添加到當前 category
  const handleConfirmAdd = async () => {
    if (currentCategoryId && selectedShows.length > 0) {
      const alreadyExistsShows: string[] = []; // 保存已存在的節目名稱

      for (const show of selectedShows) {
        try {
          await dispatch(
            addShowToCategory({
              categoryId: currentCategoryId,
              showId: show.id,
            })
          ).unwrap();
        } catch (error: any) {
          // 如果是 409 錯誤，表示節目已經存在分類中
          if (error?.status === 409) {
            alreadyExistsShows.push(show.name || "Unknown Show");
          } else {
            // 處理其他錯誤，例如伺服器錯誤或其他
            console.error(`Error adding show ${show.name}:`, error);
          }
        }
      }

      // 如果有已存在的節目名稱，顯示提示
      if (alreadyExistsShows.length > 0) {
        dispatch(
          setAlert({
            open: true,
            message: `節目 "${alreadyExistsShows.join(", ")}" 已經存在於分類中`,
            severity: "info",
          })
        );
      }
      // 不論成功失敗 皆 關閉Modal 但會提示重複項目
      dispatch(setIsSearchModalOpen(false));
      dispatch(clearSelectedShows());
      dispatch(clearSearchResults());
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    // 調用 searchShows 進行 API 搜索
    if (keyword.length > 0) {
      dispatch(searchShows(keyword)); // 發送 API 搜索請求
    }
  };

  const handleShowSelect = (show: Show) => {
    // 選擇匹配的 show 並添加到 selectedShows
    dispatch(toggleSelectShow(show));
  };

  const isSelected = (show: Show) =>
    selectedShows.some((selectedShow) => selectedShow.id === show.id);

  const overFlowStyled = {
    WebkitLineClamp: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const searchStyled = {
    fontSize: {
      xs: "0.6rem",
      sm: "0.7rem",
      md: "1rem",
      lg: "1rem",
    },
  };

  const buttonStyled = {
    fontSize: {
      xs: "0.4rem",
      sm: "0.6rem",
      md: "0.8rem",
      lg: "1rem",
    },
  };

  return (
    <>
      <Modal open={isSearchModalOpen} onClose={handleSearchModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "#FFFFFF",
            boxShadow: "0px -10px 20px 0px #0000001F",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                width: "100%",
                fontSize: {
                  xs: "0.6rem",
                  sm: "0.8rem",
                  md: "1rem",
                  lg: "1.25rem",
                },
              }}
            >
              新增 Podcast
            </Typography>
            <IconButton
              onClick={handleSearchModalClose}
              sx={{ position: "absolute", right: 10 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ marginBottom: "0.5rem" }} />

          {/* SearchBar */}
          <Box
            sx={{
              p: { xs: 1, md: 2 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="輸入關鍵字..."
              value={searchTerm}
              onChange={handleSearchChange}
              // 調整input內部樣式
              InputProps={{
                sx: {
                  lineHeight: "30px",
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
                  },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    {/* 調整icon樣式 */}
                    <SearchIcon
                      sx={{
                        color: "#ACADB9",
                        ...searchStyled,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Main */}
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexWrap: "wrap",
              p: 2,
              overflowY: "auto",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((show) => (
                <Grid
                  m={1}
                  key={show.id}
                  sx={{
                    width: { sm: "175px", md: "180px", lg: "170px" },
                    height: {
                      xs: "220px",
                      sm: "240px",
                      md: "240px",
                      lg: "240px",
                    },
                    "@media(min-width:1600px)": {
                      width: "200px",
                      height: "250px",
                    },
                    borderRadius: "0.5rem",
                    boxShadow: "0px 0px 2px 2px #C7C7C73D",
                    padding: 0,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isSelected(show) ? "2px solid #FF7F50" : "none",
                    "@media (max-width:320px)": {
                      maxWidth: "95px",
                      height: "150px",
                    },
                    "@media (min-width:321px) and (max-width:376px)": {
                      maxWidth: "110px",
                      height: "170px",
                    },
                    "@media(min-width:376px) and (max-width:600px)": {
                      maxWidth: "130px",
                      height: "190px",
                    },
                  }}
                  onClick={() => handleShowSelect?.(show)}
                >
                  {/* Card外框 */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#FFFFFF",
                      padding: { xs: "0.5rem", md: "0.8rem" },
                    }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        margin: "0 auto",
                        boxShadow: "none",
                        padding: "0",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={show?.images?.[0].url}
                        alt={show.name}
                        sx={{
                          borderRadius: "0.5rem",
                        }}
                      />
                      <CardContent
                        sx={{
                          padding: "0.1rem 0",
                        }}
                      >
                        {/* Podcast頻道名稱 */}
                        <Tooltip title={show.name} arrow>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              fontSize: "0.9rem",
                              ...overFlowStyled,
                            }}
                          >
                            {show.name}
                          </Typography>
                        </Tooltip>

                        {/* Podcast頻道作者 */}
                        <Tooltip title={show.publisher} arrow>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontSize: "0.75rem",
                              ...overFlowStyled,
                            }}
                          >
                            {show.publisher}
                          </Typography>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography>沒有匹配的結果</Typography>
            )}
          </Box>

          <Divider />

          {/* Footer */}
          <Box
            sx={{
              p: { xs: 1, md: 2 },
              bgcolor: "#F6F7F8",
              display: "flex",
              justifyContent: "flex-end",
              boxShadow: "0px -10px 20px 0px #0000001F",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleSearchModalClose}
              sx={{ mr: { xs: 1, md: 2 }, p: 0 }}
            >
              <Typography sx={{ ...buttonStyled }}>取消</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmAdd}
              disabled={selectedShows.length === 0}
            >
              <Typography sx={{ ...buttonStyled }}>確認新增</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
      <AlertComponent />
    </>
  );
};

export default SearchModal;
