import "./App.less";
import React from "react";
import { useState } from "react";
import { Layout, Menu } from "antd";
import HomeChooser from "./components/HomeChooser";
import { Typography } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	DownloadOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import Logo from "./images/logo-dark.svg";
import { getStatusClassNames } from "antd/lib/_util/statusUtils";
import classnames from "classnames";

const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [state, setState] = useState("Upload File");

	return (
		<div className="App" style={{ height: "100vh" }}>
			<Layout style={{ height: "100%" }}>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<img
						className={classnames("logo", {
							"logo-mini": collapsed,
						})}
						src={Logo}
					/>

					<Menu
						theme="dark"
						mode="inline"
						onClick={(e) => {
							setState(e.key);
						}}
						defaultSelectedKeys={["Upload File"]}
						items={[
							{
								key: "Upload File",
								icon: <UploadOutlined />,
								label: "Upload File",
							},
							{
								key: "Recieve File",
								icon: <DownloadOutlined />,
								label: "Recieve File",
							},
						]}
					/>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background header">
						{React.createElement(
							collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: "trigger",
								onClick: () => setCollapsed(!collapsed),
							},
						)}
					</Header>
					<Content
						className="site-layout-background"
						style={{
							margin: "24px 16px",
							padding: 24,
							minHeight: 280,
						}}>
						<Title level={1}>{state}</Title>
						<HomeChooser />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default App;
