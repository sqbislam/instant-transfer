import axios from "axios";

// Base config instance for axios
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 1000,
	headers: {
		Accept: "application/json",
		//'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
	},
});

export default instance;
