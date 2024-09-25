import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Episode, Show } from "./types";
import axios from "axios";

export interface PodcastState {
  searchResults: Show[]; // 存searchShows匹配的結果
  selectedShows: Show[]; // Modal內挑選要添加到分類的
  currentShow: Show | null; //當前的Show
  activeEpisodeId: string | null; // 標示active episode
  deviceId: string | null; // 設備 ID
  currentPlayer: Episode | null; // 當前播放的 episode
  isPlaying: boolean;
  loading: boolean;
  error: string | null | undefined;
  // 是否打開 Modal
  isMoreModalOpen: boolean;
  isSearchModalOpen: boolean;
  // 管理 新增|編輯|刪除 分類
  isActionModalOpen: boolean;
  currentAction: string | null; // 當前的Action
}

const initialState: PodcastState = {
  searchResults: [],
  selectedShows: [],
  activeEpisodeId: null,
  deviceId: null,
  currentPlayer: null,
  isPlaying: false,
  currentShow: null,
  loading: false,
  error: null,
  isMoreModalOpen: false,
  isActionModalOpen: false,
  currentAction: null,
  isSearchModalOpen: false,
};

// Spotify API 基礎 URL
const spotifyBaseUrl = import.meta.env.VITE_SPOTIFY_API_BASE_URI;

// // Helper function: 獲取 accessToken
// const getSpotifyAccessToken = () => localStorage.getItem("access_token");

// 搜索 Shows
export const searchShows = createAsyncThunk(
  "spotify/searchShows",
  async (query: string) => {
    const token = localStorage.getItem("access_token");
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

// 獲取指定的 show 裡面的 Episodes
export const fetchShowEpisodes = createAsyncThunk(
  "podcast/fetchShowEpisodes",
  async (showId: string, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
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

// 獲取spotify devices
export const getSpotifyDevices = createAsyncThunk(
  "user/getSpotifyDevices",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    const url = `${spotifyBaseUrl}/v1/me/player/devices`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("取得設備: ", response);
      // 查找活動中的設備
      return response.data.devices.find((device: any) => device.is_active);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response);
      }
    }
  }
);

// 控制設備播放指定的Episode
export const playEpisodeOnSpotify = createAsyncThunk(
  "user/playEpisodeOnSpotify",
  async (
    {
      deviceId,
      episodeUri,
    }: {
      deviceId: string;
      episodeUri: string;
    },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("access_token");
    const url = `${spotifyBaseUrl}/v1/me/player/play?device_id=${deviceId}`;
    const bodyParameters = {
      uris: [episodeUri],
    };
    try {
      const response = await axios.put(url, bodyParameters, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("正在播放節目", response);
      return response.data; // 假設成功時返回的資料
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // 返回可序列化的數據，過濾掉非序列化的部分
        return rejectWithValue({
          status: error.response.status,
          data: error.response.data,
        });
      }
      // 如果不是 Axios 錯誤
      return rejectWithValue({
        status: 500,
        message: "伺服器錯誤",
      });
    }
  }
);

// Podcast Slice
const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    // 播放器 相關
    setCurrentPlayer(state, action: PayloadAction<Episode>) {
      state.currentPlayer = action.payload;
    },
    clearCurrentPlayer(state) {
      state.currentPlayer = null;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },

    // MoreModal 相關
    setIsMoreModalOpen(state, action: PayloadAction<boolean>) {
      state.isMoreModalOpen = action.payload;
    },
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
      state.selectedShows = action.payload;
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

    // // 獲取Spotify設備成功時，保存設備ID
    // builder
    //   .addCase(getSpotifyDevices.fulfilled, (state, action) => {
    //     state.deviceId = action.payload.id; // 存儲設備 ID
    //   })
    //   .addCase(getSpotifyDevices.rejected, (state, action) => {
    //     state.error = action.error.message || "獲取設備失敗";
    //   });

    // // 播放Episode
    // builder
    //   .addCase(playEpisodeOnSpotify.fulfilled, (state, action) => {
    //     if (action.payload) {
    //       state.currentPlayer = action.payload;
    //     }
    //   })
    //   .addCase(playEpisodeOnSpotify.rejected, (state, action) => {
    //     const payload = action.payload as
    //       | { status?: number; data?: any }
    //       | undefined;
    //     const status = payload?.status;
    //     const data = payload?.data;
    //     if (status === 403) {
    //       state.error = "無法播放，請確認您的 Spotify Premium 資格。";
    //     } else if (status === 401) {
    //       state.error = "驗證失敗，請重新登入。";
    //     } else {
    //       state.error = data?.message || "播放時發生未知錯誤";
    //     }
    //   });
  },
});

export const {
  setIsMoreModalOpen,
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
  setIsPlaying,
} = podcastSlice.actions;

export default podcastSlice.reducer;
