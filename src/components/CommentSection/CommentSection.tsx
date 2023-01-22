import { ReactElement, useState } from 'react';
import useComments from '../../hooks/useComments';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import { useNotifications } from '../../providers/NotificationProvider/NotificationProvider';
import { createComment } from '../../services/commentService';
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
	const { user } = useAuth();
	const { addSuccess, addFailure } = useNotifications();
	const { comments, isLoading, hasError } = useComments({ video });

	const [newComment, setNewComment] = useState('');

	const handleNewComment = async (): Promise<void> => {
		try {
			await createComment(video.id, { content: newComment });
			addSuccess('Successfully added comment');
			setNewComment('');
		} catch (_) {
			addFailure('Failed to add comment');
		}
	};

	return (
		<section>
			{isLoading && <LoadingSpinner size="large" />}
			{hasError && <ErrorState size="large" />}

			{user ? (
				<div className={styles.newComment}>
					<ProfileImage user={user} />
					<div className={styles.newCommentContent}>
						<Textarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder="Type here to post a new comment"
						/>
						{newComment.length > 7 && <Button onClick={handleNewComment} text="Post" color="blue" />}
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
