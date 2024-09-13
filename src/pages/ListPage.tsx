import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, CardMedia, Button } from "@mui/material";
import listNull from "../assets/listNull.png";
import CardComponent from "../components/CardComponent";
import MoreModal from "../components/modals/MoreModal";
import SearchModal from "../components/modals/SearchModal";
import ActionModal from "../components/modals/ActionModal";
import AlertComponent from "../components/AlertComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setIsSearchModalOpen, setCurrentShow } from "../slice/podcastSlice";
import { fetchShow, setShowsDetail } from "../slice/userSlice";
import { Show } from "../slice/types";

const ListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentCategoryId, userCategories, showsDetail, loading } =
    useSelector((state: RootState) => state.user);

  // const {} = useSelector((state: RootState) => state.podcast);

  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

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

        console.log("獲取的Shows Detail:", showsData);
        dispatch(setShowsDetail(showsData));
      }
    };

    fetchShowsDetails();
  }, [dispatch, currentCategory]);

  // 控制 MoreModal 的狀態
  const handleMoreClick = (show: Show) => {
    dispatch(setCurrentShow(show));
    setIsMoreModalOpen(true);
  };

  const handleMoreClose = () => {
    setIsMoreModalOpen(false);
    dispatch(setCurrentShow(null));
  };

  // 搜索按鈕的處理函數
  const handleClickSearch = () => {
    dispatch(setIsSearchModalOpen(true));
  };

  if (!currentCategory) {
    return <div>請選擇一個分類。</div>;
  }

  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          margin: "0 auto",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
          alignContent: "flex-start",
        }}
      >
        {/* 顯示卡片 */}
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : showsDetail.length > 0 ? (
          showsDetail.map((show) => (
            <Grid
              item
              key={show.id}
              sx={{
                width: "178px",
                height: "266px",
                borderRadius: "0.5rem",
                boxShadow: "0px 0px 40px 10px #C7C7C73D",
                padding: 2,
                overflow: "hidden",
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
                sx={{ width: "3.5rem", margin: "0 auto" }}
              />
              <Typography
                sx={{ color: "#718096", fontSize: "1rem", margin: "1rem 0" }}
              >
                您尚未加入任何曲目，可以點擊按鈕新增！
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#FF7F50",
                  borderRadius: "8px",
                  padding: "0.7rem 3rem",
                }}
                onClick={handleClickSearch}
              >
                <Typography sx={{ fontSize: "1rem", color: "#FFFFFF" }}>
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
