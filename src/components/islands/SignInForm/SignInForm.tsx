import { ReactElement, useState } from "react";
import { signin } from "../../../services/auth";

import styles from "./SignInForm.module.css";

const SignInForm = (): ReactElement => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSignin = async () => {
		const req = await signin({ username, password });
		localStorage.setItem("access_token", req.data.access_token);
	};

	return (
		<div className={styles.form}>
			<input placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)} />
			<input placeholder="password" value={password} type="password" onChange={(event) => setPassword(event.target.value)} />

			<button onClick={handleSignin}>Signin</button>
		</div>
	);
};

export default SignInForm;
