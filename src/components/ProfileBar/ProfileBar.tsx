import { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import logoutIcon from '../../assets/icons/logout.svg';

import styles from './ProfileBar.module.css';
import { config } from '../../common/config/config';
import { image } from '../../services/image';

const ProfileBar = (): ReactElement | null => {
	const [profile, setProfile] = useState<string>();

	const { user, clearUser } = useAuth();

	const location = useLocation();
	const navigate = useNavigate();

	const handleClearUser = (): void => {
		clearUser();
		navigate('/auth/signin');
	};

	useEffect(() => {
		if (user) {
			const fetchProfile = async (): Promise<void> => {
				const { data } = await image(`/user/${user.id}/profile-image`);
				setProfile(data);
			};
			fetchProfile();
		}
	}, [user]);

	if (location.pathname.includes('auth')) return null;

	return (
		<header>
			<div>
				<Link className={styles.title} to={'/'}>
					Streamify
				</Link>

				{user ? (
					<div className={styles.profile}>
						<img src={profile} alt="profile" />
						<div>
							<p className={styles.username}>{user.username}</p>
						</div>
					</div>
				) : (
					<LoadingSpinner size="small" />
				)}

				<img src={logoutIcon} alt="logout" className={styles.logout} onClick={handleClearUser} />
			</div>
		</header>
	);
};

export default ProfileBar;
