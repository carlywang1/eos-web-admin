import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { setLanguage } from '../../i18n';
import styles from './TopNav.module.css';

interface TopNavProps {
  onSearchClick: () => void;
}

export function TopNav({ onSearchClick }: TopNavProps) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMenu]);

  const handleLogout = () => {
    setShowMenu(false);
    logout();
    navigate('/login');
  };

  const toggleLang = () => {
    setLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <span className={styles.logo}>EOS</span>
        <span className={styles.divider} />
        <NavLink to="/v1" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          {t('nav.myProjects')}
        </NavLink>
        <NavLink to="/v1/templates" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          {t('nav.myTemplates')}
        </NavLink>
      </div>
      <div className={styles.right}>
        <div className={styles.searchBar} onClick={onSearchClick}>
          <span className="material-icons-outlined">search</span>
          <input type="text" placeholder={t('nav.searchPlaceholder')} readOnly />
          <kbd className={styles.kbd}>Ctrl+K</kbd>
        </div>
        <button
          onClick={toggleLang}
          style={{ border: '1px solid #e8eaed', borderRadius: '100px', padding: '4px 10px', fontSize: '12px', background: 'transparent', cursor: 'pointer', color: '#5f6368', marginRight: '8px' }}
        >
          {i18n.language === 'zh' ? 'EN' : '中'}
        </button>
        <div className={styles.avatarWrap} ref={menuRef}>
          <div className={styles.avatar} onClick={() => setShowMenu(!showMenu)}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          {showMenu && (
            <div className={styles.userMenu}>
              <div className={styles.menuUser}>{user?.email}</div>
              <button className={styles.menuItem} onClick={handleLogout}>
                <span className="material-icons-outlined">logout</span>
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
