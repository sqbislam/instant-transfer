import { Input, Button } from "antd";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import TextAreaField from "../common/TextArea";
import API from "../core/http/api";

const { TextArea } = Input;

const TextUpload = () => {
	const [value, setValue] = useState("");

	return (
		<>
			<Formik
				initialValues={{
					content: "",
					pin: "",
				}}
				onSubmit={async (values) => {
					const response = await API({
						method: "post",
						url: "file/create",
						values,
					});
					console.debug(response);

					// alert(JSON.stringify(values, null, 2));
				}}>
				<Form>
					<label htmlFor="content">First Name</label>
					<Field
						id="content"
						name="content"
						placeholder="Type your text here..."
						component={TextAreaField}
					/>
					<Field
						id="pin"
						name="pin"
						placeholder="Type a random PIN code."
					/>

					<Button htmlType="submit">Submit</Button>
				</Form>
			</Formik>
		</>
	);
};

export default TextUpload;
