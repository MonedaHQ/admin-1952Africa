import { AiOutlineMenu } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import styles from '../styles/header.module.css';
import { useMenuToggle } from '../../context/MenuToggleContext';

function Header() {
  const { isSidebarOpen, toggleSidebar } = useMenuToggle();
  console.log(isSidebarOpen);
  return (
    <header className={styles.header}>
      <div className={styles.avatar}>
        <img src="/images/defaultAvatar.png" alt="User image" />
      </div>
      <button className={styles.menuIcon} onClick={() => toggleSidebar()}>
        {isSidebarOpen ? <RxCross1 /> : <AiOutlineMenu />}
      </button>
    </header>
  );
}

export default Header;
