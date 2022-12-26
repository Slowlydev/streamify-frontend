import type { User } from "../types/user.type";
import { fetch } from "./fetch";

export const updateUser = async (id: number, newUser: User) => {
	return fetch<User>("patch", `/user/${id}`, newUser);
};
