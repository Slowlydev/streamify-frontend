import { Base } from './base.type';
import { User } from './user.type';

export type Video = Base & {
	title: string;
	description: string;
	views: number;
	likes: number;
	dislikes: number;
	user: User;
};
