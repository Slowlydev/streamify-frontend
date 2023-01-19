import { useCallback, useEffect, useState } from 'react';
import { getUser } from '../services/userService';
import { User } from '../types/user.type';

type Props = {
	id?: User['id'];
};

type ReturnType = {
	user: User | undefined | null;
	isLoading: boolean;
	hasError: boolean;
	reloadUser: (silent?: boolean) => Promise<void>;
};

const useUser = ({ id }: Props): ReturnType => {
	const [user, setUser] = useState<User | undefined | null>();
	const [hasError, setHasError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchVideos = useCallback(
		async (controller?: AbortController, silent?: boolean) => {
			if (id) {
				try {
					!silent && setIsLoading(true);
					const { data } = await getUser(id, controller);
					setUser(data ?? null);
					!silent && setIsLoading(false);
					setHasError(false);
				} catch (err) {
					if (!controller?.signal.aborted) {
						setIsLoading(false);
						setHasError(true);
					}
				}
			}
		},
		[id],
	);

	const reloadUser = useCallback(
		async (silent?: boolean): Promise<void> => {
			await fetchVideos(undefined, silent);
		},
		[fetchVideos],
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchVideos(controller);
		return () => {
			controller.abort();
			setUser(undefined);
		};
	}, [fetchVideos, reloadUser]);

	return { user, isLoading, hasError, reloadUser };
};

export default useUser;
