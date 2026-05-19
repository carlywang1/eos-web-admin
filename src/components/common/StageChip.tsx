import styles from './StageChip.module.css';
import type { ProjectStage } from '../../types/project';

const stageStyles: Record<ProjectStage, string> = {
  submitted: styles.confirming,
  'requirements-review': styles.confirming,
  quotation: styles.confirming,
  contract: styles.deploying,
  implementation: styles.deploying,
  delivery: styles.executing,
  acceptance: styles.executing,
  live: styles.done,
};

interface StageChipProps {
  stage: ProjectStage;
  label: string;
}

export function StageChip({ stage, label }: StageChipProps) {
  return <span className={`${styles.chip} ${stageStyles[stage]}`}>{label}</span>;
}
