import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { SearchOverlay } from '../search/SearchOverlay';
import { useTheme } from '../../contexts/ThemeContext';
import { setLanguage } from '../../i18n';
import styles from './AppShellV2.module.css';

export function AppShellV2() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const toggleLang = () => {
    setLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.searchBar} onClick={openSearch}>
            <span className="material-icons-outlined">search</span>
            <input type="text" placeholder={t('nav.searchPlaceholder')} readOnly />
            <span className={styles.kbd}>Ctrl+K</span>
          </div>
          <div className={styles.topActions}>
            <button className={styles.iconBtn} onClick={toggleLang} title="Language">
              <span className="material-icons-outlined">translate</span>
            </button>
            <button className={styles.iconBtn} onClick={toggleTheme} title="Theme">
              <span className="material-icons-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </div>
  );
}
