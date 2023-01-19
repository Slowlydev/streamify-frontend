import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import logoutIcon from '../../assets/icons/logout.svg';

import styles from './ProfileBar.module.css';

const ProfileBar = (): ReactElement | null => {
	const { user, clearUser } = useAuth();

	const location = useLocation();
	const navigate = useNavigate();

	const handleClearUser = (): void => {
		clearUser();
		navigate('/auth/signin');
	};

	if (location.pathname.includes('auth')) return null;

	return (
		<header>
			<div>
				<p className={styles.title}>Streamify</p>

				{user ? (
					<div className={styles.profile}>
						<img
							src="https://wallpapers.com/images/featured/cool-profile-pictures-4co57dtwk64fb7lv.webp"
							alt="profile"
						/>
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
