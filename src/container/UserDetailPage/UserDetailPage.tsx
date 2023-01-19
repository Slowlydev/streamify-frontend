import { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserDetailPage.module.css';
import pages from '../../common/styles/pages.module.css';
import ErrorState from '../../components/ErrorState/ErrorState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useUser from '../../hooks/useUser';
import { imageFetch } from '../../services/image';
import Video from '../../components/Video/Video';
import { sumDislikes, sumLikes } from '../../utils/video.util';

const UserDetailPage = (): ReactElement | null => {
	const [profileImage, setProfileImage] = useState<string>();

	const { id } = useParams();
	const { user, videos, isLoading, hasError } = useUser({ id });

	useEffect(() => {
		const fetchProfile = async (): Promise<void> => {
			const { data } = await imageFetch(`/user/${id}/profile-image`);
			setProfileImage(data);
		};
		fetchProfile();
	}, [id]);

	return (
		<main className={pages.topWrapper}>
			{isLoading && <LoadingSpinner size={'large'} />}
			{hasError && <ErrorState size={'large'} />}
			{user && videos && !isLoading && !hasError && (
				<>
					<section className={styles.profileSection}>
						<div className={pages.wrapper}>
							<div className={styles.profileInfo}>
								<img className={styles.profile} alt="profile" src={profileImage} />
								<div>
									<h1>{user.username}</h1>
									<p>{`Likes: ${sumLikes(videos)}`}</p>
									<p>{`Dislikes: ${sumDislikes(videos)}`}</p>
								</div>
							</div>
						</div>
					</section>
					<div className={pages.wrapper}>
						<div className={styles.videoWrapper}>
							{videos.map((video) => (
								<Video key={`user.video.${video.id}`} video={video} />
							))}
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default UserDetailPage;
