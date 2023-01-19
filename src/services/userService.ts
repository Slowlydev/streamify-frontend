import { FetchResponse } from '../types/fetch.type';
import { User } from '../types/user.type';
import { fetch } from './fetch';

export const getUser = (id: User['id'], controller?: AbortController): Promise<FetchResponse<User>> => {
	return fetch<User>('get', `/user/${id}`, null, { signal: controller?.signal });
};
