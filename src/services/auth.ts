import type { AuthUser } from "../types/user.type";
import { fetch } from "./fetch";

export const getMe = async () => {
	return fetch("get", "/auth/me");
};

export const signup = async (authUser: AuthUser) => {
	return fetch("post", "/auth/signup", authUser);
};

export const signin = async (authUser: AuthUser) => {
	return fetch("post", "/auth/signin", authUser);
};
