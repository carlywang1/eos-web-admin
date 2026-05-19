import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>EOS</div>
      <nav className={styles.nav}>
        <NavLink to="/projects" end className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className="material-icons-outlined">folder_open</span>
          {t('nav.myProjects')}
        </NavLink>
        <NavLink to="/templates" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className="material-icons-outlined">description</span>
          {t('nav.myTemplates')}
        </NavLink>
      </nav>
      <div className={styles.footer}>
        <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase() || 'U'}</div>
        <span className={styles.userName}>{user?.name || 'User'}</span>
        <button className={styles.logoutBtn} onClick={handleLogout} title={t('nav.logout')}>
          <span className="material-icons-outlined">logout</span>
        </button>
      </div>
    </aside>
  );
}
