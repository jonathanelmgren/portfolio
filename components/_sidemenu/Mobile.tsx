interface Props {
  openMenu: any;
  menuState: boolean;
  children: React.ReactNode;
}

export const MobileNav = ({ openMenu, menuState, children }: Props) => {
  return (
    <>
      <div
        className="cursor-pointer top-0 fixed z-50 bg-primary"
        onClick={() => openMenu(!menuState)}
      >
        <svg
          id="burgericon"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="45"
        >
          <g className="icon">
            <rect
              className="frstbar"
              x="10"
              y="10"
              width="30"
              height="5"
              fill="#fff"
            />
            <rect
              className="scndbar"
              x="10"
              y="20"
              width="30"
              height="5"
              fill="#fff"
            />
            <rect
              className="thrdbar"
              x="10"
              y="30"
              width="30"
              height="5"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
      <div
        className={`fixed inset-0 h-full w-60 bg-primary z-50 transition-all -translate-x-full${menuState ? "translate-x-0" : ""}`}
      >
        <svg
          className="fill-white ml-auto m-3 cursor-pointer"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          onClick={() => openMenu(false)}
        >
          <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
        </svg>
        {children}
      </div>
    </>
  );
};
