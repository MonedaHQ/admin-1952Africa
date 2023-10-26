import { NavLink, useLocation } from 'react-router-dom';
import {
  PiHouseSimpleBold,
  PiHouseSimpleFill,
  PiChartPieFill,
  PiChartPieSliceFill,
  PiPaletteFill,
  PiPaletteBold,
  PiCalendarBlankFill,
  PiCalendarBlankBold,
} from 'react-icons/pi';

import styles from './styles/home.module.css';
import { useMenuToggle } from '../../../context/MenuToggleContext';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useMenuToggle();
  const location = useLocation();

  const ref = useOutsideClick(closeSidebar);
  const currentPath = location.pathname;

  const menuLinks = [
    {
      label: 'Home',
      path: '/home',
      iconActive: <PiHouseSimpleFill />,
      iconInactive: <PiHouseSimpleBold />,
    },
    {
      label: 'Programs',
      path: '/programs',
      iconActive: <PiChartPieSliceFill />,
      iconInactive: <PiChartPieFill />,
    },
    {
      label: 'Artists',
      path: '/artist',
      iconActive: <PiPaletteFill />,
      iconInactive: <PiPaletteBold />,
    },
    {
      label: 'Events',
      path: '/events',
      iconActive: <PiCalendarBlankFill />,
      iconInactive: <PiCalendarBlankBold />,
    },
  ];

  return (
    <aside
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.open : styles.close
      }`}
    >
      <div className={styles.logo}>
        <img src="/images/1952-logo-dark.png" alt="1952 Logo" />
      </div>
      <nav className={styles.menuLinks} ref={ref}>
        {menuLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.label}
            onClick={() => closeSidebar()}
            className={`${styles.links} ${
              currentPath === link.path && styles.active
            }`}
          >
            {currentPath === link.path ? link.iconActive : link.iconInactive}{' '}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
