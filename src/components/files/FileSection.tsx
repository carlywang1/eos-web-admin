import { useState } from 'react';
import styles from './FileSection.module.css';
import { FileCard } from './FileCard';
import type { ProjectFile, ProjectPhase } from '../../types/file';

const phaseLabels: Record<ProjectPhase, string> = {
  'pre-sales': '售前阶段',
  contract: '签约阶段',
  execution: '执行阶段',
  acceptance: '验收阶段',
};

interface FileSectionProps {
  phase: ProjectPhase;
  files: ProjectFile[];
  onDelete?: (id: string) => void;
  onClick?: (file: ProjectFile) => void;
}

export function FileSection({ phase, files, onDelete, onClick }: FileSectionProps) {
  const [open, setOpen] = useState(files.length > 0);

  return (
    <div className={styles.section}>
      <div
        className={`${styles.header} ${open ? styles.open : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className="material-icons-outlined">expand_more</span>
        <span className={styles.phaseTitle}>{phaseLabels[phase]}</span>
        <span className={styles.count}>({files.length})</span>
      </div>
      {open && (
        <div className={styles.files}>
          {files.length > 0 ? (
            files.map((file) => (
              <FileCard key={file.id} file={file} onDelete={onDelete} onClick={onClick} />
            ))
          ) : (
            <div className={styles.empty}>暂无文件</div>
          )}
        </div>
      )}
    </div>
  );
}
