import axios from "axios";
import { refreshToken } from "./Author";
const baseUri = process.env.REACT_APP_AC_API_BASE_URI;
// const baseUri = "https://spotify-backend.alphacamp.io";
console.log("acAPI env:", baseUri);

const apiClient = axios.create({
  // baseURL: baseUri,
  baseURL: "https://spotify-backend.alphacamp.io",
  // baseURL: process.env.REACT_APP_API_BASE_URL,
});

//使用於 用acToken 當 headers 的fn(也就是除了創建帳戶以外的fn)
apiClient.interceptors.request.use(
  async (config) => {
    // const spotifyToken = localStorage.getItem("acToken");
    const expires = new Date(localStorage.getItem("expires"));
    if (new Date() >= expires) {
      //刷新spotifyToken & 設置為headers & 創建新帳戶 取得acToken
      console.log("Access token expired, refreshing...");
      const newTokens = await refreshToken();
      localStorage.setItem("access_token", newTokens.access_token);
      localStorage.setItem(
        "expires",
        new Date(new Date().getTime() + newTokens.expires_in * 1000)
      );
      // 调用 CreateAccount & 使用現有的 acToken 當 headers
      await CreateAccount();
      const newAcToken = localStorage.getItem("acToken");
      config.headers.Authorization = `Bearer ${newAcToken}`;
    } else {
      //沒超時 則獲取Spotify的access_token
      const acToken = localStorage.getItem("acToken");
      config.headers.Authorization = `Bearer ${acToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//access_token 當 headers 使用 axios
// 創建acAPI帳戶
export const CreateAccount = async () => {
  const spotifyToken = localStorage.getItem("access_token");
  const url = `${baseUri}/api/users`;
  const bodyParameters = {
    spotifyToken: spotifyToken,
  };

  try {
    const response = await axios.post(url, bodyParameters);
    const token = response.data.token;
    console.log(
      "acAPI帳戶創建成功",
      "[id]:",
      response.data.id,
      "[token]:",
      token
    );
    localStorage.setItem("acToken", token);
  } catch (err) {
    console.error("创建账户时发生错误:", err);
    // 可能需要在这里处理错误，例如重试或通知用户
  }
};

//使用 acToken 當 headers 使用攔截器 apiClient 取代 axios
//取得我的最愛
export const GetFavoriteIds = async () => {
  const url = `api/me`;
  try {
    const response = await apiClient.get(url);
    console.log("用戶收藏清單:", response.data.favoriteEpisodeIds);
    localStorage.setItem(
      "userFavoriteList",
      JSON.stringify(response.data.favoriteEpisodeIds)
    );
    return response.data.favoriteEpisodeIds;
  } catch (err) {
    console.error("獲取收藏清單時發生錯誤:", err);
    return null;
  }
};

//取得分類清單
export const GetCategory = async () => {
  const url = `api/categories`;
  try {
    const response = await apiClient.get(url);
    console.log("分類清單:", response.data.categories);
    localStorage.setItem(
      "userCategoryContent",
      JSON.stringify(response.data.categories)
    );
    return response.data.categories;
  } catch (err) {
    console.error("獲取分類清單時發生錯誤:", err);
    return null;
  }
};

//移除episodeId至FavoriteList
export const RemoveFavorite = async (episodeId) => {
  const url = `api/episodes/${episodeId}`;
  try {
    const response = await apiClient.delete(url);
    console.log(
      "RemoveFavorite:",
      response,
      "status 200 還出現error? 是為了測試?"
    );
    if (response.status === 200) {
      // 更新 localStorage
      const userFavoriteList =
        JSON.parse(localStorage.getItem("userFavoriteList")) || [];
      const updatedFavoriteList = userFavoriteList.filter(
        (id) => id !== episodeId
      );
      localStorage.setItem(
        "userFavoriteList",
        JSON.stringify(updatedFavoriteList)
      );
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("刪除收藏發生錯誤:", error);
    if (error.response && error.response.status === 403) {
      console.log("Invalid token!");
    }
    if (error.response && error.response.status === 404) {
      console.log(" Episode is not liked by the user");
    }
  }
};
//添加episodeId至FavoriteList
export const PostFavorite = async (episodeId) => {
  const url = `api/episodes`;
  const bodyParam = { episodeId: episodeId };
  try {
    const response = await apiClient.post(url, bodyParam);
    console.log(
      "PostFavorite:",
      response,
      "status 200 還出現error? 是為了測試?"
    );
    if (response.status === 200) {
      // 更新 localStorage
      const userFavoriteList =
        JSON.parse(localStorage.getItem("userFavoriteList")) || [];
      userFavoriteList.push({ id: episodeId });
      localStorage.setItem(
        "userFavoriteList",
        JSON.stringify(userFavoriteList)
      );
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("新增收藏發生錯誤:", error);
    if (error.response && error.response.status === 403) {
      console.log("Invalid token!");
    }
    if (error.response && error.response.status === 409) {
      console.log("episode 已在收藏內");
    }
  }
};

//新增分類
export const AddCategory = async ({ newTitle }) => {
  const url = `api/categories`;
  const bodyParameters = {
    name: newTitle,
  };

  try {
    const response = await apiClient.post(url, bodyParameters);
    if (response.status === 200) {
      // 更新 localStorage
      console.log("新增分類回傳結果:", response.data);
      const userCategoryContent =
        JSON.parse(localStorage.getItem("userCategoryContent")) || [];
      userCategoryContent.push(response.data.category);

      localStorage.setItem(
        "userCategoryContent",
        JSON.stringify(userCategoryContent)
      );
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("新增分類清單發生錯誤:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Error connecting to server",
    };
  }
};
//刪除分類
export const deleteCategory = async (categoriesId) => {
  const url = `api/categories/${categoriesId}`;

  try {
    const response = await apiClient.delete(url);
    console.log("Response status:", response.status);
    if (response.status === 200) {
      // 更新 localStorage
      const userCategoryContent =
        JSON.parse(localStorage.getItem("userCategoryContent")) || [];
      const updatedCategoryContent = userCategoryContent.filter(
        (category) => category.id !== categoriesId
      );
      localStorage.setItem(
        "userCategoryContent",
        JSON.stringify(updatedCategoryContent)
      );
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error delete category:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};
//修改分類
export const putCategory = async ({ categoriesId, name }) => {
  console.log(categoriesId, name);
  const url = `api/categories/${categoriesId}`;
  const bodyParameters = {
    name: name,
  };

  try {
    const response = await apiClient.put(url, bodyParameters);
    console.log("Response status:", response.status);
    if (response.status === 200) {
      // 更新 localStorage
      const userCategoryContent =
        JSON.parse(localStorage.getItem("userCategoryContent")) || [];
      const updatedCategoryContent = userCategoryContent.map((category) =>
        category.id === categoriesId ? { ...category, name: name } : category
      );
      localStorage.setItem(
        "userCategoryContent",
        JSON.stringify(updatedCategoryContent)
      );
      console.log("請求API修改分類名稱:", updatedCategoryContent);
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};

//添加show至分類
export const addShowToCategory = async (categoryId, showId) => {
  console.log(categoryId, showId);
  if (!categoryId) {
    console.error("Category ID is undefined");
    return {
      success: false,
      message: "Category ID is undefined",
    };
  }
  const url = `api/categories/${categoryId}/shows`;
  const bodyParam = { showId: showId };
  // const response = await apiClient.post(url, bodyParam);
  // console.log("添加show至分類的response:", response);
  try {
    const response = await apiClient.post(url, bodyParam);
    console.log("添加show至分類的response:", response);
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("新增show至分類時發生錯誤:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};

// 刪除show從分類;
export const deleteFromCategory = async (categoryId, showId) => {
  const url = `api/categories/${categoryId}/shows/${showId}`;
  try {
    const response = await apiClient.delete(url);
    console.log("移除show從分類的response:", response);
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("移除show從分類時發生錯誤:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};
