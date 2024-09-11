import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Show, Episode } from "./types";
import axios from "axios";

export interface PodcastState {
  activeEpisodeId: string | null;
  currentPlayer: Episode | null;
  searchResults: Show[];
  currentShow: Show | null;
  loading: boolean;
  error: string | null | undefined;
  // 管理 新增|編輯|刪除 分類
  isActionModalOpen: boolean;
  currentAction: string | null;
  // 是否打開Search Modal
  isSearchModalOpen: boolean;
  currentShowId: string | null;
  selectedShows: Show[];
}

const initialState: PodcastState = {
  searchResults: [],
  selectedShows: [],
  activeEpisodeId: null,
  currentPlayer: null,
  currentShow: null,
  currentShowId: null,
  loading: false,
  error: null,
  isActionModalOpen: false,
  currentAction: null,
  isSearchModalOpen: false,
};

// Spotify API 基礎 URL
const baseUrl = import.meta.env.VITE_SPOTIFY_API_BASE_URI;

// Helper function: 獲取 accessToken
const getSpotifyAccessToken = () => localStorage.getItem("access_token");

// 搜索 Shows
export const searchShows = createAsyncThunk(
  "spotify/searchShows",
  async (query: string) => {
    const token = getSpotifyAccessToken();
    const url = `${baseUrl}/v1/search`;
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
    console.log(response);
    return response.data.shows.items;
  }
);

// 獲取指定的 Show 和 Episode
export const fetchShowWithEpisodes = createAsyncThunk(
  "spotify/fetchShowWithEpisodes",
  async (showId: string) => {
    const token = getSpotifyAccessToken();
    const uri = `${baseUrl}/v1/shows/${showId}`;
    const response = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    // 播放器 相關
    // 設置當前播放的 Episode
    setCurrentPlayer(state, action: PayloadAction<Episode>) {
      state.currentPlayer = action.payload;
    },
    // 清空當前播放的 Episode
    clearCurrentPlayer(state) {
      state.currentPlayer = null;
    },

    // MoreModal 相關
    setCurrentShow(state, action: PayloadAction<string | null>) {
      state.currentShowId = action.payload ?? null;
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
    clearSelectedShows(state) {
      state.selectedShows = [];
    },

    // ActionModal 相關
    setCurrentAction(state, action: PayloadAction<string | null>) {
      state.currentAction = action.payload;
    },
    setIsActionModalOpen(state, action: PayloadAction<boolean>) {
      state.isActionModalOpen = action.payload;
    },

    toggleSelectShow(state, action: PayloadAction<Show>) {
      const isAlreadySelected = state.selectedShows.some(
        (selectedShow) => selectedShow.id === action.payload.id
      );
      if (isAlreadySelected) {
        // 如果已經選中，則移除該 show
        state.selectedShows = state.selectedShows.filter(
          (selectedShow) => selectedShow.id !== action.payload.id
        );
      } else {
        // 否則將該 show 添加到 selectedShows
        state.selectedShows.push(action.payload);
      }
    },
  },
  // 處理Async
  extraReducers: (builder) => {
    builder
      // 處理 fetchShowWithEpisodes
      .addCase(fetchShowWithEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowWithEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShow = action.payload;
      })
      .addCase(fetchShowWithEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // 處理 searchShows
      .addCase(searchShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchShows.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed";
      });
  },
});

export const {
  setIsActionModalOpen,
  setCurrentAction,

  setCurrentShow,
  setActiveEpisode,
  clearActiveEpisode,
  setIsSearchModalOpen,
  setSelectedShows,
  toggleSelectShow,
  clearSelectedShows,

  setCurrentPlayer,
  clearCurrentPlayer,
} = podcastSlice.actions;

export default podcastSlice.reducer;
