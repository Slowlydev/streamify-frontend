import { Comment, CreatedComment } from '../types/comment.type';
import { FetchResponse } from '../types/fetch.type';
import { Video } from '../types/video.type';
import { fetch } from './fetch';

export const getComments = (id: Video['id'], controller?: AbortController): Promise<FetchResponse<Comment[]>> => {
	return fetch<Comment[]>('get', `/video/${id}/comment`, null, { signal: controller?.signal });
};

export const createComment = (
	videoId: Video['id'],
	newComment: { content: string },
	controller?: AbortController,
): Promise<FetchResponse<CreatedComment>> => {
	return fetch<CreatedComment>('post', `/video/${videoId}/comment`, newComment, { signal: controller?.signal });
};
