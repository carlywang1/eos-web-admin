import styles from './FileCard.module.css';
import { FileTypeLabel } from './FileTypeLabel';
import type { ProjectFile, ProjectPhase } from '../../types/file';

const phaseLabels: Record<ProjectPhase, string> = {
  'pre-sales': '售前',
  contract: '签约',
  execution: '执行',
  acceptance: '验收',
};

interface FileCardProps {
  file: ProjectFile;
  onDelete?: (id: string) => void;
  onClick?: (file: ProjectFile) => void;
  onSaveAsTemplate?: (file: ProjectFile) => void;
  showPhase?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileCard({ file, onDelete, onClick, onSaveAsTemplate, showPhase }: FileCardProps) {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
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
    <div className={styles.card} onClick={() => onClick?.(file)} style={{ cursor: onClick ? 'pointer' : undefined }}>
      <span className={`material-icons-outlined ${styles.icon}`}>{icon}</span>
      <div className={styles.info}>
        <div className={styles.name}>{file.name}</div>
        <div className={styles.meta}>
          {showPhase && <span className={styles.phaseTag}>{phaseLabels[file.phase]}</span>}
          <span>{formatSize(file.size)}</span>
          <span>{file.uploadedAt}</span>
          <span>{file.uploadedBy}</span>
          {file.source === 'ai' && <span className={styles.aiTag}>AI</span>}
        </div>
      </div>
      <FileTypeLabel type={file.type} />
      <div className={styles.actions}>
        {onSaveAsTemplate && (
          <button className={styles.actionBtn} title="存为模板" onClick={(e) => { e.stopPropagation(); onSaveAsTemplate(file); }}>
            <span className="material-icons-outlined">bookmark_add</span>
          </button>
        )}
        <button className={styles.actionBtn} title="下载" onClick={(e) => e.stopPropagation()}>
          <span className="material-icons-outlined">download</span>
        </button>
        <button className={styles.actionBtn} title="删除" onClick={(e) => { e.stopPropagation(); onDelete?.(file.id); }}>
          <span className="material-icons-outlined">delete_outline</span>
        </button>
      </div>
    </div>
  );
}
