import classNames from 'classnames';

export const NavButton = ({ onClick, children, active }) => {

  return (
    <div
      onClick={() => onClick?.()}
      className={classNames([
        'text-center w-full px-4 py-2 rounded-md cursor-pointer transition-all border border-solid',
        active && 'bg-[#2b2b2b]',
        active ? 'border-[#626262] text-white' : 'border-transparent text-[#959595]',
        'hover:bg-[#2b2b2b] hover:text-white hover:border-[#626262]',
      ])}
    >
      {children}
    </div>
  );
};
