import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import HomePage from './container/HomePage/HomePage';
import NotFoundPage from './container/NotFoundPage/NotFoundPage';
import SigninPage from './container/SigninPage/SigninPage';
import SignupPage from './container/SignupPage/SignupPage';

const App = (): ReactElement => {
	return (
		<div className={'main-wrapper'}>
			<Routes>
				<Route path={'*'} element={<NotFoundPage />} />

				<Route path={'/'} element={<PrivateRoute />}>
					<Route path={'/'} element={<HomePage />} />
				</Route>

				<Route path={'/auth/signup'} element={<SignupPage />} />
				<Route path={'/auth/signin'} element={<SigninPage />} />
			</Routes>
		</div>
	);
};

export default App;
