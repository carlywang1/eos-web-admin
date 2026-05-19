import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TemplatesV2.module.css';
import { getTemplates } from '../../mocks/templates';
import { TemplatePreview } from '../../components/templates/TemplatePreview';
import type { TemplateFile, TemplateType } from '../../types/file';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function TemplatesV2() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<TemplateType | 'all'>('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateFile | null>(null);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const templates = getTemplates(i18n.language);

  const typeFilters: { value: TemplateType | 'all'; label: string }[] = [
    { value: 'all', label: t('templates.all') },
    { value: 'contract-template', label: t('templates.types.contract-template') },
    { value: 'quote-template', label: t('templates.types.quote-template') },
    { value: 'proposal-template', label: t('templates.types.proposal-template') },
    { value: 'other', label: t('templates.types.other') },
  ];

  const uploadTypes: { value: TemplateType; label: string }[] = [
    { value: 'contract-template', label: t('templates.types.contract-template') },
    { value: 'quote-template', label: t('templates.types.quote-template') },
    { value: 'proposal-template', label: t('templates.types.proposal-template') },
    { value: 'other', label: t('templates.types.other') },
  ];

  useEffect(() => {
    if (!showTypeMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowTypeMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTypeMenu]);

  const filtered = filter === 'all'
    ? templates
    : templates.filter((tp) => tp.type === filter);

  return (
    <div className={styles.page}>
      <h1>{t('templates.title')}</h1>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {typeFilters.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className={styles.uploadWrap} ref={menuRef}>
          <button className={styles.uploadBtn} title={t('templates.upload')} onClick={() => setShowTypeMenu(!showTypeMenu)}>
            <span className="material-icons-outlined">add</span>
          </button>
          {showTypeMenu && (
            <div className={styles.typeMenu}>
              <div className={styles.typeMenuTitle}>{t('templates.selectType')}</div>
              {uploadTypes.map((tp) => (
                <button key={tp.value} className={styles.typeMenuItem} onClick={() => { setShowTypeMenu(false); document.getElementById('template-upload-v2')?.click(); }}>
                  {tp.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>{t('templates.columns.fileName')}</span>
          <span style={{ textAlign: 'center' }}>{t('templates.columns.type')}</span>
          <span style={{ textAlign: 'center' }}>{t('templates.columns.size')}</span>
          <span style={{ textAlign: 'center' }}>{t('templates.columns.uploadedAt')}</span>
          <span style={{ textAlign: 'center' }}>{t('templates.columns.actions')}</span>
        </div>
        {filtered.map((template) => (
          <div key={template.id} className={styles.tableRow} onClick={() => setPreviewTemplate(template)}>
            <span className={styles.fileName}>
              <span className="material-icons-outlined">
                {template.name.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
              </span>
              {template.name}
            </span>
            <span style={{ textAlign: 'center' }}><span className={styles.typeTag}>{t(`templates.types.${template.type}`)}</span></span>
            <span style={{ textAlign: 'center' }}>{formatSize(template.size)}</span>
            <span style={{ textAlign: 'center' }}>{template.uploadedAt}</span>
            <span className={styles.actions} style={{ justifyContent: 'center' }}>
              <button className={styles.actionBtn} title={t('templates.download')} onClick={(e) => e.stopPropagation()}>
                <span className="material-icons-outlined">download</span>
              </button>
              <button className={styles.actionBtn} title={t('templates.delete')} onClick={(e) => e.stopPropagation()}>
                <span className="material-icons-outlined">delete_outline</span>
              </button>
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>{t('templates.noTemplates')}</div>
        )}
      </div>

      <TemplatePreview template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
      <input type="file" id="template-upload-v2" style={{ display: 'none' }} />
    </div>
  );
}
