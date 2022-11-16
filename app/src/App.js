import React from "react";
import "./App.less";
import { Layout } from "antd";
import HomeChooser from "./components/HomeChooser";
import { Typography } from "antd";

const { Title } = Typography;
const { Header, Content } = Layout;
function App() {
	return (
		<div className="App" style={{ height: "100vh" }}>
			<Layout style={{ height: "100%" }}>
				<Header>
					<Title level={1} style={{ color: "#FFF" }}>
						Instant Transfer
					</Title>
				</Header>
				<Content style={{ padding: "0 50px", height: "100%" }}>
					<HomeChooser />
				</Content>
			</Layout>
		</div>
	);
}

export default App;
