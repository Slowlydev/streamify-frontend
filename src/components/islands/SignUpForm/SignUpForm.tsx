import { ReactElement, useState } from "react";
import { signin, signup } from "../../../services/auth";
import type { FetchError } from "../../../types/fetch.type";

import styles from "./SignUpForm.module.css";

const SignUpForm = (): ReactElement => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async () => {
		try {
			await signup({ username, password });
			const { data } = await signin({ username, password });
			localStorage.setItem("access_token", data.access_token);
		} catch (err) {
			const error = err as FetchError;
			alert(error.reason);
		}
	};

	return (
		<div className={styles.form}>
			<input placeholder="username" onChange={(event) => setUsername(event.target.value)} />
			<input placeholder="password" type="password" onChange={(event) => setPassword(event.target.value)} />

			<button onClick={handleSignup}>Signup</button>
		</div>
	);
};

export default SignUpForm;
