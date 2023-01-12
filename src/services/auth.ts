import type { User } from "../types/user.type";
import { fetcher } from "./fetch";

export const getMe = async () => {
	return fetcher("get", "/auth/me");
};

export const signup = async (authUser: User) => {
	return fetcher<User>("post", "/auth/signup", authUser);
};

export const signin = async (authUser: User) => {
	return fetcher<{ access_token: string }>("post", "/auth/signin", authUser);
};
