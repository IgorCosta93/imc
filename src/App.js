import { Layout } from 'antd';
import './App.css';
import { CardForm } from "./CardForm";
const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Content style={{ height:"100vh", backgroundColor: "#d8d6d6" }}>
        <div className="site-layout-content">
          <CardForm/>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
