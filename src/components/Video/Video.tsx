import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageFetch } from '../../services/image';
import { Video as VideoType } from '../../types/video.type';
import { comparativeTime } from '../../utils/date.util';
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
			const { data } = await imageFetch(`/video/${video.id}/thumbnail`);
			setImg(data);
		};
		const fetchProfile = async (): Promise<void> => {
			const { data } = await imageFetch(`/user/${video.user.id}/profile-image`);
			setProfile(data);
		};
		fetchImage();
		fetchProfile();
	}, [video]);

	return (
		<div className={styles.video}>
			<img className={styles.thumbnail} src={img} alt="thumbnail" onClick={() => navigate(`/video/${video.id}`)} />
			<div className={styles.videoInfo} onClick={() => navigate(`/user/${video.user.id}`)}>
				<img src={profile} alt="profile" />
				<div>
					<p className={styles.title}>{video.title}</p>
					<p className={styles.username}>{video.user.username}</p>
					<p className={styles.info}>
						{video.likes} Likes - {comparativeTime(new Date(), new Date(video.createdAt))}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Video;
