import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Episode, Show } from "./types";
import axios from "axios";

export interface PodcastState {
  searchResults: Show[]; // 存searchShows匹配的結果
  selectedShows: Show[]; // Modal內挑選要添加到分類的
  currentShow: Show | null; //當前的Show
  activeEpisodeId: string | null; // 標示active episode
  currentPlayer: Episode | null; // 當前播放的 episode
  loading: boolean;
  error: string | null | undefined;
  // 管理 新增|編輯|刪除 分類
  isActionModalOpen: boolean;
  currentAction: string | null; // 當前的Action
  // 是否打開Search Modal
  isSearchModalOpen: boolean;
}

const initialState: PodcastState = {
  searchResults: [],
  selectedShows: [],
  activeEpisodeId: null,
  currentPlayer: null,
  currentShow: null,
  loading: false,
  error: null,
  isActionModalOpen: false,
  currentAction: null,
  isSearchModalOpen: false,
};

// Spotify API 基礎 URL
const spotifyBaseUrl = import.meta.env.VITE_SPOTIFY_API_BASE_URI;

// Helper function: 獲取 accessToken
const getSpotifyAccessToken = () => localStorage.getItem("access_token");

// 搜索 Shows
export const searchShows = createAsyncThunk(
  "spotify/searchShows",
  async (query: string) => {
    const token = getSpotifyAccessToken();
    const url = `${spotifyBaseUrl}/v1/search`;
    const params = {
      q: query,
      type: "show",
      limit: 15,
    };
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data.shows.items;
  }
);

// // 獲取指定的 Show 資訊
// export const fetchShow = createAsyncThunk(
//   "spotify/fetchShowWithEpisodes",
//   async (showId: string) => {
//     const token = getSpotifyAccessToken();
//     const uri = `${spotifyBaseUrl}/v1/shows/${showId}`;
//     const response = await axios.get(uri, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   }
// );

// // 獲取指定Episode 資訊
// export const fetchEpisodeDetail = createAsyncThunk(
//   "podcast/fetchEpisodeDetail",
//   async (episodeId: string) => {
//     const token = getSpotifyAccessToken();
//     const url = `${spotifyBaseUrl}/v1/episodes/${episodeId}`;
//     const response = await axios.get(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   }
// );

// 獲取指定的 show 裡面的 Episodes
export const fetchShowEpisodes = createAsyncThunk(
  "podcast/fetchShowEpisodes",
  async (showId: string, { rejectWithValue }) => {
    const token = getSpotifyAccessToken();
    const url = `${spotifyBaseUrl}/v1/shows/${showId}/episodes`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error("獲取節目單集失敗: ", error);
      return rejectWithValue(error);
    }
  }
);

// Podcast Slice
const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    // // 移除指定 episodeId 的詳細資料
    // removeEpisodeDetail(state, action: PayloadAction<string>) {
    //   // 移除指定 episodeId 的詳細資料
    //   state.episodeDetail = state.episodeDetail?.filter(
    //     (episode) => episode.id !== action.payload
    //   );
    // },

    // // Card 渲染
    // setShowsDetail(state, action: PayloadAction<Show[]>) {
    //   state.showsDetail = action.payload;
    // },
    // 播放器 相關
    setCurrentPlayer(state, action: PayloadAction<Episode>) {
      state.currentPlayer = action.payload;
    },
    clearCurrentPlayer(state) {
      state.currentPlayer = null;
    },

    // MoreModal 相關
    setCurrentShow(state, action: PayloadAction<Show | null>) {
      state.currentShow = action.payload;
    },
    setActiveEpisode(state, action: PayloadAction<string>) {
      state.activeEpisodeId = action.payload;
    },
    clearActiveEpisode(state) {
      state.activeEpisodeId = null;
    },

    // SearchModal 相關
    setIsSearchModalOpen(state, action: PayloadAction<boolean>) {
      state.isSearchModalOpen = action.payload;
    },
    setSelectedShows(state, action: PayloadAction<Show[]>) {
      state.selectedShows = action.payload.id;
    },
    toggleSelectShow(state, action: PayloadAction<Show>) {
      const isAlreadySelected = state.selectedShows.some(
        (selectedShow) => selectedShow.id === action.payload.id
      );
      if (isAlreadySelected) {
        // 如果已經選中，則取消選中
        state.selectedShows = state.selectedShows.filter(
          (selectedShow) => selectedShow.id !== action.payload.id
        );
      } else {
        // 如果沒有選中，則添加
        state.selectedShows.push(action.payload);
      }
    },
    clearSelectedShows(state) {
      state.selectedShows = [];
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },

    // ActionModal 相關
    setCurrentAction(state, action: PayloadAction<string | null>) {
      state.currentAction = action.payload;
    },
    setIsActionModalOpen(state, action: PayloadAction<boolean>) {
      state.isActionModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   // 處理 fetchShow
    //   .addCase(fetchShow.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchShow.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.currentShow = action.payload;
    //   })
    //   .addCase(fetchShow.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });

    // builder
    //   // 處理 fetchEpisodeDetail
    //   .addCase(fetchEpisodeDetail.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchEpisodeDetail.fulfilled, (state, action) => {
    //     // 檢查 episode 是否已經存在
    //     const episodeExists = state.episodeDetail.some(
    //       (episode) => episode.id === action.payload.id
    //     );
    //     // 如果不存在才推入
    //     if (!episodeExists) {
    //       state.episodeDetail.push(action.payload);
    //     }
    //   })
    //   .addCase(fetchEpisodeDetail.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });

    builder
      .addCase(searchShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchShows.fulfilled, (state, action) => {
        state.loading = false;
        // 保存搜索結果至searchResults
        state.searchResults = action.payload;
      })
      .addCase(searchShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "搜尋失敗";
      });

    // 處理 fetchShowEpisodes
    builder
      .addCase(fetchShowEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        const episodes = action.payload;
        if (state.currentShow) {
          state.currentShow.episodes = episodes;
        }
      })
      .addCase(fetchShowEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  // setShowsDetail,
  setIsActionModalOpen,
  setCurrentAction,
  setCurrentShow,
  setActiveEpisode,
  clearActiveEpisode,
  setIsSearchModalOpen,
  setSelectedShows,
  toggleSelectShow,
  clearSelectedShows,
  clearSearchResults,
  setCurrentPlayer,
  clearCurrentPlayer,
} = podcastSlice.actions;

export default podcastSlice.reducer;
