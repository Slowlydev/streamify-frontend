import { ReactElement, useState } from 'react';
import { Formik, FormikHelpers, FormikState } from 'formik';
import * as Yup from 'yup';

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

type InitialValues = {
	content: string;
};

type Props = {
	video: Video;
};

const CommentSection = ({ video }: Props): ReactElement => {
	const { user } = useAuth();
	const { addSuccess, addFailure } = useNotifications();
	const { comments, isLoading, hasError } = useComments({ video });

	const handleNewComment = async (values: InitialValues): Promise<void> => {
		try {
			await createComment(video.id, { content: values.content });
			addSuccess('Successfully added comment');
		} catch (_) {
			addFailure('Failed to add comment');
		}
	};

	const initialValues: InitialValues = {
		content: '',
	};

	const validationSchema = Yup.object().shape({
		content: Yup.string()
			.required('U need to type at least 8 characters to create a comment')
			.min(8, 'U need to at least use 8 characters to create a comment')
			.max(512, 'U can not create a comment longer than 512 characters'),
	});

	return (
		<section>
			{isLoading && <LoadingSpinner size="large" />}
			{hasError && <ErrorState size="large" />}

			{user ? (
				<div className={styles.newComment}>
					<ProfileImage user={user} />
					<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleNewComment}>
						{({
							values,
							errors,
							touched,
							isValid,
							submitCount,
							isSubmitting,
							handleSubmit,
							setFieldValue,
							setFieldTouched,
						}) => {
							return (
								<form className={styles.newCommentContent} onSubmit={handleSubmit}>
									<Textarea
										value={values.content}
										onChange={(e) => setFieldValue('content', e.target.value)}
										onBlur={() => setFieldTouched('content', true)}
										placeholder="Type here to post a new comment"
									/>
									{touched.content && !!errors.content && <div className={styles.validation}>{errors.content}</div>}

									{values.content.length > 7 && (
										<Button
											type={'submit'}
											text="Post"
											color="blue"
											loading={isSubmitting}
											disabled={!isValid && (submitCount > 0 || isSubmitting)}
										/>
									)}
								</form>
							);
						}}
					</Formik>
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
