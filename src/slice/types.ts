export interface Episode {
  id: string;
  name?: string;
  image?: string;
  description?: string;
  publisher?: string;
  release_date?: string;
  duration_ms?: number;
}

export interface Show {
  id: string;
  name?: string;
  publisher?: string;
  image?: string;
  description?: string;
  episodes?: Episode[];
}
