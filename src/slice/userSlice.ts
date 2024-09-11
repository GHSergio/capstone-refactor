import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Show, Episode } from "./types";
import axios from "axios";

// Spotify API 基本 URL
const baseUrl = "https://api.spotify.com";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  owner: { display_name: string };
  tracks: {
    href: string;
    total: number; // 總曲目數量
  };
  trackItems?: any[]; // 動態加載的曲目列表
}

export interface UserFavorites {
  episodes: Episode[];
}

export interface UserData {
  id: string;
  display_name: string;
  images: { url: string }[]; // 使用者的圖片
  email: string;
}

interface UserState {
  accessToken: string | null;
  userProfile: UserData | undefined;
  userPlaylists: Playlist[] | undefined;
  userFavorites: Episode[] | undefined;
  currentListId: string | null;
  error: string | null;
}

// 初始狀態
const initialState: UserState = {
  accessToken: null,
  userProfile: undefined,
  userPlaylists: undefined,
  userFavorites: undefined,
  currentListId: "1",
  error: null,
};

// 獲取token
// const getSpotifyAccessToken = () => localStorage.getItem("access_token");

// console.log(localStorage.getItem("access_token"));

// 獲取使用者資訊
export const fetchUserProfile = createAsyncThunk(
  "spotify/fetchUserProfile",
  async () => {
    const token = localStorage.getItem("access_token");

    const userProfileEndpoint = baseUrl + "/v1/me";
    const response = await axios.get(userProfileEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("使用者資訊: ", data);

    return data;
  }
);

// 獲取使用者的播放列表
export const fetchUserPlaylists = createAsyncThunk(
  "spotify/fetchUserPlaylists",
  async () => {
    const token = localStorage.getItem("access_token");

    const url = `${baseUrl}/v1/me/playlists`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.items;
    console.log("使用者清單列表: ", data);

    return data;
  }
);

// 獲取使用者播放列表
export const fetchPlaylistTracks = createAsyncThunk(
  "spotify/fetchPlaylistTracks",
  async (playlistId: string) => {
    const token = localStorage.getItem("access_token");

    const url = `${baseUrl}/v1/playlists/${playlistId}/tracks`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { playlistId, tracks: response.data.items }; // 返回曲目列表
  }
);

// 獲取使用者的收藏節目
export const fetchUserFavorites = createAsyncThunk(
  "user/fetchUserFavorites",
  async () => {
    const token = localStorage.getItem("access_token");

    const url = `${baseUrl}/v1/me/episodes`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.items;
    console.log("使用者收藏: ", response);

    return data;
  }
);

// 新增播放清單
export const createUserPlaylist = createAsyncThunk(
  "user/createUserPlaylist",
  async (playlistName: string, { getState }) => {
    // const token = getSpotifyAccessToken();
    const state = getState() as { user: UserState };
    const token = state.user.accessToken; // 從 Redux 狀態中獲取

    if (!token) throw new Error("Access token not found");

    const url = `${baseUrl}/v1/users/me/playlists`;
    const response = await axios.post(
      url,
      { name: playlistName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // 回傳新增的播放清單
  }
);

// 編輯播放清單名稱
export const editUserPlaylistName = createAsyncThunk(
  "user/editUserPlaylistName",
  async (
    { playlistId, newName }: { playlistId: string; newName: string },
    { getState }
  ) => {
    const state = getState() as { user: UserState };
    const token = state.user.accessToken; // 從 Redux 狀態中獲取

    if (!token) throw new Error("Access token not found");

    const url = `${baseUrl}/v1/playlists/${playlistId}`;
    await axios.put(
      url,
      { name: newName }, // 發送新的名稱
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { playlistId, newName }; // 返回修改結果
  }
);

// 刪除播放清單
export const deleteUserPlaylist = createAsyncThunk(
  "user/deleteUserPlaylist",
  async (playlistId: string, { getState }) => {
    // const token = getSpotifyAccessToken();
    const state = getState() as { user: UserState };
    const token = state.user.accessToken; // 從 Redux 狀態中獲取

    if (!token) throw new Error("Access token not found");

    const url = `${baseUrl}/v1/playlists/${playlistId}/followers`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return playlistId; // 回傳被刪除的播放清單 ID
  }
);

// // 收藏節目到使用者收藏
// export const addShowToFavorites = createAsyncThunk(
//   "user/addShowToFavorites",
//   async (showId: string, { getState }) => {
//     // const token = getSpotifyAccessToken();
//     const state = getState() as { user: UserState };
//     const token = state.user.accessToken; // 從 Redux 狀態中獲取

//     if (!token) throw new Error("Access token not found");

//     const url = `${baseUrl}/v1/me/shows?ids=${showId}`;
//     await axios.put(
//       url,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   }
// );

// // 從使用者的收藏中移除節目
// export const removeShowFromFavorites = createAsyncThunk(
//   "user/removeShowFromFavorites",
//   async (showId: string, { getState }) => {
//     // const token = getSpotifyAccessToken();
//     const state = getState() as { user: UserState };
//     const token = state.user.accessToken; // 從 Redux 狀態中獲取

//     if (!token) throw new Error("Access token not found");
//     const url = `${baseUrl}/v1/me/shows?ids=${showId}`;
//     await axios.delete(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }
// );

export const toggleEpisodeFavorite = createAsyncThunk(
  "user/toggleEpisodeFavorite",
  async (episodeId: string, { getState }) => {
    const state = getState() as { user: UserState };
    const token = state.user.accessToken; // 從 Redux 狀態中獲取

    if (!token) throw new Error("Access token not found");

    // 首先檢查是否已收藏該 episode
    const url = `${baseUrl}/v1/me/episodes/contains?ids=${episodeId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const isFavorite = response.data[0]; // 如果為 true，表示已收藏

    // 根據收藏狀態決定進行 PUT 或 DELETE 操作
    if (isFavorite) {
      // 已收藏，則移除
      await axios.delete(`${baseUrl}/v1/me/episodes?ids=${episodeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // 未收藏，則新增
      await axios.put(
        `${baseUrl}/v1/me/episodes?ids=${episodeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    return { episodeId, isFavorite: !isFavorite }; // 回傳切換後的狀態
  }
);

// userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 設置當前選中的播放清單 ID
    setCurrentListId: (state, action: PayloadAction<string>) => {
      state.currentListId = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userProfile = action.payload;
    },
    setUserPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.userPlaylists = action.payload;
    },
    setUserFavorites: (state, action: PayloadAction<Episode[]>) => {
      state.userFavorites = action.payload;
    },

    // 使用者播放清單 相關
    updatePlaylistName: (
      state,
      action: PayloadAction<{ playlistId: string; newName: string }>
    ) => {
      const playlist = state.userPlaylists?.find(
        (pl) => pl.id === action.payload.playlistId
      );
      if (playlist) {
        playlist.name = action.payload.newName;
      }
    },

    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.userPlaylists?.push(action.payload); // 新增播放清單到本地
    },

    removePlaylist: (state, action: PayloadAction<string>) => {
      state.userPlaylists = state.userPlaylists?.filter(
        (playlist) => playlist.id !== action.payload
      ); // 從本地移除播放清單
    },

    // 修改播放清單相關的 reducer
    addTrackToPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; track: any }>
    ) => {
      const playlist = state.userPlaylists?.find(
        (pl) => pl.id === action.payload.playlistId
      );
      if (playlist) {
        if (!playlist.trackItems) {
          playlist.trackItems = []; // 如果沒有 trackItems，初始化為空數組
        }
        playlist.trackItems.push(action.payload.track); // 把 track 添加到 trackItems 列表中
      }
    },

    removeTrackFromPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; trackId: string }>
    ) => {
      const playlist = state.userPlaylists?.find(
        (pl) => pl.id === action.payload.playlistId
      );
      if (playlist && playlist.trackItems) {
        // 從 trackItems 中過濾掉指定的 track
        playlist.trackItems = playlist.trackItems.filter(
          (track) => track.id !== action.payload.trackId
        );
      }
    },

    // 收藏相關
    addEpisodeToFavorites: (state, action: PayloadAction<Episode>) => {
      state.userFavorites?.push(action.payload);
    },
    removeEpisodeFromFavorites: (state, action: PayloadAction<string>) => {
      state.userFavorites = state.userFavorites?.filter(
        (episode) => episode.id !== action.payload
      ); // 根據 ID 移除收藏中的 episode
    },
  },

  extraReducers: (builder) => {
    builder
      // 處理 fetchUserProfile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const responseData = action.payload;

        // 將使用者資料存入 localStorage
        localStorage.setItem("user_profile", JSON.stringify(responseData));
        // 更新全局狀態
        state.userProfile = responseData;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch user profile";
      })

      // 處理 fetchUserPlaylists
      .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
        const responseData = action.payload;

        // 將使用者資料存入 localStorage
        localStorage.setItem("user_playlists", JSON.stringify(responseData));
        // 更新全局狀態
        state.userPlaylists = responseData;
      })
      .addCase(fetchUserPlaylists.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch playlists";
      })

      // 處理 fetchUserFavorites
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        const responseData = action.payload;

        // 將使用者資料存入 localStorage
        localStorage.setItem("user_favorites", JSON.stringify(responseData));
        // 更新全局狀態
        state.userFavorites = responseData;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch favorites";
      })

      // 處理 播放清單
      .addCase(createUserPlaylist.fulfilled, (state, action) => {
        state.playlists?.push(action.payload); // 新增成功後，將清單加入本地
      })
      .addCase(deleteUserPlaylist.fulfilled, (state, action) => {
        state.playlists = state.playlists?.filter(
          (playlist) => playlist.id !== action.payload
        ); // 刪除成功後，從本地移除播放清單
      })

      // 處理 編輯播放清單名稱
      .addCase(editUserPlaylistName.fulfilled, (state, action) => {
        const { playlistId, newName } = action.payload;
        const playlist = state.playlists?.find((pl) => pl.id === playlistId);
        if (playlist) {
          playlist.name = newName; // 更新本地播放清單名稱
        }
      })
      // 處理 收藏
      .addCase(toggleEpisodeFavorite.fulfilled, (state, action) => {
        const { episodeId, isFavorite } = action.payload;
        if (isFavorite) {
          // 如果被加入收藏，則新增到 userFavorites
          state.userFavorites?.push({ id: episodeId } as Episode);
        } else {
          // 否則移除收藏
          state.userFavorites = state.userFavorites?.filter(
            (episode) => episode.id !== episodeId
          );
        }
      })
      // 處理 曲目列表 存入 trackItems
      .addCase(fetchPlaylistTracks.fulfilled, (state, action) => {
        const playlist = state.playlists?.find(
          (pl) => pl.id === action.payload.playlistId
        );
        if (playlist) {
          playlist.trackItems = action.payload.tracks; // 將曲目列表存入 trackItems
        }
      });
  },
});

export const {
  setAccessToken,
  setUserData,
  setUserPlaylists,
  setUserFavorites,
  addPlaylist,
  updatePlaylistName,
  removePlaylist,
  setCurrentListId,
  // addShowToPlaylist,
  // removeShowFromPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  addEpisodeToFavorites,
  removeEpisodeFromFavorites,
} = userSlice.actions;
export default userSlice.reducer;
