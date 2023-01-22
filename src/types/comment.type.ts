import { Base } from './base.type';
import { User } from './user.type';
import { Video } from './video.type';

export type Comment = Base & {
	content: string;
	user: User;
};

export type CreatedComment = Base & {
	content: string;
	user: User;
	video: Video;
};
