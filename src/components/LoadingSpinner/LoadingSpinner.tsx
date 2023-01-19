import { ReactElement } from 'react';

type Props = {
	size: 'small' | 'large';
};

const LoadingSpinner = ({ size }: Props): ReactElement | null => {
	if (size === 'small') {
		return <p>loading...</p>;
	}

	if (size === 'large') {
		return <h1>loading...</h1>;
	}

	return null;
};

export default LoadingSpinner;
