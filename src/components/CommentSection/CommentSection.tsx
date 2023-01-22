import { ReactElement, useState } from 'react';
import useComments from '../../hooks/useComments';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import { Video } from '../../types/video.type';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';
import ErrorState from '../ErrorState/ErrorState';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ProfileImage from '../ProfileImage/ProfileImage';
import Textarea from '../Textarea/Textarea';

import styles from './CommentSection.module.css';

type Props = {
	video: Video;
};

const CommentSection = ({ video }: Props): ReactElement => {
	const { comments, isLoading, hasError } = useComments({ video });

	const { user } = useAuth();

	const [newComment, setNewComment] = useState('');

	const handleNewComment = () => {
		console.log('new comment');
	};

	return (
		<section>
			{isLoading && <LoadingSpinner size="large" />}
			{hasError && <ErrorState size="large" />}

			{user ? (
				<div className={styles.newComment}>
					<ProfileImage user={user} />
					<div className={styles.newCommentContent}>
						<Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
						<Button onClick={handleNewComment} text="Post" color="blue" />
					</div>
				</div>
			) : (
				<LoadingSpinner size="small" />
			)}

			<div className={styles.commentsContainer}>
				{!isLoading &&
					!hasError &&
					comments &&
					comments.map((comment) => <Comment key={`comment.${comment.id}`} comment={comment} />)}
			</div>
		</section>
	);
};

export default CommentSection;
