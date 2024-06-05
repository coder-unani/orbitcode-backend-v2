import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IVideo, IVideoApiParams, IVideoTableFilters } from 'src/types/video';

// ----------------------------------------------------------------------

export function useGetVideos() {
  const URL = endpoints.video.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  console.log(data);
  const memoizedValue = useMemo(
    () => ({
      videos: (data?.data as IVideo[]) || [],
      videosLoading: isLoading,
      videosError: error,
      videosValidating: isValidating,
      videosEmpty: !isLoading && !data?.data,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetVideo(videoId: string) {
  const URL = videoId ? `${endpoints.video.detail}/${videoId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      video: data?.data as IVideo,
      videoLoading: isLoading,
      videoError: error,
      videoValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchVideos(params: IVideoTableFilters) {
  console.log('params', params);
  const searchParams: IVideoApiParams = {
    p: params.page ? params.page : 1,
    ps: params.pageSize ? params.pageSize : 50,
    q: params.keyword ? params.keyword : null,
    t: params.videoType ? params.videoType : null,
    vid: params.videoId ? params.videoId : null,
    pid: params.platformId ? params.platformId : null,
    dl: params.isDelete ? params.isDelete : null,
    cf: params.isConfirm ? params.isConfirm : null,
    ob: params.orderBy ? params.orderBy : null,
  };

  const URL = params ? [endpoints.video.search, { params: searchParams }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      searchResults: { total: data?.total, list: (data?.data as IVideo[]) || [] },
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.data,
    }),
    [data?.total, data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
