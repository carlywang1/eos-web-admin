import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';
import styles from './SearchOverlay.module.css';
import { getProjects } from '../../mocks/projects';
import { getFiles } from '../../mocks/files';
import { getTemplates } from '../../mocks/templates';
import type { SearchResultItem } from '../../types/search';
import { useNavigate } from 'react-router-dom';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const allItems = useMemo(() => {
    const items: SearchResultItem[] = [];
    const projects = getProjects(i18n.language);
    const files = getFiles(i18n.language);
    const templates = getTemplates(i18n.language);

    projects.forEach((p) => {
      items.push({
        type: 'project',
        id: p.id,
        title: p.name,
        subtitle: `${p.client} · ${p.manager} · ${p.stageLabel}`,
        project: p,
      });
    });

    Object.entries(files).forEach(([projectId, fileList]) => {
      const project = projects.find((p) => p.id === projectId);
      fileList.forEach((f) => {
        items.push({
          type: 'file',
          id: f.id,
          title: f.name,
          subtitle: `${project?.name || t('search.unknownProject')} · ${f.uploadedBy} · ${f.uploadedAt}`,
          file: f,
        });
      });
    });

    templates.forEach((tp) => {
      items.push({
        type: 'template',
        id: tp.id,
        title: tp.name,
        subtitle: `${t('search.template')} · ${tp.uploadedAt}`,
        template: tp,
      });
    });

    return items;
  }, [i18n.language, t]);

  const fuse = useMemo(() => new Fuse(allItems, {
    keys: ['title', 'subtitle'],
    threshold: 0.4,
    includeScore: true,
  }), [allItems]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 10).map((r) => r.item);
  }, [query, fuse]);

  const projectResults = results.filter((r) => r.type === 'project');
  const fileResults = results.filter((r) => r.type === 'file' || r.type === 'template');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const handleSelect = useCallback((item: SearchResultItem) => {
    const files = getFiles(i18n.language);
    if (item.type === 'project') {
      navigate(`/projects/${item.id}`);
    } else if (item.type === 'file') {
      const projectId = Object.entries(files).find(([, fileList]) =>
        fileList.some((f) => f.id === item.id)
      )?.[0];
      if (projectId) navigate(`/projects/${projectId}`);
    } else if (item.type === 'template') {
      navigate('/templates');
    }
    onClose();
  }, [navigate, onClose, i18n.language]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <span className="material-icons-outlined">search</span>
          <input
            autoFocus
            type="text"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <kbd className={styles.kbd}>ESC</kbd>
        </div>

        {query.trim() && (
          <div className={styles.results}>
            {results.length === 0 && (
              <div className={styles.empty}>{t('search.noResults')}</div>
            )}

            {projectResults.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>{t('search.projects')}</div>
                {projectResults.map((item) => (
                  <div key={item.id} className={styles.resultItem} onClick={() => handleSelect(item)}>
                    <span className="material-icons-outlined">folder_open</span>
                    <div className={styles.resultInfo}>
                      <div className={styles.resultTitle}>{item.title}</div>
                      <div className={styles.resultSub}>{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {fileResults.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>{t('search.files')}</div>
                {fileResults.map((item) => (
                  <div key={item.id} className={styles.resultItem} onClick={() => handleSelect(item)}>
                    <span className="material-icons-outlined">description</span>
                    <div className={styles.resultInfo}>
                      <div className={styles.resultTitle}>{item.title}</div>
                      <div className={styles.resultSub}>{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
