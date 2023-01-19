type Config = {
	stage: 'localhost' | 'development' | 'production';
	backendUrl: string;
	frontendUrl: string;
};

const validateConfig = (): Config => {
	if (!process.env.REACT_APP_PORT) {
		throw new Error('no port specified');
	}

	if (!process.env.REACT_APP_STAGE) {
		throw new Error('no stage specified');
	}

	if (process.env.REACT_APP_STAGE === 'localhost') {
		return {
			stage: 'localhost',
			backendUrl: 'http://localhost:4000/api',
			frontendUrl: 'http://localhost:3000',
		};
	}

	if (process.env.REACT_APP_STAGE === 'development') {
		return {
			stage: 'development',
			backendUrl: 'http://to.be.determined.com/api',
			frontendUrl: 'http://to.be.determined.com',
		};
	}

	if (process.env.REACT_APP_STAGE === 'production') {
		return {
			stage: 'production',
			backendUrl: 'https://to.be.determined.com/api',
			frontendUrl: 'https://to.be.determined.com',
		};
	}

	throw new Error(`unknown stage ${process.env.REACT_APP_STAGE}`);
};

const config = validateConfig();

export { config };
