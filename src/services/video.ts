import type { Video } from "../types/video.type";
import { fetcher } from "./fetch";

export const getVideos = async () => {
	return fetcher<Video[]>("get", `/video`);
};

export const getVideo = async (id: Video["id"]) => {
	return fetcher<Video>("get", `/video/${id}`);
};
