import React from 'react';
import './App.less';
import { Button, Layout } from 'antd';
import HomeChooser from './components/HomeChooser'

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <div className="App" style={{height:"100vh"}}>
        <Layout style={{height:"100%"}}>
          <Header></Header>
          <Content  style={{ padding: '0 50px', height:"100%" }}>   
            <HomeChooser />
            <Button>Click Me!</Button>
          </Content>
        </Layout>
    </div>
  );
}

export default App;
