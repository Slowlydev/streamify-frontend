import { Base } from './common.type';
import { User } from './user.type';

export type Signin = {
	access_token: string;
};

export type Signup = Base &
	Pick<User, 'username'> & {
		password: string;
	};
