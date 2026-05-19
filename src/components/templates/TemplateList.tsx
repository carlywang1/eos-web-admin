import { useState, useRef, useEffect } from 'react';
import styles from './TemplateList.module.css';
import { TemplateCard } from './TemplateCard';
import { TemplatePreview } from './TemplatePreview';
import { FileUpload } from '../files/FileUpload';
import type { TemplateFile, TemplateType } from '../../types/file';

interface TemplateListProps {
  templates: TemplateFile[];
}

const typeFilters: { value: TemplateType | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'contract-template', label: '合同模板' },
  { value: 'quote-template', label: '报价模板' },
  { value: 'proposal-template', label: '方案模板' },
  { value: 'other', label: '其他' },
];

const uploadTypes: { value: TemplateType; label: string }[] = [
  { value: 'contract-template', label: '合同模板' },
  { value: 'quote-template', label: '报价模板' },
  { value: 'proposal-template', label: '方案模板' },
  { value: 'other', label: '其他' },
];

export function TemplateList({ templates }: TemplateListProps) {
  const [filter, setFilter] = useState<TemplateType | 'all'>('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateFile | null>(null);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleTypeSelect = (_type: TemplateType) => {
    setShowTypeMenu(false);
    document.getElementById('template-upload-input')?.click();
  };

  const filtered = filter === 'all'
    ? templates
    : templates.filter((t) => t.type === filter);

  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.filters}>
          {typeFilters.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterChip} ${filter === f.value ? styles.active : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className={styles.uploadWrap} ref={menuRef}>
          <button className={styles.uploadBtn} title="上传新模板" onClick={() => setShowTypeMenu(!showTypeMenu)}>
            <span className="material-icons-outlined">add</span>
          </button>
          {showTypeMenu && (
            <div className={styles.typeMenu}>
              <div className={styles.typeMenuTitle}>选择模板类型</div>
              {uploadTypes.map((t) => (
                <button key={t.value} className={styles.typeMenuItem} onClick={() => handleTypeSelect(t.value)}>
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} onClick={setPreviewTemplate} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <span className="material-icons-outlined">folder_open</span>
          <p>暂无模板</p>
        </div>
      )}

      <div className={styles.uploadSection}>
        <FileUpload inputId="template-upload-input" />
      </div>

      <TemplatePreview template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
    </div>
  );
}
