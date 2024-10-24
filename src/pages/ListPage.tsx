import React, { useEffect, useCallback } from "react";
import {
  Grid,
  Box,
  Typography,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import listNull from "../assets/listNull.png";
import CardComponent from "../components/CardComponent";
import MoreModal from "../components/modals/MoreModal";
import SearchModal from "../components/modals/SearchModal";
import ActionModal from "../components/modals/ActionModal";
import AlertComponent from "../components/AlertComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  setIsSearchModalOpen,
  setCurrentShow,
  setIsMoreModalOpen,
} from "../slice/podcastSlice";
import { fetchShow, setShowsDetail } from "../slice/userSlice";
import { Show } from "../slice/types";

const ListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentCategoryId = useSelector(
    (state: RootState) => state.user.currentCategoryId
  );
  const userCategories = useSelector(
    (state: RootState) => state.user.userCategories
  );
  const showsDetail = useSelector((state: RootState) => state.user.showsDetail);
  const loading = useSelector((state: RootState) => state.user.loading);
  const isMoreModalOpen = useSelector(
    (state: RootState) => state.podcast.isMoreModalOpen
  );

  // 取得當前分類的 savedShows (只保存了 show 的 id)
  const currentCategory = userCategories?.find(
    (category) => category.id === currentCategoryId
  );

  // 當分類改變時，獲取該分類下所有 shows 的詳細資料，並更新 showsDetail
  useEffect(() => {
    const fetchShowsDetails = async () => {
      if (currentCategory?.savedShows) {
        const showsData: Show[] = [];
        const promises = currentCategory.savedShows.map((show) =>
          dispatch(fetchShow(show.id)).unwrap()
        );
        // 使用 Promise.all 並行處理所有請求
        const results = await Promise.all(promises);
        showsData.push(...results);

        // console.log("獲取的Shows Detail:", showsData);
        dispatch(setShowsDetail(showsData));
      }
    };

    fetchShowsDetails();
  }, [dispatch, currentCategory?.savedShows]);

  // 控制 MoreModal 的狀態
  const handleMoreClick = useCallback(
    (show: Show) => {
      dispatch(setCurrentShow(show));
      dispatch(setIsMoreModalOpen(true));
    },
    [dispatch]
  );

  const handleMoreClose = useCallback(() => {
    dispatch(setIsMoreModalOpen(false));
    dispatch(setCurrentShow(null));
  }, [dispatch]);

  // 搜索按鈕的處理函數
  const handleClickSearch = useCallback(() => {
    dispatch(setIsSearchModalOpen(true));
  }, [dispatch]);

  if (!currentCategory) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: { xs: "4rem", sm: "4rem", md: "4rem", xl: "10rem" },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "0.8rem",
              sm: "1rem",
              md: "1.25rem",
              xl: "1.5rem",
            },
            "@media (min-width:1600px)": {
              fontSize: "2.5rem",
            },
          }}
        >
          請選擇一個分類。
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          height: "98%",
          margin: { xs: "3rem auto", sm: "0 auto" },
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          alignContent: "flex-start",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: { xs: "0.2rem", sm: "0.3rem", md: "0.4rem", xl: "0.5rem" },
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
        }}
      >
        {/* 顯示卡片 */}
        {loading ? (
          <>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto 0",
              }}
            >
              <Typography variant="h6" sx={{ ml: 2 }}>
                載入中...
              </Typography>
              <CircularProgress color="inherit" />
            </Box>
          </>
        ) : showsDetail.length > 0 ? (
          showsDetail.map((show) => (
            <Grid
              item
              key={show.id}
              sx={{
                maxWidth: {
                  xs: "180px",
                  sm: "150px",
                  md: "155px",
                  lg: "180px",
                },
                borderRadius: "0.5rem",
                boxShadow: "0px 0px 2px 5px #C7C7C73D",
                margin: 0.5,
                padding: 2,
                overflow: "hidden",
                "@media (max-width:320px)": {
                  maxWidth: "120px",
                },
                "@media (min-width:321px) and (max-width:376px)": {
                  maxWidth: "150px",
                },
                "@media(min-width:376px) and (max-width:600px)": {
                  maxWidth: "170px",
                },
                "@media (min-width:1600px)": {
                  maxWidth: "245px",
                },
              }}
            >
              <CardComponent
                image={show.images?.[0]?.url || listNull}
                name={show.name}
                publisher={show.publisher || "未知"}
                onMoreClick={() => handleMoreClick(show)}
              />
            </Grid>
          ))
        ) : (
          <Grid
            container
            sx={{
              width: "100%",
              height: "100%",
              margin: "0 auto",
              justifyContent: "center",
              alignContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                image={listNull}
                sx={{
                  margin: "0 auto",
                  width: { xs: "4rem", sm: "5rem", md: "6rem", lg: "7rem" },
                  "@media(min-width:1600px)": {
                    fontSize: "3rem",
                    width: "8rem",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "#718096",
                  margin: "1rem 0",
                }}
              >
                您尚未加入任何曲目，可以點擊按鈕新增！
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#FF7F50",
                  borderRadius: "8px",
                  padding: {
                    xs: "0.5rem 1rem",
                    sm: "0.5rem 2rem",
                    md: "0.7rem 3rem",
                    lg: "0.7rem 4rem",
                  },
                  "@media(min-width:1600px)": {
                    padding: "1rem",
                    width: "15rem",
                  },
                  "&:hover": {
                    backgroundColor: "#FF7F50",
                  },
                }}
                onClick={handleClickSearch}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.4rem",
                      sm: "0.6rem",
                      md: "0.8rem",
                      lg: "1rem",
                    },
                    "@media(min-width:1600px)": {
                      fontSize: "1.5rem",
                    },
                    color: "#FFFFFF",
                  }}
                >
                  新增 Podcast
                </Typography>
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* 顯示 MoreModal */}
      {isMoreModalOpen && (
        <MoreModal isOpen={isMoreModalOpen} onClose={handleMoreClose} />
      )}
      <SearchModal />
      <ActionModal />
      {/* MUI Alert 提示 */}
      <AlertComponent />
    </>
  );
};

export default ListPage;
