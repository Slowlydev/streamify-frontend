import type { User } from "../types/user.type";
import { fetcher } from "./fetch";

export const updateUser = async (id: number, newUser: User) => {
	return fetcher<User>("patch", `/user/${id}`, newUser);
};
