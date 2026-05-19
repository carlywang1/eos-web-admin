import styles from './Badge.module.css';
import type { ProjectType } from '../../types/project';

const typeConfig: Record<ProjectType, { label: string; className: string }> = {
  saas: { label: 'SaaS', className: styles.saas },
  raas: { label: 'RaaS', className: styles.raas },
  'ai-agents': { label: 'AI Agents', className: styles.ai },
  apps: { label: 'Apps', className: styles.apps },
};

interface BadgeProps {
  type: ProjectType;
}

export function Badge({ type }: BadgeProps) {
  const config = typeConfig[type];
  return <span className={`${styles.badge} ${config.className}`}>{config.label}</span>;
}
