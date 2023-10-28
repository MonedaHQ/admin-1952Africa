import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { useMenuToggle } from '../../context/MenuToggleContext';

import styles from '../styles/header.module.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useMenuToggle();
  return (
    <header className={styles.header}>
      <button className={styles.menuIcon} onClick={() => toggleSidebar()}>
        {isSidebarOpen ? <RxCross1 /> : <AiOutlineMenu />}
      </button>
      <button className={styles.avatar} onClick={() => navigate('/profile')}>
        <img
          src="/images/defaultAvatar.jpg"
          alt="User image"
          draggable="false"
        />
      </button>
    </header>
  );
}

export default Header;
