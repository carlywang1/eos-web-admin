import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FilePreview.module.css';
import type { ProjectFile } from '../../types/file';

interface FilePreviewProps {
  file: ProjectFile | null;
  onClose: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FilePreview({ file, onClose }: FilePreviewProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!file) return null;

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
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
            <span className={styles.fileName}>{file.name}</span>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.headerBtn} title={t('preview.download')}>
              <span className="material-icons-outlined">download</span>
            </button>
            <button className={styles.headerBtn} title={t('preview.close')} onClick={onClose}>
              <span className="material-icons-outlined">close</span>
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {isPdf && (
            <div className={styles.placeholder}>
              <span className="material-icons-outlined">picture_as_pdf</span>
              <p className={styles.previewTitle}>{file.name}</p>
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
              <p className={styles.previewTitle}>{file.name}</p>
              <p className={styles.previewHint}>{t('preview.imagePreview')}</p>
            </div>
          )}
          {!isPdf && !isImage && (
            <div className={styles.placeholder}>
              <span className="material-icons-outlined">{icon}</span>
              <p className={styles.previewTitle}>{file.name}</p>
              <p className={styles.previewHint}>{t('preview.unsupported')}</p>
            </div>
          )}
        </div>

        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{t('preview.phase')}</span>
            <span>{t(`preview.phases.${file.phase}`)}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{t('preview.size')}</span>
            <span>{formatSize(file.size)}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{t('preview.uploadedAt')}</span>
            <span>{file.uploadedAt}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{t('preview.uploader')}</span>
            <span>{file.uploadedBy}</span>
          </div>
          {file.source === 'ai' && (
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>{t('preview.source')}</span>
              <span>EOS AI</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
