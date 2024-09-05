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
  // 管理 新增|編輯|刪除 分類
  isActionModalOpen: boolean;
  currentAction: string | null;
  // 是否打開Search Modal
  isSearchModalOpen: boolean;
  filteredShows: Show[];
  selectedShows: Show[];
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
    id: "show4",
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
    id: "show5",
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
    id: "show6",
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
  isActionModalOpen: false,
  currentAction: null,
  isSearchModalOpen: false,
  filteredShows: [], // 篩選後的結果
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
    // MoreModal 相關
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
    addList(state, action: PayloadAction<{ id: string; name: string }>) {
      state.lists.push({
        id: action.payload.id,
        name: action.payload.name,
        shows: [],
      });
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
  addShowToList,
  removeShowFromList,
  removeList,
  toggleFavorite,
  setActiveEpisode,
  clearActiveEpisode,
  setIsSearchModalOpen,
  filterShowsByKeyword,
  setSelectedShows,
  toggleSelectShow,
  clearSelectedShows,
} = podcastSlice.actions;

export default podcastSlice.reducer;
