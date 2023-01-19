import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../../common/config/config';
import pages from '../../common/styles/pages.module.css';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import { getVideo } from '../../services/videoService';
import { Video } from '../../types/video.type';
import { cl } from '../../utils/classnames.util';
import LoadingPage from '../LoadingPage/LoadingPage';
import styles from './VideoDetailPage.module.css';

const VideoDetailPage = (): ReactElement => {
	const [video, setVideo] = useState<Video>();

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			navigate('*');
			return;
		}
		const fetchVideo = async (videoId: string): Promise<void> => {
			const { data } = await getVideo(videoId);
			setVideo(data);
		};
		fetchVideo(id);
	}, [id, navigate]);

	if (!video) return <LoadingPage />;

	return (
		<main className={cl(pages.topWrapper, pages.wrapper)}>
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
		</main>
	);
};

export default VideoDetailPage;
