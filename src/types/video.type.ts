import { Base } from './common.type';
import { User } from './user.type';

export type Video = Base & {
	title: string;
	description: string;
	likes: number;
	dislikes: number;
	user: User;
};