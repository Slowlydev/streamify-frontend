import { FetchResponse } from '../types/fetch.type';
import { Video } from '../types/video.type';
import { fetch } from './fetch';

export const getVideos = (filters: unknown, controller?: AbortController): Promise<FetchResponse<Video[]>> => {
	return fetch<Video[]>('get', '/video', null, { signal: controller?.signal });
};

export const getVideo = (id: string): Promise<FetchResponse<Video>> => {
	return fetch<Video>('get', `/video/${id}`);
};
