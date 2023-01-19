import { ReactElement } from 'react';
import useVideos from '../../hooks/useVideos';
import styles from './HomePage.module.css';

const HomePage = (): ReactElement => {
	const { videos } = useVideos({ filters: null });

	console.debug(videos);

	return (
		<div className={styles.wrapper}>
			<h1>TODO: Home Page</h1>
		</div>
	);
};

export default HomePage;
