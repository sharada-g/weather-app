import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  type NavItemProps = {
    name: string;
    link: string;
  };

  const NavItem = ({ name, link }: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === link;

    const navStyle = isActive
      ? "first-letter:underline first-letter:text-primary"
      : "";

    return (
      <NavLink to={link} className={`nav ${navStyle}`}>
        {name}
      </NavLink>
    );
  };

  return (
    <>
      <nav className="flex justify-center items-center gap-12 ">
        <NavItem name="Today" link="/" />
        <NavItem name="Hourly" link="/hourly" />
        <NavItem name="3 days" link="/forcast" />
      </nav>
    </>
  );
};

export default NavBar;
