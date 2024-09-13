import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Episode, Show } from "./types";
import axios from "axios";

export interface Category {
  id: string;
  name: string;
  savedShows: Show[];
}

export interface UserData {
  id: string;
  display_name: string;
  images: { url: string }[];
  email: string;
}

export interface Favorite {
  id: string;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export interface UserState {
  acToken: string | null;
  userProfile: UserData | undefined;
  userCategories: Category[] | undefined;
  userFavorites: Favorite[] | undefined;
  currentCategoryId: string | null;
  showsDetail: Show[]; // 向API獲取分類內的savedShows的Detail
  episodeDetail: Episode[]; // 向API獲取收藏內EpisodeId的Detail
  error: string | null | undefined;
  loading: boolean;
  alert: AlertState;
}

// 初始狀態
const initialState: UserState = {
  userProfile: undefined,
  acToken: null,
  userCategories: [],
  userFavorites: [],
  currentCategoryId: "1",
  showsDetail: [],
  episodeDetail: [],
  error: null,
  loading: false,
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
};

// Spotify API 基本 URL
const spotifyBaseUrl = import.meta.env.VITE_SPOTIFY_API_BASE_URI;
const AcBaseUri = import.meta.env.VITE_AC_API_BASE_URI;

// 獲取使用者資訊
export const fetchUserProfile = createAsyncThunk(
  "spotify/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    const userProfileEndpoint = spotifyBaseUrl + "/v1/me";
    try {
      const response = await axios.get(userProfileEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      // console.log("使用者資訊: ", data);
      return data;
    } catch (error) {
      console.log("獲取使用者資訊失敗: ", error);
      return rejectWithValue(error);
    }
  }
);

// Spotify API 授權後創建 AC API 帳戶
export const initializeAccount = createAsyncThunk(
  "user/initializeAccount",
  async (_, { rejectWithValue }) => {
    const spotifyToken = localStorage.getItem("access_token");
    const url = `${AcBaseUri}/api/users`;
    const bodyParameters = { spotifyToken };
    try {
      const response = await axios.post(url, bodyParameters);
      const token = response.data.token;
      // localStorage.setItem("acToken", token);
      // console.log("創建帳戶response: ", response, token);
      return token;
    } catch (error) {
      console.log("創建AC帳號時發生錯誤: ", error);
      return rejectWithValue("初始化帳戶失敗");
    }
  }
);

// 獲取收藏節目
export const fetchUserFavorites = createAsyncThunk(
  "user/fetchUserFavorites",
  async (_, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/me`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      console.log("收藏: ", response);
      return response.data.favoriteEpisodeIds;
    } catch (error) {
      console.log("獲取收藏失敗: ", error);
      return rejectWithValue(error);
    }
  }
);

// 獲取分類清單
export const fetchCategories = createAsyncThunk(
  "user/fetchCategories",
  async (_, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/categories`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      console.log("獲取分類清單: ", response);
      return response.data.categories;
    } catch (error) {
      console.log("獲取分類清單時發生錯誤: ", error);
      return rejectWithValue("移除分類清單失敗");
    }
  }
);

// 獲取指定的 Show 資訊
export const fetchShow = createAsyncThunk(
  "spotify/fetchShowWithEpisodes",
  async (showId: string) => {
    const token = localStorage.getItem("access_token");
    const uri = `${spotifyBaseUrl}/v1/shows/${showId}`;
    const response = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// 獲取指定Episode 資訊
export const fetchEpisodeDetail = createAsyncThunk(
  "podcast/fetchEpisodeDetail",
  async (episodeId: string) => {
    const token = localStorage.getItem("access_token");
    const url = `${spotifyBaseUrl}/v1/episodes/${episodeId}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

// 添加episode到收藏
export const addFavorite = createAsyncThunk(
  "user/addFavorite",
  async (episodeId: string, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/episodes`;
    const bodyParam = { episodeId };
    try {
      const response = await axios.post(url, bodyParam, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      console.log("添加episode到收藏: ", response);
      return { id: episodeId }; // 回傳一個包含id的物件
    } catch (error) {
      console.log("添加收藏時發生錯誤: ", error);
      return rejectWithValue("添加收藏失敗");
    }
  }
);

// 從收藏移除episode
export const removeFavorite = createAsyncThunk(
  "user/removeFavorite",
  async (episodeId: string, { rejectWithValue }) => {
    const acToken = localStorage.getItem("acToken");
    const url = `${AcBaseUri}/api/episodes/${episodeId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      });
      // console.log("被刪除的episodeId: ", episodeId);
      return episodeId;
    } catch (error) {
      console.log("移除收藏時發生錯誤: ", error);
      return rejectWithValue("移除收藏失敗");
    }
  }
);

// 添加新的分類
export const createCategory = createAsyncThunk(
  "user/createCategory",
  async (newTitle: string, { rejectWithValue }) => {
    const url = `${AcBaseUri}/api/categories`;
    const bodyParameters = { name: newTitle };
    try {
      const response = await axios.post(url, bodyParameters, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      console.log("新分類清單: ", response);
      return response.data.category;
    } catch (error) {
      console.log("添加分類時發生錯誤: ", error);
      return rejectWithValue("添加分類失敗");
    }
  }
);

// 刪除分類
export const deleteCategory = createAsyncThunk(
  "user/deleteCategory",
  async (categoryId: string, { rejectWithValue }) => {
    const url = `${AcBaseUri}/api/categories/${categoryId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      return categoryId;
    } catch (error) {
      console.log("移除分類時發生錯誤: ", error);
      return rejectWithValue("移除分類清單失敗");
    }
  }
);

// 修改分類名稱
export const updateCategory = createAsyncThunk(
  "user/updateCategory",
  async (
    { categoryId, newName }: { categoryId: string; newName: string },
    { rejectWithValue }
  ) => {
    const url = `${AcBaseUri}/api/categories/${categoryId}`;
    const bodyParameters = { newName };
    try {
      await axios.put(url, bodyParameters, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      return { categoryId, newName };
    } catch (error) {
      console.log("修改分類名稱時發生錯誤: ", error);
      return rejectWithValue("修改分類清單失敗");
    }
  }
);

// 添加show到分類
export const addShowToCategory = createAsyncThunk(
  "user/addShowToCategory",
  async (
    { categoryId, showId }: { categoryId: string; showId: string },
    { rejectWithValue }
  ) => {
    const url = `${AcBaseUri}/api/categories/${categoryId}/shows`;
    const bodyParam = { showId };

    try {
      const response = await axios.post(url, bodyParam, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });

      if (response.status === 201 || response.data.success) {
        return { success: true, showId, categoryId };
      } else {
        return rejectWithValue(
          `Failed with status: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      return rejectWithValue(error || "添加分類清單失敗");
    }
  }
);

// 從分類中移除show
export const removeShowFromCategory = createAsyncThunk(
  "user/removeShowFromCategory",
  async (
    { categoryId, showId }: { categoryId: string; showId: string },
    { rejectWithValue }
  ) => {
    const url = `${AcBaseUri}/api/categories/${categoryId}/shows/${showId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acToken")}`,
        },
      });
      return { categoryId, showId };
    } catch (error) {
      console.log("移除節目時發生錯誤: ", error);
      return rejectWithValue("移除節目失敗");
    }
  }
);

// userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Card 渲染
    setShowsDetail(state, action: PayloadAction<Show[]>) {
      state.showsDetail = action.payload;
    },
    setAlert(state, action: PayloadAction<AlertState>) {
      state.alert = action.payload;
    },
    clearAlert(state) {
      state.alert = {
        open: false,
        message: "",
        severity: "info",
      };
    },
    setCurrentCategoryId: (state, action: PayloadAction<string>) => {
      state.currentCategoryId = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userProfile = action.payload;
    },
    setUserCategories: (state, action: PayloadAction<Category[]>) => {
      state.userCategories = action.payload;
    },
    setUserFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.userFavorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 處理 fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const responseData = action.payload;
        // 將使用者資料存入 localStorage
        localStorage.setItem("user_profile", JSON.stringify(responseData));
        // 更新全局狀態
        state.userProfile = responseData;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    // initializeAccount
    builder
      .addCase(initializeAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAccount.fulfilled, (state, action) => {
        localStorage.setItem("acToken", action.payload);
        state.loading = false;
      })
      .addCase(initializeAccount.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

    // fetchUserFavorites
    builder
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.userFavorites = action.payload;
        state.loading = false;
        // 保存到 localStorage
        localStorage.setItem(
          "user_favorites",
          JSON.stringify(state.userFavorites || [])
        );
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

    // fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.userCategories = action.payload;
        console.log("接收到的分類?", state.userCategories);
        state.loading = false;
        // 保存到 localStorage
        localStorage.setItem(
          "user_categories",
          JSON.stringify(state.userCategories || [])
        );
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

    builder
      // 處理 fetchShow
      .addCase(fetchShow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShow.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchShow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      // 處理 fetchEpisodeDetail
      .addCase(fetchEpisodeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodeDetail.fulfilled, (state, action) => {
        // 檢查 episode 是否已經存在
        const episodeExists = state.episodeDetail.some(
          (episode) => episode.id === action.payload.id
        );
        // 如果不存在才推入
        if (!episodeExists) {
          state.episodeDetail.push(action.payload);
        }
      })
      .addCase(fetchEpisodeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // addFavorite
    builder
      .addCase(addFavorite.fulfilled, (state, action) => {
        const favorite = action.payload as Favorite; // 傳回來的是 Favorite 物件

        state.userFavorites?.push(favorite); // 添加到收藏陣列

        // 更新 localStorage
        localStorage.setItem(
          "user_favorites",
          JSON.stringify(state.userFavorites)
        );
        state.alert = {
          open: true,
          message: "添加收藏成功！",
          severity: "success",
        };
      })
      .addCase(addFavorite.rejected, (state) => {
        state.alert = {
          open: true,
          message: "添加收藏失敗！",
          severity: "error",
        };
      });

    // removeFavorite
    builder
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const episodeId = action.payload;
        // 根據 id 過濾移除收藏的節目
        state.userFavorites = state.userFavorites?.filter(
          (favorite) => favorite.id !== episodeId
        );

        state.episodeDetail = state.episodeDetail?.filter(
          (episode) => episode.id !== action.payload
        );

        // 更新 localStorage
        localStorage.setItem(
          "user_favorites",
          JSON.stringify(state.userFavorites)
        );

        state.alert = {
          open: true,
          message: "移除收藏成功！",
          severity: "success",
        };
      })
      .addCase(removeFavorite.rejected, (state) => {
        state.alert = {
          open: true,
          message: "移除收藏失敗！",
          severity: "error",
        };
      });

    // createCategory
    builder.addCase(createCategory.fulfilled, (state, action) => {
      if (state.userCategories) {
        state.userCategories.push(action.payload);
      }
    });

    // updateCategory
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { categoryId, newName } = action.payload;
      const category = state.userCategories?.find(
        (cat) => cat.id === categoryId
      );
      if (category) {
        category.name = newName;
      }
    });

    // deleteCategory
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.userCategories = state.userCategories?.filter(
        (cat) => cat.id !== action.payload
      );
    });

    // addShowToCategory
    builder.addCase(addShowToCategory.fulfilled, (state, action) => {
      const { categoryId, showId } = action.payload;
      const category = state.userCategories?.find(
        (cat) => cat.id === categoryId
      );
      if (category) {
        // 確保節目不會重複添加到分類
        const isAlreadyInCategory = category.savedShows.some(
          (savedShow) => savedShow.id === showId
        );
        if (!isAlreadyInCategory) {
          category.savedShows.push({ id: showId });
        }
        // 更新 localStorage，將整個 userCategories 寫回
        localStorage.setItem(
          "user_categories",
          JSON.stringify(state.userCategories)
        );
      }
    });

    builder.addCase(addShowToCategory.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // removeShowFromCategory
    builder.addCase(removeShowFromCategory.fulfilled, (state, action) => {
      const { categoryId, showId } = action.payload;
      const category = state.userCategories?.find(
        (cat) => cat.id === categoryId
      );
      if (category) {
        category.savedShows = category.savedShows.filter(
          (show) => show.id !== showId
        );
        // 更新 localStorage，將整個 userCategories 寫回
        localStorage.setItem(
          "user_categories",
          JSON.stringify(state.userCategories)
        );
      }
    });
  },
});

export const {
  setUserData,
  setUserCategories,
  setUserFavorites,
  setCurrentCategoryId,
  setShowsDetail,

  setAlert,
  clearAlert,
} = userSlice.actions;
export default userSlice.reducer;
