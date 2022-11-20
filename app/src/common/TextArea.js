import { Input } from "antd";
const { TextArea } = Input;
const TextAreaField = ({ field, form, ...props }) => {
	return <TextArea {...field} {...props} />;
};
export default TextAreaField;
