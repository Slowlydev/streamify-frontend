import type { Base } from "./base.type";
import type { User } from "./user.type";

export type Video = Base & {
	title: string;
	description: string;
	//source: string;
	likes: number;
	dislikes: number;
	user?: User;
};
