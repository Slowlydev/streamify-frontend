import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { image } from '../../services/image';
import { Video as VideoType } from '../../types/video.type';
import styles from './Video.module.css';

type Props = {
	video: VideoType;
};

const Video = ({ video }: Props): ReactElement => {
	const [img, setImg] = useState<string>();
	const [profile, setProfile] = useState<string>();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchImage = async (): Promise<void> => {
			const { data } = await image(`/video/${video.id}/thumbnail`);
			setImg(data);
		};
		const fetchProfile = async (): Promise<void> => {
			const { data } = await image(`/user/${video.user.id}/profile-image`);
			setProfile(data);
		};
		fetchImage();
		fetchProfile();
	}, [video]);

	return (
		<div className={styles.video} onClick={() => navigate(`/video/${video.id}`)}>
			<img className={styles.thumbnail} src={img} alt="thumbnail" />
			<div className={styles.videoInfo}>
				<img src={profile} alt="profile" />
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
