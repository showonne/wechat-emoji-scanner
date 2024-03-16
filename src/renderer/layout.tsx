import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { NavButton } from "./components/NavButton";

export const Layout = () => {
  const navigate = useNavigate();
  const match = useMatch('/:path') ?? { pathname: '' };
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