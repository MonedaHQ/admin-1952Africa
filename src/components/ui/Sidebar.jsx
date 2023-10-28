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

import { LuGalleryVerticalEnd } from 'react-icons/lu';

import { useMenuToggle } from '../../context/MenuToggleContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';

import styles from '../styles/sidebar.module.css';

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
    {
      label: 'Gallery',
      path: '/gallery',
      iconActive: <LuGalleryVerticalEnd />,
      iconInactive: <LuGalleryVerticalEnd />,
    },
  ];

  return (
    <>
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
      {isSidebarOpen && <div className={styles.overlay} />}
    </>
  );
}

export default Sidebar;
