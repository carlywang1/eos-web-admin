import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TemplatePreview.module.css';
import type { TemplateFile } from '../../types/file';

interface TemplatePreviewProps {
  template: TemplateFile | null;
  onClose: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function TemplatePreview({ template, onClose }: TemplatePreviewProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!template) return null;

  const ext = template.name.split('.').pop()?.toLowerCase() || '';
  const isPdf = ext === 'pdf';
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext);

  const iconMap: Record<string, string> = {
    pdf: 'picture_as_pdf',
    doc: 'description',
    docx: 'description',
    xls: 'table_chart',
    xlsx: 'table_chart',
    ppt: 'slideshow',
    pptx: 'slideshow',
  };
  const icon = iconMap[ext] || 'insert_drive_file';

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <span className="material-icons-outlined">{icon}</span>
            <span className={styles.fileName}>{template.name}</span>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.headerBtn} title={t('preview.close')} onClick={onClose}>
              <span className="material-icons-outlined">close</span>
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {isPdf && (
            <div className={styles.placeholder}>
              <span className="material-icons-outlined">picture_as_pdf</span>
              <p className={styles.previewTitle}>{template.name}</p>
              <p className={styles.previewHint}>{t('preview.pdfPreview')}</p>
              <div className={styles.mockDoc}>
                <div className={styles.mockLine} style={{ width: '80%' }} />
                <div className={styles.mockLine} style={{ width: '100%' }} />
                <div className={styles.mockLine} style={{ width: '60%' }} />
                <div className={styles.mockLine} style={{ width: '90%' }} />
                <div className={styles.mockLine} style={{ width: '45%' }} />
                <div className={styles.mockLine} style={{ width: '100%' }} />
                <div className={styles.mockLine} style={{ width: '75%' }} />
              </div>
            </div>
          )}
          {isImage && (
            <div className={styles.placeholder}>
              <span className="material-icons-outlined">image</span>
              <p className={styles.previewTitle}>{template.name}</p>
              <p className={styles.previewHint}>{t('preview.imagePreview')}</p>
            </div>
          )}
          {!isPdf && !isImage && (
            <div className={styles.placeholder}>
              <span className="material-icons-outlined">{icon}</span>
              <p className={styles.previewTitle}>{template.name}</p>
              <p className={styles.previewHint}>{t('preview.unsupported')}</p>
            </div>
          )}
        </div>

        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{t('preview.type')}</span>
            <span>{t(`templates.types.${template.type}`)}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{t('preview.size')}</span>
            <span>{formatSize(template.size)}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{t('preview.uploadedAt')}</span>
            <span>{template.uploadedAt}</span>
          </div>
        </div>
      </div>
    </>
  );
}
