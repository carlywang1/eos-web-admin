import styles from './FileTypeLabel.module.css';
import type { FileType } from '../../types/file';

const labelMap: Record<FileType, string> = {
  contract: '合同',
  quote: '报价',
  rfp: 'RFP',
  rfq: 'RFQ',
  proposal: '方案',
  other: '其他',
};

interface FileTypeLabelProps {
  type: FileType;
}

export function FileTypeLabel({ type }: FileTypeLabelProps) {
  return <span className={`${styles.label} ${styles[type]}`}>{labelMap[type]}</span>;
}
