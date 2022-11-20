import React, { useState } from "react";

// Initial Root State.
const rootDefaultState = {
	file: {
		list: {},
		entity: {},
	},
};

const RootContext = React.createContext(rootDefaultState);

// This component will hold all the app ephemeral states at the root level.
const RootProvider = (props) => {
	const [rootState, setState] = useState(rootDefaultState);

	return (
		<RootContext.Provider value={rootState}>
			{props.children}
		</RootContext.Provider>
	);
};

export default RootProvider;
