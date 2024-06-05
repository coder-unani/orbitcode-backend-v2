// ----------------------------------------------------------------------

export type IVideoFilterValue = string | string[] | number | number[];

export type IVideoFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IGenre = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type IActor = {
  id: number;
  name: string;
  picture: string;
  profile: string;
  created_at: string;
  updated_at: string;
};

export type IStaff = {
  id: number;
  name: string;
  picture: string;
  profile: string;
  created_at: string;
  updated_at: string;
};

export type IVideoWatch = {
  id: number;
  type: string;
  url: string;
  created_at: string;
  updated_at: string;
};

export type IVideoThumbnail = {
  id: number;
  type: string;
  url: string;
  created_at: string;
  updated_at: string;
};

export type IVideo = {
  id: number;
  type: string;
  title: string;
  synopsis: string;
  release: string;
  runtime: string;
  notice_age: string;
  rating: number;
  like_count: number;
  view_count: number;
  platform_code: number;
  platform_id: number;
  genre: IGenre[];
  actor: IActor[];
  staff: IStaff[];
  watch: IVideoWatch[];
  thumbnail: IVideoThumbnail[];
  created_at: string;
  updated_at: string;
};

export type IVideoTableFilterValue = string | number | number | boolean | null;

export type IVideoTableFilters = {
  videoType: string;
  keyword: string | null;
  isConfirm: string;
  isDelete: string;
  videoId: number | null;
  platformId: string | null;
  orderBy: string | null;
};

export type IVideoApiParams = {
  q: string | null;
  t: string | null;
  vid: number | null;
  pid: string | null;
  dl: string | null;
  cf: string | null;
  ob: string | null;
};
