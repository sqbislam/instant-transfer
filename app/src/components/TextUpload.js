import { Input } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;

const TextUpload = () => {
	const [value, setValue] = useState("");

	return (
		<>
			<TextArea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Controlled autosize"
				autoSize={{ minRows: 3, maxRows: 5 }}
			/>
		</>
	);
};

export default TextUpload;
