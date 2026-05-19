import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { SearchOverlay } from '../search/SearchOverlay';
import styles from './AppShell.module.css';

export function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

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
      <TopNav onSearchClick={openSearch} />
      <main className={styles.content}>
        <Outlet />
      </main>
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </div>
  );
}
