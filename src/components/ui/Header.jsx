import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { useMenuToggle } from '../../context/MenuToggleContext';

import styles from '../styles/header.module.css';
import { usersData } from '../../data/programsData';

function Header() {
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useMenuToggle();
  const user = JSON.parse(localStorage.getItem('1952adminUser'));

  const imageSrc = user?.image_url
    ? user.image_url
    : '/images/defaultAvatar.jpg';

  return (
    <header className={styles.header}>
      <button className={styles.menuIcon} onClick={() => toggleSidebar()}>
        {isSidebarOpen ? <RxCross1 /> : <AiOutlineMenu />}
      </button>
      <button className={styles.avatar} onClick={() => navigate('/profile')}>
        <img src={imageSrc} alt="User image" draggable="false" />
      </button>
    </header>
  );
}

export default Header;
