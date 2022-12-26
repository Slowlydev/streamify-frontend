export type AuthUser = {
	username: string;
	password: string;
};

export type User = {
	language: string;
	theme: string;
} & AuthUser; // simylein surely likes this line
