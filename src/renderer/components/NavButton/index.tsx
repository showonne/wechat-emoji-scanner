import classNames from 'classnames';

interface NavButtonProps {
  onClick? : () => void;
  children : React.ReactNode;
  active : boolean;
}

export const NavButton = ({ onClick, children, active } : NavButtonProps) => {

  return (
    <div
      onClick={() => onClick?.()}
      className={classNames([
        'text-center w-full px-4 py-2 rounded-md cursor-pointer transition-all border border-solid text-[#959595]',
        active && 'bg-[#2b2b2b]',
        active ? 'border-[#626262] text-white' : 'border-transparent',
        'hover:bg-[#2b2b2b] hover:text-white hover:border-[#626262]',
      ])}
    >
      {children}
    </div>
  );
};
