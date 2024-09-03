import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Episode {
  id: string;
  name: string;
  image: string;
  description: string;
  release_date: string;
  duration_ms: number;
}

interface Show {
  id: string;
  name: string;
  publish: string;
  image: string;
  description: string;
  episodes: Episode[];
}

interface List {
  id: string;
  name: string;
  shows: Show[];
}

interface PodcastState {
  lists: List[];
  currentListId: string | null;
  favoriteEpisodes: Episode[];
}

// 測試用的 show 數據
const testShows: Show[] = [
  {
    id: "show1",
    name: "通勤音樂合輯",
    publish: "2024-09-10",
    image: "https://via.placeholder.com/150",
    description: "這是為了通勤準備的音樂合輯，讓你的早晨更加愉快。",
    episodes: [
      {
        id: "episode1",
        name: "早晨振奮音樂集",
        image: "https://via.placeholder.com/100",
        description: "這是一個充滿活力的音樂集，適合開始你的一天。",
        release_date: "2024-09-10",
        duration_ms: 1800000,
      },
      {
        id: "episode2",
        name: "柔和的早晨旋律",
        image: "https://via.placeholder.com/100",
        description: "這是一個溫暖的音樂集，適合在通勤路上聆聽。",
        release_date: "2024-09-11",
        duration_ms: 2400000,
      },
    ],
  },
  {
    id: "show2",
    name: "深夜談話",
    publish: "2024-09-12",
    image: "https://via.placeholder.com/150",
    description: "在深夜裡，我們聊聊生活和未來。",
    episodes: [
      {
        id: "episode3",
        name: "夢想與現實的碰撞",
        image: "https://via.placeholder.com/100",
        description: "討論夢想和現實的差距以及如何面對。",
        release_date: "2024-09-12",
        duration_ms: 3600000,
      },
      {
        id: "episode4",
        name: "午夜音樂欣賞",
        image: "https://via.placeholder.com/100",
        description: "在夜晚聆聽一些舒緩的音樂，讓心靈得到放鬆。",
        release_date: "2024-09-13",
        duration_ms: 2700000,
      },
    ],
  },
  {
    id: "show3",
    name: "科技前瞻",
    publish: "2024-09-14",
    image: "https://via.placeholder.com/150",
    description: "最新的科技新聞和趨勢分析。",
    episodes: [
      {
        id: "episode5",
        name: "AI的未來",
        image: "https://via.placeholder.com/100",
        description: "探討人工智慧的未來發展趨勢。",
        release_date: "2024-09-14",
        duration_ms: 3000000,
      },
      {
        id: "episode6",
        name: "區塊鏈技術",
        image: "https://via.placeholder.com/100",
        description: "理解區塊鏈的基本概念及其應用。",
        release_date: "2024-09-15",
        duration_ms: 2500000,
      },
    ],
  },
  {
    id: "show1",
    name: "通勤音樂合輯",
    publish: "2024-09-10",
    image: "https://via.placeholder.com/150",
    description: "這是為了通勤準備的音樂合輯，讓你的早晨更加愉快。",
    episodes: [
      {
        id: "episode1",
        name: "早晨振奮音樂集",
        image: "https://via.placeholder.com/100",
        description: "這是一個充滿活力的音樂集，適合開始你的一天。",
        release_date: "2024-09-10",
        duration_ms: 1800000,
      },
      {
        id: "episode2",
        name: "柔和的早晨旋律",
        image: "https://via.placeholder.com/100",
        description: "這是一個溫暖的音樂集，適合在通勤路上聆聽。",
        release_date: "2024-09-11",
        duration_ms: 2400000,
      },
    ],
  },
  {
    id: "show2",
    name: "深夜談話",
    publish: "2024-09-12",
    image: "https://via.placeholder.com/150",
    description: "在深夜裡，我們聊聊生活和未來。",
    episodes: [
      {
        id: "episode3",
        name: "夢想與現實的碰撞",
        image: "https://via.placeholder.com/100",
        description: "討論夢想和現實的差距以及如何面對。",
        release_date: "2024-09-12",
        duration_ms: 3600000,
      },
      {
        id: "episode4",
        name: "午夜音樂欣賞",
        image: "https://via.placeholder.com/100",
        description: "在夜晚聆聽一些舒緩的音樂，讓心靈得到放鬆。",
        release_date: "2024-09-13",
        duration_ms: 2700000,
      },
    ],
  },
  {
    id: "show3",
    name: "科技前瞻",
    publish: "2024-09-14",
    image: "https://via.placeholder.com/150",
    description: "最新的科技新聞和趨勢分析。",
    episodes: [
      {
        id: "episode5",
        name: "AI的未來",
        image: "https://via.placeholder.com/100",
        description: "探討人工智慧的未來發展趨勢。",
        release_date: "2024-09-14",
        duration_ms: 3000000,
      },
      {
        id: "episode6",
        name: "區塊鏈技術",
        image: "https://via.placeholder.com/100",
        description: "理解區塊鏈的基本概念及其應用。",
        release_date: "2024-09-15",
        duration_ms: 2500000,
      },
    ],
  },
];

const initialState: PodcastState = {
  lists: [
    {
      id: "1",
      name: "通勤清單",
      shows: testShows, // 添加多組測試用的 show
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
  favoriteEpisodes: [], // 初始化為空
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
    setCurrentListId(state, action: PayloadAction<string>) {
      state.currentListId = action.payload;
    },
    addList(state, action: PayloadAction<{ id: string; name: string }>) {
      state.lists.push({
        id: action.payload.id,
        name: action.payload.name,
        shows: [],
      });
    },
    addShowToList(
      state,
      action: PayloadAction<{ listId: string; show: Show }>
    ) {
      const list = state.lists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.shows.push(action.payload.show);
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
    removeList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
      if (state.currentListId === action.payload) {
        state.currentListId = state.lists.length > 0 ? state.lists[0].id : null;
      }
    },
    // 添加 episode 到收藏
    addShowToFavorite(state, action: PayloadAction<Episode>) {
      // 避免重複添加
      if (
        !state.favoriteEpisodes.some(
          (episode) => episode.id === action.payload.id
        )
      ) {
        state.favoriteEpisodes.push(action.payload);
      }
    },
    // 從收藏中移除 episode
    removeEpisodeFromFavorite(state, action: PayloadAction<string>) {
      state.favoriteEpisodes = state.favoriteEpisodes.filter(
        (episode) => episode.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPodcast.fulfilled,
        (state, action: PayloadAction<PodcastState>) => {
          return action.payload;
        }
      )
      .addCase(fetchPodcast.rejected, (state, action) => {
        console.error("API獲取失敗", action.error);
      });
  },
});

export const {
  setCurrentListId,
  addList,
  addShowToList,
  removeShowFromList,
  removeList,
  addShowToFavorite,
  removeEpisodeFromFavorite,
} = podcastSlice.actions;

export default podcastSlice.reducer;
