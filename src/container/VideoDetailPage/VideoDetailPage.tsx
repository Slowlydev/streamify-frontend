import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pages from '../../common/styles/pages.module.css';
import { videoFetch } from '../../services/video';
import { getVideo } from '../../services/videoService';
import { Video } from '../../types/video.type';
import LoadingPage from '../LoadingPage/LoadingPage';
import styles from './VideoDetailPage.module.css';

const VideoDetailPage = (): ReactElement => {
	const [vid, setVid] = useState<string>();
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
			if (video) {
				try {
					const { data } = await videoFetch(`/video/${video.id}/stream`);
					setVid(data);
				} catch (err) {
					console.error(err);
				}
			}
		};

		fetchVideo(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, navigate]);

	if (!video) return <LoadingPage />;

	return (
		<main className={pages.wrapper}>
			<h1>{video.title}</h1>
			{/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
			<video controls className={styles.video} src={vid} />
		</main>
	);
};

export default VideoDetailPage;
