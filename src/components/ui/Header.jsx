import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { useMenuToggle } from '../../context/MenuToggleContext';

import styles from '../styles/header.module.css';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSidebarOpen, toggleSidebar } = useMenuToggle();
  const user = JSON.parse(localStorage.getItem('1952adminUser') || 'null');

  const imageSrc = user?.image_url
    ? user.image_url
    : '/images/defaultAvatar.jpg';

  const section = pathname.split('/').filter(Boolean)[0] || 'home';
  const title = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <header className={styles.header}>
      <button className={styles.menuIcon} onClick={() => toggleSidebar()}>
        {isSidebarOpen ? <RxCross1 /> : <AiOutlineMenu />}
      </button>
      <div className={styles.context}>
        <span>1952 Africa</span>
        <strong>{title}</strong>
      </div>
      <div className={styles.userArea}>
        <div className={styles.userCopy}>
          <strong>{user?.first_name || 'Administrator'}</strong>
          <span>{user?.role || 'Team member'}</span>
        </div>
        <button className={styles.avatar} onClick={() => navigate('/profile')} aria-label="Open profile">
          <img src={imageSrc} alt="User profile" draggable="false" />
        </button>
      </div>
    </header>
  );
}

export default Header;
