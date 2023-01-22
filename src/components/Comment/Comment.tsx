import { ReactElement } from 'react';
import { Comment as CommentType } from '../../types/comment.type';
import ProfileImage from '../ProfileImage/ProfileImage';

import styles from './Comment.module.css';

type Props = {
	comment: CommentType;
};

const Comment = ({ comment }: Props): ReactElement => {
	return (
		<div className={styles.comment}>
			<ProfileImage user={comment.user} />

			<div className={styles.commentContent}>
				<div>
					<h3>{comment.user.username}</h3>
					<p>{comment.content}</p>
				</div>

				<div>
					<p>{new Date(comment.createdAt).toLocaleString()}</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
