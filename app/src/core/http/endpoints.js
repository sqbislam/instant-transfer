import { ResourceIdentifiers, HttpMethods, HTTPActions } from "./httpResources";

fileAuthEndpoints = {
	file_create: {
		path: `/${ResourceIdentifiers.file}/${HTTPActions.create}`,
		type: HttpMethods.POST,
		isAuthenticated: true,
	},
	file_authenticate: {
		path: `/${ResourceIdentifiers.file}/${HTTPActions.update}`,
		type: HttpMethods.POST,
		isAuthenticated: true,
	},
	file_recieve: {
		path: `/${ResourceIdentifiers.file}/${HTTPActions.retrieve}`,
		type: HttpMethods.GET,
		isAuthenticated: true,
	},
};
