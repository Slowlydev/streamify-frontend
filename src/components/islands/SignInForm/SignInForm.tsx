import { ReactElement, useState } from "react";
import { signin } from "../../../services/auth";

import styles from "./SignInForm.module.css";

const SignInForm = (): ReactElement => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form className={styles.form}>
			<input placeholder="username" onChange={(event) => setUsername(event.target.value)} />
			<input placeholder="password" type="password" onChange={(event) => setPassword(event.target.value)} />

			<button onClick={() => signin({ username, password })}>Signin</button>
		</form>
	);
};

export default SignInForm;
