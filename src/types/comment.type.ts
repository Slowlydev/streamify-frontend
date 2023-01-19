import { Base } from './base.type';
import { User } from './user.type';

export type Comment = Base & {
	content: string;
	user: User;
};
