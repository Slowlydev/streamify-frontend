import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../../common/config/config';

import styles from './VideoDetailPage.module.css';
import pages from '../../common/styles/pages.module.css';

import { getVideo } from '../../services/videoService';
import { Video } from '../../types/video.type';
import LoadingPage from '../LoadingPage/LoadingPage';

const VideoDetailPage = (): ReactElement => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [video, setVideo] = useState<Video>();

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
		<main className={pages.wrapper}>
			<h1>{video.title}</h1>
			{/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
			<video controls className={styles.video} src={`${config.backendUrl}/video/${video.id}/stream`} />
		</main>
	);
};

export default VideoDetailPage;
