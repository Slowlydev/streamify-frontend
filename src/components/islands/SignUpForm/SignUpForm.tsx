import { ReactElement, useState } from "react";
import { signup } from "../../../services/auth";

import styles from "./SignUpForm.module.css";

const SignUpForm = (): ReactElement => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form className={styles.form}>
			<input placeholder="username" onChange={(event) => setUsername(event.target.value)} />
			<input placeholder="password" type="password" onChange={(event) => setPassword(event.target.value)} />

			<button onClick={() => signup({ username, password })}>Signup</button>
		</form>
	);
};

export default SignUpForm;
