import styles from './TemplateCard.module.css';
import type { TemplateFile, TemplateType } from '../../types/file';

const typeLabels: Record<TemplateType, string> = {
  'contract-template': '合同模板',
  'quote-template': '报价模板',
  'proposal-template': '方案模板',
  other: '其他',
};

interface TemplateCardProps {
  template: TemplateFile;
  onDelete?: (id: string) => void;
  onClick?: (template: TemplateFile) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function TemplateCard({ template, onDelete, onClick }: TemplateCardProps) {
  const ext = template.name.split('.').pop()?.toLowerCase() || '';
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
    <div className={styles.card} onClick={() => onClick?.(template)} style={{ cursor: 'pointer' }}>
      <div className={styles.top}>
        <div className={styles.iconWrap}>
          <span className="material-icons-outlined">{icon}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{template.name}</div>
          <div className={styles.meta}>
            <span className={styles.typeTag}>{typeLabels[template.type]}</span>
            <span>{formatSize(template.size)}</span>
            <span>{template.uploadedAt}</span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.actionBtn} title="下载" onClick={(e) => { e.stopPropagation(); }}>
          <span className="material-icons-outlined">download</span>
        </button>
        <button className={styles.actionBtn} title="删除" onClick={(e) => { e.stopPropagation(); onDelete?.(template.id); }}>
          <span className="material-icons-outlined">delete_outline</span>
        </button>
      </div>
    </div>
  );
}
