import { ReactElement } from 'react';
import { config } from '../../common/config/config';
import { Video as VideoType } from '../../types/video.type';
import styles from './Video.module.css';

type Props = {
	video: VideoType;
};

const Video = ({ video }: Props): ReactElement => {
	return (
		<div className={styles.video}>
			<img className={styles.thumbnail} src={`${config.backendUrl}/video/${video.id}/thumbnail`} alt="thumbnail" />
			<div className={styles.videoInfo}>
				<img alt="profile" />
				<div>
					<p className={styles.title}>{video.title}</p>
					<p className={styles.username}>{video.user.username}</p>
					<p className={styles.info}>{video.likes} Likes - TODO</p>
				</div>
			</div>
		</div>
	);
};

export default Video;
