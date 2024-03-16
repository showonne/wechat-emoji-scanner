import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Index } from './pages/index';
import { Setting } from './pages/setting';
import { ConfigProvider } from 'antd';
import { About } from './pages/about';
import { Layout } from './layout';

const token = {
  colorPrimary: '#4e46dc',
  colorInfo: '#4e46dc',
};

export default function App() {
  return (
    <ConfigProvider theme={{ token }}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate replace to="/scan" />} />
            <Route path="/scan" element={<Index />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}
