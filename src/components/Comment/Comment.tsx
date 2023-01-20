import { ReactElement } from 'react';
import { Comment as CommentType } from '../../types/comment.type';
import ProfileImage from '../ProfileImage/ProfileImage';

type Props = {
	comment: CommentType;
};

const Comment = ({ comment }: Props): ReactElement => {
	return (
		<div>
			<ProfileImage user={comment.user} />

			<div>
				<h3>{comment.user.username}</h3>
				<p>{comment.content}</p>
			</div>

			<div>
				<p>{new Date(comment.createdAt).toISOString()}</p>
			</div>
		</div>
	);
};

export default Comment;
