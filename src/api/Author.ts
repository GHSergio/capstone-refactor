const clientId: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const redirectUrl: string = import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string;
const authorizationEndpoint: string = import.meta.env
  .VITE_SPOTIFY_AUTHORIZATION_ENDPOINT as string;
const tokenEndpoint: string = import.meta.env
  .VITE_SPOTIFY_TOKEN_ENDPOINT as string;

console.log("clientId:", clientId);
console.log("authorizationEndpoint:", authorizationEndpoint);
console.log("redirectUrl:", redirectUrl);
console.log("tokenEndpoint:", tokenEndpoint);

const scope: string =
  "streaming user-read-playback-position user-library-read user-modify-playback-state user-read-playback-state user-read-private user-read-email";

// 資料結構：管理當前的 access_token，並將其儲存到 localStorage 中
const currentToken = {
  get access_token(): string | null {
    return localStorage.getItem("access_token");
  },
  get refresh_token(): string | null {
    return localStorage.getItem("refresh_token");
  },
  get expires_in(): string | null {
    return localStorage.getItem("refresh_in");
  },
  get expires(): string | null {
    return localStorage.getItem("expires");
  },

  save: function (response: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }) {
    // console.log("儲存 token:", response); // 打印 token
    const { access_token, refresh_token, expires_in } = response;
    if (access_token && refresh_token && expires_in) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("expires_in", expires_in.toString());

      const now = new Date();
      const expiry = new Date(now.getTime() + expires_in * 1000);
      localStorage.setItem("expires", expiry.toISOString());
    } else {
      console.error("缺少 token 資料:", response);
    }
  },
};

// 頁面加載時，嘗試從當前瀏覽器的 URL 中獲取授權碼（auth code）
const args = new URLSearchParams(window.location.search);
const code: string | null = args.get("code");

// // 如果找到授權碼，進行 token 交換
// if (code) {
//   getToken(code).then((token) => {
//     console.log("獲取到的 token:", token);
//     currentToken.save(token);

//     // 移除 URL 中的授權碼，讓我們可以正確進行刷新
//     const url = new URL(window.location.href);
//     url.searchParams.delete("code");

//     const updatedUrl = url.search ? url.href : url.href.replace("?", "");
//     window.history.replaceState({}, document.title, updatedUrl);
//   });
// }

// 如果找到授權碼，進行 token 交換
if (code) {
  getToken(code)
    .then((token) => {
      if (token.access_token && token.refresh_token) {
        // console.log("獲取到的 token:", token);
        currentToken.save(token);

        // 移除 URL 中的授權碼，避免重複使用
        const url = new URL(window.location.href);
        url.searchParams.delete("code");

        const updatedUrl = url.search ? url.href : url.href.replace("?", "");
        window.history.replaceState({}, document.title, updatedUrl);
      } else {
        console.error("Token 回應中缺少必要資料，重新授權中...");
        localStorage.clear();
        redirectToSpotifyAuthorize();
      }
    })
    .catch((error) => {
      console.error("Token 交換失敗，錯誤信息：", error);
      localStorage.clear();
      redirectToSpotifyAuthorize();
    });
}

// // 如果有 token，則表示已登入，獲取使用者資料並渲染已登入的模板
// if (currentToken.access_token) {
//   getUserData().then((userData) => {
//     renderTemplate("main", "logged-in-template", userData);
//     renderTemplate("oauth", "oauth-template", currentToken);
//   });
// } else {
//   renderTemplate("main", "login");
// }

// 工具函數：生成隨機字串並進行哈希處理，用於 OAuth2 授權
async function redirectToSpotifyAuthorize(): Promise<void> {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // 將使用者重定向到授權伺服器進行登入
}

// Spotify API 調用函數：獲取 token
async function getToken(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const code_verifier = localStorage.getItem("code_verifier");

  console.log("Requesting token with code:", code); // 確認 code 是否正確
  console.log("Using code_verifier:", code_verifier); // 確認 code_verifier 是否正確
  console.log("Redirect URI:", redirectUrl); // 確認 redirect_uri 是否正確

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier || "",
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    console.error("Token 交換失敗，狀態碼：", response.status);
    console.error("錯誤訊息：", data); // 打印錯誤訊息
    throw new Error(`Token 交換失敗，狀態碼：${response.status}`);
  }
  console.log("Token response data:", data); // 打印完整的返回數據
  return data;
}

// Spotify API 調用函數：刷新 token
async function refreshToken(): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: currentToken.refresh_token || "",
    }),
  });

  return await response.json();
}

// Spotify API 調用函數：獲取使用者資料
async function getUserData(): Promise<any> {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
}

// 點擊處理器：觸發登入 Spotify
async function loginWithSpotifyClick(): Promise<void> {
  await redirectToSpotifyAuthorize();
}

// 點擊處理器：登出並清除本地儲存
async function logoutClick(): Promise<void> {
  localStorage.clear();
  window.location.href = redirectUrl;
}

// 點擊處理器：刷新 token
async function refreshTokenClick(): Promise<void> {
  const token = await refreshToken();
  currentToken.save(token);
  renderTemplate("oauth", "oauth-template", currentToken);
  console.log(currentToken);
}

// // HTML 模板渲染函數，帶有基本的資料綁定功能
// function renderTemplate(
//   targetId: string,
//   templateId: string,
//   data: any = null
// ) {
//   const template = document.getElementById(templateId) as HTMLTemplateElement;
//   if (!template) {
//     console.error(`找不到 ID 為 "${templateId}" 的模板。`);
//     return;
//   }
//   const clone = template.content.cloneNode(true);

//   const elements = (clone as HTMLElement).querySelectorAll("*");
//   elements.forEach((ele) => {
//     const bindingAttrs = [...ele.attributes].filter((a) =>
//       a.name.startsWith("data-bind")
//     );

//     bindingAttrs.forEach((attr) => {
//       const target = attr.name
//         .replace(/data-bind-/, "")
//         .replace(/data-bind/, "");
//       const targetType = target.startsWith("onclick") ? "HANDLER" : "PROPERTY";
//       const targetProp = target === "" ? "innerHTML" : target;

//       const prefix = targetType === "PROPERTY" ? "data." : "";
//       const expression = prefix + attr.value.replace(/;\n\r\n/g, "");

//       // 這裡可以用更嚴格的框架進行驗證 ;)
//       try {
//         (ele as any)[targetProp] =
//           targetType === "PROPERTY"
//             ? eval(expression)
//             : () => {
//                 eval(expression);
//               };
//         ele.removeAttribute(attr.name);
//       } catch (ex) {
//         console.error(`綁定 ${expression} 到 ${targetProp} 時出錯`, ex);
//       }
//     });
//   });

//   const target = document.getElementById(targetId);
//   if (target) {
//     target.innerHTML = "";
//     target.appendChild(clone);
//   }
// }

export {
  redirectToSpotifyAuthorize,
  getToken,
  refreshToken,
  loginWithSpotifyClick,
  logoutClick,
  refreshTokenClick,
  getUserData,
};
