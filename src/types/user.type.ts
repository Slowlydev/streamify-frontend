import type { Base } from "./base.type";

export type AuthUser = {
	username: string;
	password: string;
};

export type User = Base & {
	username: string;
	language: string;
	theme: string;
};
