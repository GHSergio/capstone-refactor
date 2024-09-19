/// <reference types="vite/client" />
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Window {
  onSpotifyWebPlaybackSDKReady: () => void;
  Spotify: any; // 添加 Spotify 屬性類型
}
