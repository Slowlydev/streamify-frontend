import { ReactElement, useEffect } from 'react';
import useVideos from '../../hooks/useVideos';
import { useLayoutProvider } from '../../providers/LayoutProvider/LayoutProvider';

import styles from './HomePage.module.css';
import pages from '../../common/styles/pages.module.css';

import Video from '../../components/Video/Video';

const HomePage = (): ReactElement => {
	const { setTitle } = useLayoutProvider();
	const { videos } = useVideos({});

	useEffect(() => {
		setTitle('Home');
	}, [setTitle]);

	return (
		<main className={pages.wrapper}>
			<div className={styles.videoContainer}>
				{videos && videos.map((video) => <Video key={`video.${video.id}`} video={video} />)}
			</div>
		</main>
	);
};

export default HomePage;
