import { ReactElement, useState } from 'react';
import useComments from '../../hooks/useComments';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import { Comment as CommentType } from '../../types/comment.type';
import { Video } from '../../types/video.type';
import Comment from '../Comment/Comment';
import ErrorState from '../ErrorState/ErrorState';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ProfileImage from '../ProfileImage/ProfileImage';
import Textarea from '../Textarea/Textarea';

type Props = {
	video: Video;
};

const CommentSection = ({ video }: Props): ReactElement => {
	const { comments, isLoading, hasError } = useComments({ video });

	const { user } = useAuth();

	const [newComment, setNewComment] = useState('');

	return (
		<section>
			{isLoading && <LoadingSpinner size="large" />}
			{hasError && <ErrorState size="large" />}

			{user ? (
				<div>
					<ProfileImage user={user} />
					<Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
				</div>
			) : (
				<LoadingSpinner size="small" />
			)}

			<div>
				{!isLoading &&
					!hasError &&
					comments &&
					comments.map((comment) => <Comment key={`comment.${comment.id}`} comment={comment} />)}
			</div>
		</section>
	);
};

export default CommentSection;
