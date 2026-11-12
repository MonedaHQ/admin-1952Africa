import { NavLink, useLocation } from 'react-router-dom';
import {
  PiHouseSimpleBold,
  PiHouseSimpleFill,
  PiChartPieFill,
  PiPaletteFill,
  PiPaletteBold,
  PiCalendarBlankFill,
  PiCalendarBlankBold,
  PiUserCircleBold,
  PiUserCircleFill,
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

  const currentUser = JSON.parse(localStorage.getItem('1952adminUser') || 'null');
  const isAdmin = currentUser?.role?.toLowerCase() === 'superadmin';

  const menuLinks = [
    {
      label: 'Home',
      path: '/home',
      alternatePath: '/profile',
      permission: ['admin', 'editor'],
      iconActive: <PiHouseSimpleFill />,
      iconInactive: <PiHouseSimpleBold />,
    },
    {
      label: 'Programs',
      path: '/programs',
      alternatePath: '/activities',
      permission: ['admin', 'editor'],
      iconActive: <PiChartPieFill />,
      iconInactive: <PiChartPieFill />,
    },
    {
      label: 'Artists',
      path: '/artists',
      alternatePath: '',
      permission: ['admin', 'editor'],
      iconActive: <PiPaletteFill />,
      iconInactive: <PiPaletteBold />,
    },
    {
      label: 'Events',
      path: '/events',
      alternatePath: '',
      permission: ['admin', 'editor'],
      iconActive: <PiCalendarBlankFill />,
      iconInactive: <PiCalendarBlankBold />,
    },
    {
      label: 'Gallery',
      path: '/gallery',
      alternatePath: '/work',
      permission: ['admin', 'editor'],
      iconActive: <LuGalleryVerticalEnd />,
      iconInactive: <LuGalleryVerticalEnd />,
    },
  ];

  const menuList = isAdmin
    ? [
        ...menuLinks,
        {
          label: 'Users',
          path: '/users',
          alternatePath: '',
          permission: ['admin'],
          iconActive: <PiUserCircleFill />,
          iconInactive: <PiUserCircleBold />,
        },
      ]
    : menuLinks;

  return (
    <>
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.open : styles.close
        }`}
      >
        <div className={styles.logo}>
          <img
            src="/images/1952-logo-dark.png"
            alt="1952 Logo"
            draggable="false"
          />
          <div>
            <strong>1952 Africa</strong>
            <span>Admin studio</span>
          </div>
        </div>
        <nav className={styles.menuLinks} ref={ref}>
          {menuList.map((link) => (
            <NavLink
              to={link.path}
              key={link.label}
              onClick={() => closeSidebar()}
              className={`${styles.links} ${
                (currentPath.startsWith(link.path) ||
                  (currentPath.startsWith(link.alternatePath) &&
                    link.alternatePath !== '')) &&
                styles.active
              }`}
            >
              {currentPath.startsWith(link.path) ||
              (currentPath.startsWith(link.alternatePath) &&
                link.alternatePath !== '')
                ? link.iconActive
                : link.iconInactive}{' '}
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
