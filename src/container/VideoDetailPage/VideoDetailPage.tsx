import { ReactElement, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../../common/config/config';
import pages from '../../common/styles/pages.module.css';
import CommentSection from '../../components/CommentSection/CommentSection';
import ErrorState from '../../components/ErrorState/ErrorState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import useVideo from '../../hooks/useVideo';
import { cl } from '../../utils/classnames.util';
import styles from './VideoDetailPage.module.css';

const VideoDetailPage = (): ReactElement => {
	const { id } = useParams();
	const { video, isLoading, hasError } = useVideo({ id });

	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			navigate('*');
			return;
		}
	}, [id, navigate]);

	return (
		<main className={cl(pages.topWrapper, pages.wrapper)}>
			{isLoading && <LoadingSpinner size={'large'} />}
			{hasError && <ErrorState size={'large'} />}
			{video && (
				<>
					{/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
					<video controls className={styles.video} src={`${config.backendUrl}/video/${id}/stream`} />

					<div className={styles.videoInfoContainer}>
						<div className={styles.videoInfo}>
							<h1>{video.title}</h1>
							<p>{video.description}</p>
						</div>

						<div>
							<p>Views: {video.views}</p>
							<p>Likes: {video.likes}</p>
							<p>Dislikes: {video.dislikes}</p>
						</div>
					</div>

					<div className={styles.profileInfo}>
						<ProfileImage user={video.user} />
						<div>
							<p>{video.user.username}</p>
						</div>
					</div>

					<h2 className={styles.commentsTitle}>Comments</h2>
					<CommentSection video={video} />
				</>
			)}
		</main>
	);
};

export default VideoDetailPage;
