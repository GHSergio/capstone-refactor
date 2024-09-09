import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Episode {
  id: string;
  name: string;
  image: string;
  description: string;
  release_date: string;
  duration_ms: number;
}

export interface Show {
  id: string;
  name: string;
  publish: string;
  image: string;
  description: string;
  episodes: Episode[];
}

export interface List {
  id: string;
  name: string;
  shows: Show[];
}

export interface PodcastState {
  shows: Show[]; // 虛擬的 Show 列表
  lists: List[];
  currentListId: string | null;
  favoriteEpisodes: Episode[];
  activeEpisodeId: string | null;
  currentPlayer: Episode | null;
  // 管理 新增|編輯|刪除 分類
  isActionModalOpen: boolean;
  currentAction: string | null;
  // 是否打開Search Modal
  isSearchModalOpen: boolean;
  currentShowId: string | null;
  filteredShows: Show[];
  selectedShows: Show[];
}

const initialState: PodcastState = {
  // 虛擬的 Show 列表
  shows: [
    {
      id: "1",
      name: "科技前瞻",
      publish: "2023-09-10",
      description: "科技發展與趨勢的前瞻分析",
      image: "https://via.placeholder.com/150",
      episodes: [
        {
          id: "episode1",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode2",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
        {
          id: "episode3",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode4",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
      ],
    },
    {
      id: "2",
      name: "深夜對談",
      publish: "2023-08-15",
      description: "在深夜裡分享思考與故事",
      image: "https://via.placeholder.com/150",
      episodes: [
        {
          id: "episode1",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode2",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
        {
          id: "episode3",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode4",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
      ],
    },
    {
      id: "3",
      name: "晨間新聞",
      publish: "2023-09-01",
      description: "每日最新新聞動態",
      image: "https://via.placeholder.com/150",
      episodes: [
        {
          id: "episode1",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode2",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
        {
          id: "episode3",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode4",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
      ],
    },
    {
      id: "4",
      name: "音樂合輯",
      publish: "2023-09-20",
      description: "讓我們用音樂開啟美好的一天",
      image: "https://via.placeholder.com/150",
      episodes: [
        {
          id: "episode1",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode2",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
        {
          id: "episode3",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode4",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
      ],
    },
    {
      id: "5",
      name: "運動世界",
      publish: "2023-07-30",
      description: "討論最新的體育賽事和趨勢",
      image: "https://via.placeholder.com/150",
      episodes: [
        {
          id: "episode1",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode2",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
        {
          id: "episode3",
          name: "早晨振奮音樂集",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。這是一個充滿活力的音樂集，適合開始你的一天。",
          release_date: "2024-09-10",
          duration_ms: 1800000,
        },
        {
          id: "episode4",
          name: "柔和的早晨旋律",
          image: "https://via.placeholder.com/100",
          description:
            "這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。這是一個溫暖的音樂集，適合在通勤路上聆聽。",
          release_date: "2024-09-11",
          duration_ms: 2400000,
        },
      ],
    },
  ],

  lists: [
    {
      id: "1",
      name: "通勤清單",
      shows: [],
    },
    {
      id: "2",
      name: "學習清單",
      shows: [],
    },
    {
      id: "3",
      name: "睡前清單",
      shows: [],
    },
  ],
  currentListId: "1", // 默認選中第一個清單
  favoriteEpisodes: [
    {
      id: "episode5",
      name: "AI的未來",
      image: "https://via.placeholder.com/100",
      description:
        "探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。探討人工智慧的未來發展趨勢。",
      release_date: "2024-09-14",
      duration_ms: 3000000,
    },
    {
      id: "episode6",
      name: "區塊鏈技術",
      image: "https://via.placeholder.com/100",
      description:
        "理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。理解區塊鏈的基本概念及其應用。",
      release_date: "2024-09-15",
      duration_ms: 2500000,
    },
  ],
  activeEpisodeId: null,
  currentPlayer: null,
  isActionModalOpen: false,
  currentAction: null,
  isSearchModalOpen: false,
  currentShowId: null,
  filteredShows: [],
  selectedShows: [],
};

export const fetchPodcast = createAsyncThunk(
  "podcast/fetchPodcast",
  async (podcastId: number) => {
    const response = await axios.get<PodcastState>(
      `/api/podcasts/${podcastId}`
    );
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
      state.currentShowId = action.payload;
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

    // SideBar 相關
    setCurrentListId(state, action: PayloadAction<string>) {
      state.currentListId = action.payload;
    },
    addList(state, action: PayloadAction<{ name: string }>) {
      //新增的清單ID為Lists長度+1
      const newId = (state.lists.length + 1).toString();

      state.lists.push({
        id: newId,
        name: action.payload.name,
        shows: [],
      });
    },
    editListName(
      state,
      action: PayloadAction<{ listId: string; newName: string }>
    ) {
      const { listId, newName } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.name = newName;
      }
    },
    removeList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
      if (state.currentListId === action.payload) {
        state.currentListId = state.lists.length > 0 ? state.lists[0].id : null;
      }
    },

    // List 相關
    addShowToList(
      state,
      action: PayloadAction<{ listId: string; shows: Show[] }>
    ) {
      const { listId, shows } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.shows.push(...shows);
      }
    },

    removeShowFromList(
      state,
      action: PayloadAction<{ listId: string; showId: string }>
    ) {
      const list = state.lists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.shows = list.shows.filter(
          (show) => show.id !== action.payload.showId
        );
      }
    },

    // 收藏 相關
    toggleFavorite(state, action: PayloadAction<Episode>) {
      const episode = action.payload;
      const isFavorite = state.favoriteEpisodes.some(
        (favEpisode) => favEpisode.id === episode.id
      );
      if (isFavorite) {
        // 如果已收藏，則取消收藏
        state.favoriteEpisodes = state.favoriteEpisodes.filter(
          (favEpisode) => favEpisode.id !== episode.id
        );
      } else {
        // 如果未收藏，則添加到收藏列表
        state.favoriteEpisodes.push(episode);
      }
    },

    // 搜索關鍵字並篩選 Shows
    filterShowsByKeyword(state, action: PayloadAction<string>) {
      const keyword = action.payload.toLowerCase();
      state.filteredShows = state.shows.filter(
        (show) =>
          show.name.toLowerCase().includes(keyword) ||
          show.description.toLowerCase().includes(keyword)
      );
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
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPodcast.fulfilled,
        (_, action: PayloadAction<PodcastState>) => {
          return action.payload;
        }
      )
      .addCase(fetchPodcast.rejected, (_, action) => {
        console.error("API獲取失敗", action.error);
      });
  },
});

export const {
  setCurrentListId,
  setIsActionModalOpen,
  setCurrentAction,

  addList,
  editListName,
  removeList,

  addShowToList,
  removeShowFromList,
  toggleFavorite,
  setCurrentShow,
  setActiveEpisode,
  clearActiveEpisode,
  setIsSearchModalOpen,
  filterShowsByKeyword,
  setSelectedShows,
  toggleSelectShow,
  clearSelectedShows,

  setCurrentPlayer,
  clearCurrentPlayer,
} = podcastSlice.actions;

export default podcastSlice.reducer;
