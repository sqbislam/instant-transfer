import React from "react";
import { useState } from "react";
import { Divider, Radio } from "antd";
import ImageUpload from "./ImageUpload";
import TextUpload from "./TextUpload";

const UploadType = {
	Text: "Text",
	Image: "Image",
	PDF: "PDF",
};

const HomeChooser = (props) => {
	const [uploadType, setUploadType] = useState(UploadType.Text);
	const onChange = (e) => {
		setUploadType(e.target.value);
	};

	return (
		<div style={{ padding: "2em 0px" }}>
			<Radio.Group
				onChange={onChange}
				defaultValue={UploadType.Text}
				value={uploadType}>
				{Object.keys(UploadType).map((item) => (
					<Radio.Button key={item} value={item}>
						{item}
					</Radio.Button>
				))}
			</Radio.Group>

			<Divider />

			<div
				style={{
					padding: "1em 0px",
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<div style={{ width: "500px" }}>
					{uploadType === UploadType.Text ? (
						<TextUpload />
					) : uploadType === UploadType.Image ? (
						<ImageUpload />
					) : (
						<div />
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeChooser;
