export interface Episode {
  id: string;
  name?: string;
  images?: { url: string }[];
  description?: string;
  publisher?: string;
  release_date?: string;
  duration_ms?: number;
}

export interface Show {
  id: string;
  name?: string;
  publisher?: string;
  images?: { url: string }[];
  description?: string;
  episodes?: {
    items: Episode[];
  };
}
