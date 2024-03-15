import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useMatch,
  useMatches,
  redirect,
  Navigate,
} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { Index } from './pages/index';
import { Setting } from './pages/setting';
import { NavButton } from './components/NavButton';
import { ConfigProvider } from 'antd';
import { About } from './pages/about';

const Layout = () => {
  const navigate = useNavigate();
  const match = useMatch('/:path') ?? {};
  const { pathname } = match;

  const navPage = (route: string) => {
    navigate(route);
  };

  return (
    <div className="h-full w-full bg-[#151515] px-[12px] py-[12px]">
      <div className="flex gap-2 justify-between h-[52px] pb-[12px]">
        <NavButton
          onClick={() => navPage('/scan')}
          active={pathname === '/scan'}
        >
          Scan Emoji
        </NavButton>
        <NavButton
          onClick={() => navPage('/setting')}
          active={pathname === '/setting'}
        >
          Setting
        </NavButton>
        <NavButton
          onClick={() => navPage('/about')}
          active={pathname === '/about'}
        >
          About
        </NavButton>
      </div>
      <div
        style={{
          height: 'calc(100% - 52px)',
          overflow: 'auto',
          paddingTop: 12,
        }}
        id="content-router-view"
      >
        <Outlet />
      </div>
    </div>
  );
};

const token = {
  "colorPrimary": "#4e46dc",
  "colorInfo": "#4e46dc"
}

export default function App() {
  return (
    <ConfigProvider
      theme={{ token }}
    >
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
